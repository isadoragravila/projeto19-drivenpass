import { Router } from "express";
import { createNote, getNoteById, getNotes, deleteNoteById } from "../controllers/noteController";
import validateSchema from "../middlewares/schemaValidator";
import validateToken from "../middlewares/tokenValidator";
import noteSchema from "../schemas/noteSchema";

const router = Router();

router.post('/notes/create', validateToken, validateSchema(noteSchema), createNote);
router.get('/notes', validateToken, getNotes);
router.get('/notes/:noteId', validateToken, getNoteById);
router.delete('/notes/delete/:noteId', validateToken, deleteNoteById);

export default router;