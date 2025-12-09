import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import emailService from '../services/emailService.js';
import crypto from 'crypto';
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const register = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const oldUser = await User.findOne({ email });
    if (oldUser)
        return res.status(400).send({ message: "User already registered." });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }
    const encryptedPassword = await bcrypt.hash(password.toString(), 10);
    const user = new User({
        first_name,
        last_name,
        email,
        password: encryptedPassword,
    });
    const tokenPayload = {
        user_id: String(user._id),
        email: user.email,
    };
    const token = jwt.sign(tokenPayload, process.env.TOKEN_KEY || "secret", {
        expiresIn: "2h",
    });
    const confirmationCode = crypto.randomBytes(20).toString("hex");
    user.status = "up";
    user.confirmation_code = confirmationCode;
    user.token = token;
    await user.save();
    const body = `<h2>Hello ${first_name}</h2><p>Thank you for subscribing.
  This is your confirmation code: ${confirmationCode}
  <br>
  Please confirm your email`;
    // Send email in background (don't wait for it)
    emailService.sendEmail(user.email, "Confirmation Email", body);
    res.status(201).json({ message: "Please check your Email for confirmation" });
};
/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const verify = (req, res, next) => {
    User.findOne({ confirmation_code: req.params.confirmation_code })
        .then((user) => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        user.status = "Active";
        user.confirmation_code = null;
        user.save((err) => {
            if (err) {
                res.status(500).send({ message: err });
            }
            return res.status(200).send({ message: "Your email is activated" });
        });
    })
        .catch((e) => console.log("error", e));
};
/**
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }
    try {
        const { email, password } = req.body;
        const user = (await User.findOne({ email, status: "up" }));
        const mtc = await bcrypt.compare(password, user.password);
        if (user && (await bcrypt.compare(password, user.password))) {
            console.log("if ");
            const tokenPayload = {
                user_id: String(user._id),
                email: user.email,
            };
            const token = jwt.sign(tokenPayload, process.env.TOKEN_KEY || "secret", {
                expiresIn: "2h",
            });
            // save user token
            user.token = token;
            // user
            res
                .status(200)
                .json({ message: "You logged in successfully", token: token });
        }
        // return new user
        res.status(400).json({ message: "Invalid Credentials" });
    }
    catch (err) {
        console.log(err);
    }
};
