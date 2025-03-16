import { Router } from "express";
import { login, signup } from "../controllers/authController";
import { errorHandler } from "../middlewares/errorHandler";

const authRouter: Router = Router();

authRouter.post("/signup", errorHandler(signup));
authRouter.post("/login", errorHandler(login));

export default authRouter;
