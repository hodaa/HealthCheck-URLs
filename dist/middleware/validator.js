import { body } from 'express-validator';
export const validateRegister = () => {
    return [
        body('first_name', 'first name is required').exists(),
        body('last_name', 'last name is required').exists(),
        body('email', 'Invalid email').exists().isEmail(),
        body('password', 'password is required').exists()
    ];
};
export const validateLogin = () => {
    return [
        body('email', 'Invalid email').exists().isEmail(),
        body('password', 'password is required').exists()
    ];
};
