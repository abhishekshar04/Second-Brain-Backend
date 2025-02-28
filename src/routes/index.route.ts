import { Router } from "express";
import AuthRouter from "./auth.route";
import { contentRouter } from "./content.route";
import { authMiddle } from "../middlewares/authMiddle";

const AllRouter = Router()

AllRouter.use("/auth", AuthRouter);
AllRouter.use("/content", authMiddle, contentRouter);

export default AllRouter;