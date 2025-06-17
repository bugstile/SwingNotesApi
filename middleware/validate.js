import { ZodError } from "zod";

const validate = (schema, target = "body") => (req, res, next) => {
  try {
    if (target === "body") {
      req.body = schema.parse(req.body);
    } else if (target === "params") {
      req.params = schema.parse(req.params);
    } else if (target === "query") {
      // Validate query but DO NOT overwrite it
      schema.parse(req.query);
    } else {
      throw new Error("Invalid target for validation");
    }
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        error: "Validation error",
        details: err.errors.map((e) => e.message),
      });
    }
    next(err);
  }
};

export default validate;
