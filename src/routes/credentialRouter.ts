import { Router } from "express";
import { createCredential, getCredentials } from "../controllers/credentialController";
import validateSchema from "../middlewares/schemaValidator";
import validateToken from "../middlewares/tokenValidator";
import credentialSchema from "../schemas/credentialSchema";

const router = Router();

router.post('/credentials/create', validateToken, validateSchema(credentialSchema), createCredential);
router.get('/credentials', validateToken, getCredentials);

export default router;