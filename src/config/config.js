const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(3000),
    URI: Joi.string().required().description("MongoDB connection URL"),
    // JWT_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description("Access token expiration time in minutes"),
    // CALENDARIFIC_API_KEY: Joi.string().required().description("API key for Calendarific"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: "key" } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  port: envVars.PORT,
  mongoose: {
    url: envVars.URI,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
  },
  calendarificApiKey: envVars.CALENDARIFIC_API_KEY,
};
