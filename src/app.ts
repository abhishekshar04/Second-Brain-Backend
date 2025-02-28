import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AllRouter from "./routes/index.route";

dotenv.config({
    path: './.env'
});

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.ORIGIN
}));
app.use('/api/v1',AllRouter);
export {app};