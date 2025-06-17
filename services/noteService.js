import pool from '../config/db.js';

export const getNotesByUserId = async (userId) => {
  const result = await pool.query(
    'SELECT * FROM note WHERE userId = $1 ORDER BY createdAt DESC',
    [userId]
  );
  return result.rows;
};

export const createNote = async (userId, title, text) => {
  const result = await pool.query(
    `INSERT INTO note (id, userId, title, text, createdAt, modifiedAt)
     VALUES (uuid_generate_v4(), $1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
     RETURNING *`,
    [userId, title, text]
  );
  return result.rows[0];
};

export const updateNote = async (userId, noteId, title, text) => {
  const result = await pool.query(
    `UPDATE note SET title = $1, text = $2, modifiedAt = CURRENT_TIMESTAMP
     WHERE id = $3 AND userId = $4 RETURNING *`,
    [title, text, noteId, userId]
  );
  return result.rows[0];
};

export const deleteNote = async (userId, noteId) => {
  const result = await pool.query(
    'DELETE FROM note WHERE id = $1 AND userId = $2 RETURNING *',
    [noteId, userId]
  );
  return result.rows[0];
};

export const searchNotes = async (userId, titleQuery) => {
  const result = await pool.query(
    'SELECT * FROM note WHERE userId = $1 AND title ILIKE $2',
    [userId, `%${titleQuery}%`]
  );
  return result.rows;
};
