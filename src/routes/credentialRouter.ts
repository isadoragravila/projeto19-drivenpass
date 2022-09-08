import { Router } from "express";
import { createCredential } from "../controllers/credentialController";
import validateSchema from "../middlewares/schemaValidator";
import validateToken from "../middlewares/tokenValidator";
import credentialSchema from "../schemas/credentialSchema";

const router = Router();

router.post('/credential/create', validateToken, validateSchema(credentialSchema), createCredential);

export default router;