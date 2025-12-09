import nodemailer from 'nodemailer';
import authConfig from '../config/auth.js';
const config = process.env;
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'hoda.hussien@bravvura.com',
        pass: '123hoda456'
    }
});
export const sendEmail = (email, subject, body) => {
    transport.sendMail({
        from: authConfig.email,
        to: email,
        subject: subject,
        html: body
    }).catch(err => console.log(err));
};
export default { sendEmail };
