import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController";
import validateSchema from "../middlewares/schemaValidator";
import authSchema from "../schemas/authSchema";

const router = Router();

router.post('/auth/sign-up', validateSchema(authSchema), registerUser);
router.post('/auth/sign-in', validateSchema(authSchema), loginUser);

export default router;