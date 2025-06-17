import pool from '../config/db.js';
import User from '../models/user.js';
import { generateToken } from "../services/userService.js";

export const signup = async (req, res, next) => {
  try {
    const user = await User.fromRequest(req.body);

    await pool.query(
      `INSERT INTO users (id, firstname, surname, email, password_hash)
       VALUES (DEFAULT, $1, $2, $3, $4)`,
      [user.firstname, user.surname, user.email, user.password_hash]
    );

    res.status(201).json({
      message: 'Account created successfully.',
      user: user.toPublic()
    });
  } catch (error) {
    console.error('Registration error:', error);

    const message = error.message.includes('users_email_key') || error.message.includes('duplicate')
      ? 'An account with that email already exists.'
      : 'Unable to complete registration. Please try again later.';

    res.status(400).json({ error: message });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No account found with that email address.' });
    }

    const userData = result.rows[0];
    const user = new User(
      userData.id,
      userData.firstname,
      userData.surname,
      userData.email,
      userData.password_hash
    );

    const validPassword = await user.verifyPassword(password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Incorrect email or password.' });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: 'Successfully logged in.',
      token,
      user: user.toPublic()
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Unable to log in. Please try again later.' });
  }
};
