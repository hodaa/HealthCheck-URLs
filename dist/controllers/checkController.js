import Check from '../models/check.js';
import jwt from 'jsonwebtoken';
const config = process.env;
// createCheck =(req, res, next)=>{
//     const { url, name, protocol, path,port } = req.body;
//     // Validate user input
//     // if (!(email && password && first_name && last_name)) {
//     //   res.status(400).send("All input is required");
//     // }
//     console.log("in");
//     const check =  Check.create({
//       url,
//       name,
//       protocol,
//       path,
//       port
//     });
//     res.status(201).json({"data":check});
// }
/*
 * POST /Check to save a new Check.
 */
export const postCheck = (req, res, next) => {
    const user = jwt.verify(req.headers.token, config.TOKEN_KEY || 'secret');
    const data = req.body;
    data.user_id = user.user_id;
    const newCheck = new Check(data);
    newCheck.save((err, Check) => {
        if (err) {
            res.send(err);
        }
        else { // If no errors, send it back to the client
            res.status(201).json({ message: 'Check successfully added!', Check });
        }
    });
};
export const getChecks = (req, res) => {
    // Query the DB and if no errors, send all the Checks
    const query = Check.find({});
    query.exec((err, Checks) => {
        if (err)
            res.send(err);
        // If no errors, send them back to the client
        res.json(Checks);
    });
};
/*
 * GET /Check route to retrieve all the Checks.
 */
export const findAll = (req, res) => {
    Check.find().then((checks) => {
        res.send(checks);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving notes.'
        });
    });
};
/*
 * GET /Check/:id route to retrieve a Check given its id.
 */
export const getCheck = (req, res) => {
    Check.findById(req.params.id, (err, x) => {
        if (err)
            res.send(err);
        console.log(x);
        // If no errors, send it back to the client
        res.json(x);
    });
};
/*
 * DELETE /Check/:id to delete a Check given its id.
 */
export const deleteCheck = async (req, res) => {
    try {
        const result = await Check.findByIdAndDelete(req.params.id);
        if (!result) {
            res.status(500).json({ message: 'Error deleting Check', error: result });
        }
        else {
            res.json({ message: 'Check successfully deleted!', result });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Error deleting Check', error: err });
    }
};
/*
 * PUT /Check/:id to update a Check given its id
 */
export const updateCheck = (req, res) => {
    Check.findById({ _id: req.params.id }, (err, Check) => {
        if (err)
            res.send(err);
        Object.assign(Check, req.body).save((err, Check) => {
            if (err)
                res.send(err);
            res.json({ message: 'Check updated!', Check });
        });
    });
};
//  export default { getChecks, postCheck, getCheck, deleteCheck, updateCheck };
