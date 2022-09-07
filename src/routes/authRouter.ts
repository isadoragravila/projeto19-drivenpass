import { Router } from "express";
import { registerUser } from "../controllers/authController";
import validateSchema from "../middlewares/schemaValidator";
import authSchema from "../schemas/authSchema";

const router = Router();

router.post('/auth/sign-up', validateSchema(authSchema), registerUser);

export default router;