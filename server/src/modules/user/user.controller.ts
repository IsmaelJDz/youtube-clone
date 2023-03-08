import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createUser } from './user.service';
import { RegisterUserSchema } from './user.schema';

export async function registerUserHandler(
  req: Request<{}, {}, RegisterUserSchema>,
  res: Response
) {
  const { username, email, password } = req.body;

  try {
    await createUser({ username, email, password });

    return res
      .status(StatusCodes.CREATED)
      .send('User created successfully');
  } catch (error: any) {
    if (error.code === 11000) {
      return res
        .status(StatusCodes.CONFLICT)
        .send({ error: 'Username or email already exists' });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: 'Something went wrong' });
  }
}
