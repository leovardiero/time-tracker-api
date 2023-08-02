import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login Required'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { user_id, email } = data;

    const user = await User.findOne({
      where: {
        user_id,
        email,
      },
      include: 'projects',
    });

    if (!user) {
      return res.status(401).json({
        errors: ['Invalid credentials'],
      });
    }

    req.userId = user_id;
    req.userEmail = email;

    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Invalid credentials'],
    });
  }
};
