import Joi from "joi";
import { BAGES } from "@/lib/constants/default";

export const queryParamsSchema = Joi.object({
  bage: Joi.string()
    .valid(...BAGES)
    .required()
    .messages({
      "string.valid": "bage query param is invalid",
      "any.required": "bage query param is required field",
    }),
  search: Joi.string().empty().max(1000).messages({
    "string.empty": "search query param cannot be empty",
    "string.max": "search query param is too long",
  }),
  limit: Joi.number().min(1).max(30).messages({
    "number.min": "limit query param is min 1 per page",
    "number.max": "limit query param is max 30 per page",
  }),
  page: Joi.number().min(1).messages({
    "number.min": "page query param is min 1",
  }),
});

export type TypeQueryParamsSchema = typeof queryParamsSchema;
