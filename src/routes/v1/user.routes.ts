import express from "express";
import validateResource from "../../middlewares/validateResource";
import requireUser from "../../middlewares/requireUser";
import {
  createUserSchema,
  verifyUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../../schema/user.schema";
import {
  createUserHandler,
  verifyUserHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  getCurrentUserHandler,
} from "../../controllers/user.controller";

const router = express.Router();

router.post("/users", validateResource(createUserSchema), createUserHandler);

router.post(
  "/users/verify/:id/:verificationCode",
  validateResource(verifyUserSchema),
  verifyUserHandler
);

router.post(
  "/users/forgotpassword",
  validateResource(forgotPasswordSchema),
  forgotPasswordHandler
);

router.post(
  "/users/resetpassword/:id/:passwordResetCode",
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);

router.get("/users/me", requireUser, getCurrentUserHandler);

export default router;
