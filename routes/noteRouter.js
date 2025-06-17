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
import { noteSchema, noteUpdateSchema, noteDeleteSchema, noteSearchSchema } from "../validation/noteValidation.js";

const router = express.Router();

// Apply verifyJWT middleware to all routes below
router.use(verifyJWT);

router.get("/", getAllNotes);
router.post("/", validate(noteSchema, "body"), createNoteHandler);
router.put("/:id", validate(noteUpdateSchema, "body"), updateNoteHandler);
router.delete("/:id", validate(noteDeleteSchema, "params"), deleteNoteHandler);
router.get("/search", validate(noteSearchSchema, "query"), searchNotesHandler);

export default router;
