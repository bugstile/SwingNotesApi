import express from "express";
import { signup, login } from "../controllers/userController.js";
import validate from "../middleware/validate.js";
import { userSchema, loginSchema } from "../validation/userValidation.js";

const router = express.Router();

router.post("/register", validate(userSchema), signup);
router.post("/login", validate(loginSchema), login);

export default router;
