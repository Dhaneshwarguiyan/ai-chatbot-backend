// routes/chat.ts
import express, { Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const router = express.Router();

router.post('/', async (req:Request, res:Response) => {

    const {message} = req.body;
    //keep the type of the message as the string

    if (!message) {
        res.status(400).json({ msg: "Valid 'message' is required." });
    }
    console.log("✅ Received message:", message);

    try {
        console.log("enter to axios call to the gemini api");
        const response = await axios.post(process.env.CHAT_BOT_API as string, {
            contents: [
                {
                    parts: [
                        { text: message }
                    ]
                }
            ]
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log("✅ Gemini API call successful.");

        const geminiReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
        console.log("we stored the gemini response here also");

         res.json({
            success: true,
            reply: geminiReply
        });

    } catch (error:unknown) {
        if(axios.isAxiosError(error)) {
            console.error("❌ Error calling Gemini API:", error.response?.data || error.message);
             res.status(500).json({
                success: false,
                msg: "Something went wrong calling Gemini API.",
                error: error.response?.data || error.message
            });
        }
    }
});

export default router;
