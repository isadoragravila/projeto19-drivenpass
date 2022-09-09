import { Router } from "express";
import { createCard, deleteCardById, getCardById, getCards } from "../controllers/cardController";
import validateSchema from "../middlewares/schemaValidator";
import validateToken from "../middlewares/tokenValidator";
import cardSchema from "../schemas/cardSchema";

const router = Router();

router.post('/cards/create', validateToken, validateSchema(cardSchema), createCard);
router.get('/cards', validateToken, getCards);
router.get('/cards/:cardId', validateToken, getCardById);
router.delete('/cards/delete/:cardId', validateToken, deleteCardById);

export default router;