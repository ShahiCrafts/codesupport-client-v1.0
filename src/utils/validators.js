export const validators = {
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'Email is required';
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return '';
  },

  password: (value) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    return '';
  },

  required: (value, fieldName = 'This field') => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return `${fieldName} is required`;
    }
    return '';
  },

  minLength: (value, length, fieldName = 'This field') => {
    if (value && value.length < length) {
      return `${fieldName} must be at least ${length} characters`;
    }
    return '';
  },

  maxLength: (value, length, fieldName = 'This field') => {
    if (value && value.length > length) {
      return `${fieldName} must be no more than ${length} characters`;
    }
    return '';
  },

  passwordMatch: (password, confirmPassword) => {
    if (password !== confirmPassword) return 'Passwords do not match';
    return '';
  },
};

export const validateLoginForm = (values) => {
  const errors = {};

  const emailError = validators.email(values.email);
  if (emailError) errors.email = emailError;

  const passwordError = validators.password(values.password);
  if (passwordError) errors.password = passwordError;

  return errors;
};

export const validateRegisterForm = (values) => {
  const errors = {};

  const nameError = validators.required(values.name, 'Full name');
  if (nameError) errors.name = nameError;

  const emailError = validators.email(values.email);
  if (emailError) errors.email = emailError;

  const passwordError = validators.password(values.password);
  if (passwordError) errors.password = passwordError;

  const matchError = validators.passwordMatch(values.password, values.confirmPassword);
  if (matchError) errors.confirmPassword = matchError;

  if (!values.agreeTerms) errors.agreeTerms = 'You must agree to the terms';

  return errors;
};

export const validateContactForm = (values) => {
  const errors = {};

  const nameError = validators.required(values.name, 'Name');
  if (nameError) errors.name = nameError;

  const emailError = validators.email(values.email);
  if (emailError) errors.email = emailError;

  const subjectError = validators.required(values.subject, 'Subject');
  if (subjectError) errors.subject = subjectError;

  const messageError = validators.required(values.message, 'Message');
  if (messageError) errors.message = messageError;

  return errors;
};

export const validateTaskForm = (values) => {
  const errors = {};

  const titleError = validators.required(values.title, 'Task title');
  if (titleError) errors.title = titleError;

  const typeError = validators.required(values.serviceType, 'Service type');
  if (typeError) errors.serviceType = typeError;

  const deadlineError = validators.required(values.deadline, 'Deadline');
  if (deadlineError) errors.deadline = deadlineError;

  const descriptionError = validators.required(values.description, 'Description');
  if (descriptionError) errors.description = descriptionError;

  if (values.description && values.description.length < 50) {
    errors.description = 'Please provide a more detailed description (at least 50 characters)';
  }

  return errors;
};
