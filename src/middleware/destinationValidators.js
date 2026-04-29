import { param, body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateDestinationId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Destination ID must be a positive integer'),

  handleValidationErrors,
];

export const validateCreateDestination = [
  body('city')
    .exists({ values: 'falsy' })
    .withMessage('City is required')
    .trim()
    .escape(),

  body('country')
    .exists({ values: 'falsy' })
    .withMessage('Country is required')
    .trim()
    .escape(),

  body('arrivalDate')
    .exists({ values: 'falsy' })
    .withMessage('Arrival date is required')
    .isISO8601({ strict: true })
    .withMessage('Arrival date must be valid'),

  body('departureDate')
    .exists({ values: 'falsy' })
    .withMessage('Departure date is required')
    .isISO8601({ strict: true })
    .withMessage('Departure date must be valid'),

  body('tripId')
    .isInt({ min: 1 })
    .withMessage('Trip ID must be a positive integer'),

  handleValidationErrors,
];

export const validateUpdateDestination = [
  body('city')
    .optional()
    .trim()
    .escape(),

  body('country')
    .optional()
    .trim()
    .escape(),

  body('arrivalDate')
    .optional()
    .isISO8601({ strict: true })
    .withMessage('Arrival date must be valid'),

  body('departureDate')
    .optional()
    .isISO8601({ strict: true })
    .withMessage('Departure date must be valid'),

  handleValidationErrors,
];