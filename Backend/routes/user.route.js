import express from "express";
import { signinAdmin } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/admin", signinAdmin);

export default router;
