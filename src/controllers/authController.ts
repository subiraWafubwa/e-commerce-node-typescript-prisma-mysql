import { Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { ErrorCode } from "../exceptions/HttpException";
import { BadRequestException } from "../exceptions/BadRequestException";
import { SignUpSchema } from "../schema/users";
import { UnprocessableEntityException } from "../exceptions/UnprocessableEntityException";
import { NotFoundException } from "../exceptions/NotFoundException";
import { error } from "console";
import { UnauthorizedException } from "../exceptions/UnauthorizedException";

export const signup = async (req: Request, res: Response) => {
  const isValid = SignUpSchema.safeParse(req.body);

  if (!isValid.success) {
    throw new UnprocessableEntityException(
      "Unprocessable Entity",
      ErrorCode.UNPROCESSABLE_ENTITY,
      isValid.error.format()
    );
  }

  const { name, email, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email: email } });

  if (user) {
    throw new BadRequestException(
      "User already exists",
      ErrorCode.USER_ALREADY_EXISTS
    );
  }

  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });

  res.json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email: email } });

  if (!user) {
    throw new NotFoundException("User not found!", ErrorCode.USER_NOT_FOUND);
  }

  if (!compareSync(password, user.password)) {
    throw new UnauthorizedException(
      "Incorrect password",
      ErrorCode.INCORRECT_PASSWORD
    );
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  console.log(token);

  res.json({ user, token });
};
