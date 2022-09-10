import { Router } from "express";
import { createWifi, deleteWifiById, getWifiById, getWifis } from "../controllers/wifiController";
import validateSchema from "../middlewares/schemaValidator";
import validateToken from "../middlewares/tokenValidator";
import wifiSchema from "../schemas/wifiSchema";

const router = Router();

router.post('/wifis/create', validateToken, validateSchema(wifiSchema), createWifi);
router.get('/wifis', validateToken, getWifis);
router.get('/wifis/:wifiId', validateToken, getWifiById);
router.delete('/wifis/delete/:wifiId', validateToken, deleteWifiById);

export default router;