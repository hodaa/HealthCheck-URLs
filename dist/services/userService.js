import User from '../models/user.js';
export const getUser = (userId) => {
    const data = User.findById(userId, (err, res) => {
        return res;
    });
    return data;
};
export default { getUser };
