import express from "express";
import {signUp , signIn} from "../controllers/userControllers.js";

const router = express.Router();

router.route("/").post(signUp)
router.post("/login",signIn)

export default router;