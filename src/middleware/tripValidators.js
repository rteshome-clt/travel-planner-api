import { param, body, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateTripId = [
  param('id')
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage('Trip ID must be a positive integer'),

  handleValidationErrors,
];

export const validateCreateTrip = [
  body('title')
    .exists({ values: 'falsy' })
    .withMessage('Title is required')
    .bail()
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters'),

  body('startDate')
    .exists({ values: 'falsy' })
    .withMessage('Start date is required')
    .bail()
    .isISO8601({ strict: true })
    .withMessage('Start date must be valid (YYYY-MM-DD)'),

  body('endDate')
    .exists({ values: 'falsy' })
    .withMessage('End date is required')
    .bail()
    .isISO8601({ strict: true })
    .withMessage('End date must be valid (YYYY-MM-DD)'),

  body('budget')
    .exists({ values: 'falsy' })
    .withMessage('Budget is required')
    .bail()
    .isFloat({ min: 0 })
    .withMessage('Budget must be a positive number'),

  handleValidationErrors,
];

export const validateUpdateTrip = [
  oneOf(
    [
      body('title').exists({ values: 'falsy' }),
      body('startDate').exists({ values: 'falsy' }),
      body('endDate').exists({ values: 'falsy' }),
      body('budget').exists({ values: 'falsy' }),
    ],
    {
      message:
        'At least one field (title, startDate, endDate, budget) must be provided',
    },
  ),

  body('title')
    .optional()
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters'),

  body('startDate')
    .optional()
    .isISO8601({ strict: true })
    .withMessage('Start date must be valid'),

  body('endDate')
    .optional()
    .isISO8601({ strict: true })
    .withMessage('End date must be valid'),

  body('budget')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Budget must be a positive number'),

  handleValidationErrors,
];