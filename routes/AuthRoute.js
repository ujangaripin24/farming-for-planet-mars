import express from "express";
import {
    Login,
    Status,
    logOut
} from "../controllers/Atuh.js";

const router = express.Router();

router.get("/status", Status);
router.post("/login", Login);
router.delete("/logout", logOut);

export default router;