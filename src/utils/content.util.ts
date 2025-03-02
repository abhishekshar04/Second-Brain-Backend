import { Request, Response } from "express";
import Content from "../models/content.model";
import Tag from "../models/tags.model";
import mongoose, { mongo } from "mongoose";


export async function postContent(req:Request, res: Response){
    const {link, type, title, tags} = req.body;

    if(!title){
        res.status(400).json({
            message: "The title is required"
        })
        return;
    }
    try{
        const TagId: Array<mongoose.Schema.Types.ObjectId> = await Promise.all(tags.map(async (tag: string) => {
            const find = await Tag.findOne({title: tag});
            if(!find){
                const newTag = await Tag.create({title: tag});
                return newTag._id;
            }
            return find._id;
        }));
        const newContent = await Content.create({
            title: title,
            link: link || "",
            type: type || "",
            tags: TagId,
            userId: req.user._id
        })
        if(!newContent){
            res.status(400).json({
                message: "Internal Server Error"
            })
            return;
        }

        res.status(200).json({
            content: {
                newContent
            },
            message: "The content is posted"
        })
        return;
    }catch(err){
        res.status(500).json({
            errorMessage: err
        })
    }

}
export async function getContent(req: Request, res: Response) {
    const userId = req.user._id;

    try {
        const allContent = await Content.find({ userId });

        if (allContent.length === 0) {  // Check if array is empty
            res.status(200).json({
                message: "No content found for the user",
                content: [],
                tags: []
            });
            return;
        }

        const tags = allContent[0].tags;
        const tagNames = await Promise.all(tags.map(async (tag) => {
            const tagData = await Tag.findById(tag);
            return tagData;
        }));

        res.status(200).json({
            message: "The content fetched successfully",
            content: allContent,
            tags: tagNames,
        });
        return;

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deleteContent(req:Request, res: Response){
    const content_id = req.body.id;

    if(!content_id){
        res.status(400).json({
            message: "Please provide the content_id"
        })
    }else{
        try{
            const delete_content = await Content.findById({
                _id: content_id
            });
    
            if(!delete_content){
                res.status(400).json({
                    message: "The provided content_id is invalid."
                })
                
            }
    
            const success = await Content.deleteOne({
                _id: content_id
            });
    
            if(success){
                res.status(200).json({
                    message: "The content has successfully been removed"
                })
            }else{
                res.status(400).json({
                    message: "The content could not be removed due to some unexpected errors"
                })
            }
        }catch(err){
            res.status(500).json({
                message: "Internal server error"
            })
        }
    }
}
