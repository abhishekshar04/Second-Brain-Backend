import { Router } from "express";
import { deleteContent, getContent, postContent } from "../utils/content.util";

const contentRouter = Router();

contentRouter.post('/',postContent);
contentRouter.get('/',getContent);
contentRouter.delete('/',deleteContent);

export {contentRouter}