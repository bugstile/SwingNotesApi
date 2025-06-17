import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const createUser = async (data) => {
  const user = await User.fromRequest(data);

  const result = await pool.query(
    `INSERT INTO users (
      id, firstname, surname, email, password_hash
    ) VALUES (
      DEFAULT, $1, $2, $3, $4
    ) RETURNING *`,
    [user.firstname, user.surname, user.email, user.password_hash]
  );

  return user;
};

export const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (result.rows.length === 0) return null;

  const data = result.rows[0];
  return new User(data.id, data.firstname, data.surname, data.email, data.password_hash);
};

export const checkPassword = async (plain, hash) => {
  return await bcrypt.compare(plain, hash);
};

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};
