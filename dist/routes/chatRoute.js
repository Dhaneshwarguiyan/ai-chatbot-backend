"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/chat.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const router = express_1.default.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const { message } = req.body;
    //keep the type of the message as the string
    if (!message) {
        res.status(400).json({ msg: "Valid 'message' is required." });
    }
    console.log("✅ Received message:", message);
    try {
        console.log("enter to axios call to the gemini api");
        const response = yield axios_1.default.post(process.env.CHAT_BOT_API, {
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
        const geminiReply = ((_f = (_e = (_d = (_c = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.candidates) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d.parts) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.text) || "No response from Gemini.";
        console.log("we stored the gemini response here also");
        res.json({
            success: true,
            reply: geminiReply
        });
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error("❌ Error calling Gemini API:", ((_g = error.response) === null || _g === void 0 ? void 0 : _g.data) || error.message);
            res.status(500).json({
                success: false,
                msg: "Something went wrong calling Gemini API.",
                error: ((_h = error.response) === null || _h === void 0 ? void 0 : _h.data) || error.message
            });
        }
    }
}));
exports.default = router;
