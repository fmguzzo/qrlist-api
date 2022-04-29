import express from "express";
import validateResource from "../../middlewares/validateResource";
import { createSessionSchema } from "../../schema/auth.schema";
import requireUser from "../../middlewares/requireUser";
import {
  createSessionHandler,
  refreshAccessTokenHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "../../controllers/auth.controller";

const router = express.Router();

router.post(
  "/sessions",
  validateResource(createSessionSchema),
  createSessionHandler
);

router.post("/sessions/refresh", refreshAccessTokenHandler);

router.get("/sessions", requireUser, getUserSessionsHandler);
router.delete("/sessions", requireUser, deleteSessionHandler);

export default router;
