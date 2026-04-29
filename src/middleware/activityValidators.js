import { param, body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateActivityId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Activity ID must be a positive integer'),

  handleValidationErrors,
];

export const validateCreateActivity = [
  body('name')
    .exists({ values: 'falsy' })
    .withMessage('Name is required')
    .trim()
    .escape(),

  body('description')
    .optional()
    .trim()
    .escape(),

  body('date')
    .exists({ values: 'falsy' })
    .withMessage('Date is required')
    .isISO8601({ strict: true })
    .withMessage('Date must be valid'),

  body('cost')
    .isFloat({ min: 0 })
    .withMessage('Cost must be a positive number'),

  body('destinationId')
    .isInt({ min: 1 })
    .withMessage('Destination ID must be a positive integer'),

  handleValidationErrors,
];

export const validateUpdateActivity = [
  body('name')
    .optional()
    .trim()
    .escape(),

  body('description')
    .optional()
    .trim()
    .escape(),

  body('date')
    .optional()
    .isISO8601({ strict: true })
    .withMessage('Date must be valid'),

  body('cost')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Cost must be a positive number'),

  handleValidationErrors,
];