import User from '../models/user.js'

export const getUser = (userId: string) => {
   const data = User.findById(userId, (err: any, res: any) => {
          return res;
      });
  return data;
}

export default { getUser }
