const validator = require('validator');

/**
 * @function validateSignupForm
 * @param {Object} payload
 */
module.exports = (payload) => {
  const errors = {};
  let isFormValid = true; // REVIEW: is this the best approach for validation?
  let message = '';

  if (!payload || typeof payload.firstName !== 'string' || payload.firstName.trim().length === 0) {
    isFormValid = false;
    errors.firstName = 'Please provide your first name.';
  }

  if (!payload || typeof payload.lastName !== 'string' || payload.lastName.trim().length === 0) {
    isFormValid = false;
    errors.lastName = 'Please provide your last name.';
  }

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 charactors.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors,
  };
};
