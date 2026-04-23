// Validation utilities for pre-registration form

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateName = (name) => {
  return name.trim().length >= 2 && name.trim().length <= 100;
};

export const validateField = (field, value) => {
  switch (field) {
    case 'name':
      return { valid: validateName(value), message: 'Name must be 2-100 characters' };
    case 'email':
      return { valid: validateEmail(value), message: 'Invalid email address' };
    case 'experience':
      return { valid: ['beginner', 'intermediate', 'advanced', 'professional'].includes(value), message: 'Select a valid experience level' };
    case 'markets':
      if (!Array.isArray(value) || value.length === 0) {
        return { valid: false, message: 'Select at least one market' };
      }
      return { valid: true, message: '' };
    case 'capitalRange':
      return { valid: value === '' || ['1k-10k', '10k-50k', '50k-100k', '100k+'].includes(value), message: 'Select a valid capital range' };
    case 'reason':
      return { valid: value.trim().length >= 10 && value.trim().length <= 500, message: 'Reason must be 10-500 characters' };
    default:
      return { valid: false, message: 'Unknown field' };
  }
};

export const validateForm = (formData) => {
  const errors = {};

  const nameValidation = validateField('name', formData.name);
  if (!nameValidation.valid) errors.name = nameValidation.message;

  const emailValidation = validateField('email', formData.email);
  if (!emailValidation.valid) errors.email = emailValidation.message;

  const experienceValidation = validateField('experience', formData.experience);
  if (!experienceValidation.valid) errors.experience = experienceValidation.message;

  const marketsValidation = validateField('markets', formData.markets);
  if (!marketsValidation.valid) errors.markets = marketsValidation.message;

  if (formData.capitalRange) {
    const capitalValidation = validateField('capitalRange', formData.capitalRange);
    if (!capitalValidation.valid) errors.capitalRange = capitalValidation.message;
  }

  const reasonValidation = validateField('reason', formData.reason);
  if (!reasonValidation.valid) errors.reason = reasonValidation.message;

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};
