import { Router } from "express";
import { Login, SignUp } from "../utils/auth.util";

const AuthRouter: Router = Router();

AuthRouter.post("/login", Login);
AuthRouter.post("/signup", SignUp);
export default AuthRouter;