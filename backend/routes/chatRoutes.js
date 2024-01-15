import express from "express";
import {fetchMessage,fetchUsers,sendMessage} from "../controllers/chatControllers.js";

const router = express.Router();

router.route("/users").get(fetchUsers)
router.route("/getmessage").post(fetchMessage)
router.route("/sendmessage").post(sendMessage)

export default router;