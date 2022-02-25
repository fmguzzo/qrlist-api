import express from "express";
import { createSessionHandler } from "../controllers/auth.controller";
const router = express.Router();

router.post("/api/sessions", createSessionHandler);

export default router;
