import Report from '../models/report.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
const config = process.env;
/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const get = (req, res, next) => {
    User.findOne({ confirmation_code: req.params.confirmation_code })
        .then((user) => {
        if (!user) {
            return res.status(404).send({ message: 'User Not found.' });
        }
        user.status = 'Active';
        user.confirmation_code = null;
        user.save((err) => {
            if (err) {
                res.status(500).send({ message: err });
            }
            return res.status(200).send({ message: 'Your email is activated' });
        });
    })
        .catch((e) => console.log('error', e));
};
/**
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const create = async (req, res) => {
    const user = jwt.verify(req.headers.token, config.TOKEN_KEY || 'secret');
    const data = req.body;
    data.user_id = user.user_id;
    const newCheck = new Report(data);
    newCheck.save((err, Check) => {
        if (err) {
            res.send(err);
        }
        else { // If no errors, send it back to the client
            res.status(201).json({ message: 'Report successfully added!', Check });
        }
    });
};
