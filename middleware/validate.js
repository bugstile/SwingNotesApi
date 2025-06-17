import { ZodError } from "zod";

const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        error: "Validation error",
        details: err.errors.map(e => e.message),
      });
    }
    next(err);
  }
};

export default validate;
