import express from "express";
import verifyJWT from "../middleware/verifyJWT.js"; // <-- Import your JWT middleware
import {
  getAllNotes,
  createNoteHandler,
  updateNoteHandler,
  deleteNoteHandler,
  searchNotesHandler,
} from "../controllers/noteController.js";
import validate from "../middleware/validate.js";
import { noteSchema, noteUpdateSchema, noteDeleteSchema } from "../validation/noteValidation.js";

const router = express.Router();

// Apply verifyJWT middleware to all routes below
router.use(verifyJWT);

router.get("/", getAllNotes);
router.post("/", validate(noteSchema), createNoteHandler);
router.put("/", validate(noteUpdateSchema), updateNoteHandler);
router.delete("/", validate(noteDeleteSchema), deleteNoteHandler);
router.get("/search", searchNotesHandler);

export default router;
