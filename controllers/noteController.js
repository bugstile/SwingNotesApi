import {
  getNotesByUserId,
  createNote,
  updateNote,
  deleteNote,
  searchNotes
} from '../services/noteService.js';
import { BadRequestError, NotFoundError } from '../errors/error.js';

export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await getNotesByUserId(req.user.id);
    res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
};

export const createNoteHandler = async (req, res, next) => {
    console.log(req.user);
  const { title, text } = req.body;
  if (!title || !text) {
    return next(new BadRequestError('Title and text are required'));
  }

  try {
    const note = await createNote(req.user.id, title, text);
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

export const updateNoteHandler = async (req, res, next) => {
  const { id } = req.params;
  const { title, text } = req.body;

  try {
    const note = await updateNote(req.user.id, id, title, text);
    if (!note) throw new NotFoundError('Note not found or not yours');
    res.status(200).json(note);
  } catch (err) {
    next(err);
  }
};

export const deleteNoteHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const note = await deleteNote(req.user.id, id);
    if (!note) throw new NotFoundError('Note not found or not yours');
    res.status(200).json({ message: 'Note deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

export const searchNotesHandler = async (req, res, next) => {
  const { title } = req.query;
  if (!title) {
    return next(new BadRequestError('Search query is required'));
  }

  try {
    const notes = await searchNotes(req.user.id, title);
    res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
};
