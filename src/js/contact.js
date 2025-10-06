// Contact Form Validation with Real-time Feedback

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Helper functions moved to outer scope for better maintainability
function showFieldError(field, message) {
  const formField = field.closest('.form-field');
  const errorMessage = formField?.querySelector('.error-message');

  field.classList.add('error');
  field.classList.remove('success');

  if (errorMessage) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
  }
}

function showFieldSuccess(field) {
  const formField = field.closest('.form-field');
  const errorMessage = formField?.querySelector('.error-message');

  field.classList.remove('error');
  field.classList.add('success');

  if (errorMessage) {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
  }
}

function clearFieldError(field) {
  const formField = field.closest('.form-field');
  const errorMessage = formField?.querySelector('.error-message');

  field.classList.remove('error');
  field.classList.remove('success');

  if (errorMessage) {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedbackForm');
  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const topicField = document.getElementById('topic');
  const messageField = document.getElementById('message');
  const formMessage = document.getElementById('form-message');

  // Setup real-time validation
  setupRealtimeValidation();

  // Form submission
  form.addEventListener('submit', handleSubmit);

  function setupRealtimeValidation() {
    // Name validation
    nameField.addEventListener('blur', function() {
      validateName(this);
    });
    nameField.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        clearFieldError(this);
      }
    });

    // Email validation - real-time as user types
    emailField.addEventListener('input', function() {
      validateEmail(this, true); // true = real-time mode
    });
    emailField.addEventListener('blur', function() {
      validateEmail(this, false); // false = strict validation on blur
    });

    // Topic validation
    topicField.addEventListener('blur', function() {
      validateTopic(this);
    });
    topicField.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        clearFieldError(this);
      }
    });

    // Message validation
    messageField.addEventListener('blur', function() {
      validateMessage(this);
    });
    messageField.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        clearFieldError(this);
      }
    });
  }

  function validateName(field) {
    const value = field.value.trim();

    if (!value) {
      showFieldError(field, 'Name is required');
      return false;
    }

    if (value.length < 2) {
      showFieldError(field, 'Name must be at least 2 characters');
      return false;
    }

    showFieldSuccess(field);
    return true;
  }

  function validateEmail(field, isRealtime = false) {
    const value = field.value.trim();

    // Don't show error while typing if field is empty (real-time mode)
    if (isRealtime && !value) {
      clearFieldError(field);
      return false;
    }

    if (!value) {
      showFieldError(field, 'Email is required');
      return false;
    }

    if (!EMAIL_REGEX.test(value)) {
      showFieldError(field, 'Please enter a valid email address (e.g., name@example.com)');
      return false;
    }

    showFieldSuccess(field);
    return true;
  }

  function validateTopic(field) {
    const value = field.value.trim();

    if (!value) {
      showFieldError(field, 'Topic is required');
      return false;
    }

    if (value.length < 3) {
      showFieldError(field, 'Topic must be at least 3 characters');
      return false;
    }

    showFieldSuccess(field);
    return true;
  }

  function validateMessage(field) {
    const value = field.value.trim();

    if (!value) {
      showFieldError(field, 'Message is required');
      return false;
    }

    if (value.length < 10) {
      showFieldError(field, 'Message must be at least 10 characters');
      return false;
    }

    showFieldSuccess(field);
    return true;
  }

  function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Hide after 5 seconds for success messages
    if (type === 'success') {
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Hide previous messages
    formMessage.style.display = 'none';

    // Validate all fields
    const isNameValid = validateName(nameField);
    const isEmailValid = validateEmail(emailField, false);
    const isTopicValid = validateTopic(topicField);
    const isMessageValid = validateMessage(messageField);

    // Check if all fields are valid
    if (!isNameValid || !isEmailValid || !isTopicValid || !isMessageValid) {
      showFormMessage('Please fix the errors above and try again.', 'error');
      return;
    }

    // All valid - show success message
    showFormMessage('Thank you for your feedback! We will contact you soon.', 'success');

    // Reset form
    form.reset();

    // Clear all field states
    [nameField, emailField, topicField, messageField].forEach(field => {
      clearFieldError(field);
    });

    console.log('Form submitted successfully:', {
      name: nameField.value,
      email: emailField.value,
      topic: topicField.value,
      message: messageField.value
    });
  }
});
