import { Request, Response } from 'express';
import { findUserByEmail } from '../user/user.service';
import { StatusCodes } from 'http-status-codes';
import { signJwt } from './auth.utils';
import omit from '../../helpers/omit';
import { LoginBody } from './auth.schema';

export async function loginHandler(
  req: Request<{}, {}, LoginBody>,
  res: Response
): Promise<any> {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user || !(await user.comparePassword(password))) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send('Invalid credentials');
  }

  const payload = omit(user.toJSON(), ['password', '__v']);

  const jtw = signJwt(payload);

  res.cookie('accessToken', jtw, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
    domain:
      process.env.NODE_ENV === 'production'
        ? 'yourdomain.com'
        : 'localhost',
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production' ? true : false,
  });

  return res.status(StatusCodes.OK).send(jtw);
}
