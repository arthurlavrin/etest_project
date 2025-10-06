// Auth Modal Handler
(function () {
  // Email validation regex
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PASSWORD_MIN_LENGTH = 6;

  // Module state
  let modal, loginForm, signupForm, tabs;

  // Wait for DOM and layout.js to load
  window.addEventListener('DOMContentLoaded', initAuthModal);

  function initAuthModal() {
    // Wait for header and modal to be loaded
    setTimeout(checkAndInit, 50);
  }

  function checkAndInit() {
    const modalContainer = document.getElementById('auth-modal');
    const modalElement = modalContainer?.querySelector('.auth-modal');
    const header = document.getElementById('header');

    // Check if both header and modal content are loaded
    if (!modalContainer || !modalElement?.querySelector('.auth-modal-content')) {
      setTimeout(checkAndInit, 50);
      return;
    }

    if (!header?.querySelector('.icons-btn')) {
      setTimeout(checkAndInit, 50);
      return;
    }

    // Initialize module state
    modal = modalElement;
    const userButton = header.querySelector('.icons-btn:first-of-type');
    const closeButton = modal.querySelector('.auth-modal-close');
    const overlay = modal.querySelector('.auth-modal-overlay');
    tabs = modal.querySelectorAll('.auth-tab');
    loginForm = modal.querySelector('#loginForm');
    signupForm = modal.querySelector('#signupForm');

    console.log('Auth modal initialized', {
      userButton,
      modal,
      modalContainer,
      header,
      hasModalContent: !!modal.querySelector('.auth-modal-content'),
      modalHTML: modal.innerHTML
    });

    // Setup event listeners
    setupEventListeners(userButton, closeButton, overlay);
    setupPasswordToggles();
    setupRealtimeValidation();
  }

  function setupEventListeners(userButton, closeButton, overlay) {
    // Open modal when user icon is clicked
    if (userButton) {
      console.log('Adding click listener to user button');
      userButton.addEventListener('click', handleUserButtonClick);
    } else {
      console.error('User button not found!');
    }

    // Close modal
    if (closeButton) {
      closeButton.addEventListener('click', closeModal);
    }
    if (overlay) {
      overlay.addEventListener('click', closeModal);
    }

    // Close on ESC key
    document.addEventListener('keydown', handleEscKey);

    // Tab switching
    tabs.forEach(tab => {
      tab.addEventListener('click', () => switchTab(tab));
    });

    // Form submissions
    if (loginForm) {
      loginForm.addEventListener('submit', handleLoginSubmit);
    }
    if (signupForm) {
      signupForm.addEventListener('submit', handleSignupSubmit);
    }
  }

  function handleUserButtonClick() {
    console.log('User button clicked!');
    openModal();
  }

  function handleEscKey(e) {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeModal();
    }
  }

  function openModal() {
    console.log('Opening modal...');
    modal.classList.add('active');
    document.body.classList.add('modal-open');

    // Debug modal visibility
    const computedStyle = window.getComputedStyle(modal);
    console.log('Modal opened, classes:', modal.classList.toString());
    console.log('Modal display:', computedStyle.display);
    console.log('Modal visibility:', computedStyle.visibility);
    console.log('Modal z-index:', computedStyle.zIndex);
    console.log('Modal position:', computedStyle.position);
    console.log('Modal dimensions:', {
      width: computedStyle.width,
      height: computedStyle.height,
      top: computedStyle.top,
      left: computedStyle.left
    });
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');

    // Reset forms
    if (loginForm) {loginForm.reset();}
    if (signupForm) {signupForm.reset();}

    // Clear errors
    clearFormErrors(loginForm);
    clearFormErrors(signupForm);
  }

  function switchTab(clickedTab) {
    const tabType = clickedTab.dataset.tab;

    // Update tab active state
    tabs.forEach(tab => tab.classList.remove('active'));
    clickedTab.classList.add('active');

    // Update form container active state
    const loginContainer = document.getElementById('login-form');
    const signupContainer = document.getElementById('signup-form');

    if (tabType === 'login') {
      loginContainer.classList.add('active');
      signupContainer.classList.remove('active');
    } else {
      signupContainer.classList.add('active');
      loginContainer.classList.remove('active');
    }
  }

  function setupPasswordToggles() {
    const toggleButtons = modal.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
      button.addEventListener('click', handlePasswordToggle);
    });
  }

  function handlePasswordToggle() {
    const wrapper = this.closest('.password-wrapper');
    const input = wrapper.querySelector('input');
    const eyeIcon = this.querySelector('.eye-icon');
    const eyeOffIcon = this.querySelector('.eye-off-icon');

    if (input.type === 'password') {
      input.type = 'text';
      eyeIcon.classList.add('hidden');
      eyeOffIcon.classList.remove('hidden');
    } else {
      input.type = 'password';
      eyeIcon.classList.remove('hidden');
      eyeOffIcon.classList.add('hidden');
    }
  }

  function handleLoginSubmit(e) {
    e.preventDefault();

    const email = loginForm.querySelector('#login-email');
    const password = loginForm.querySelector('#login-password');

    let isValid = true;

    // Validate email
    if (!validateEmail(email.value)) {
      showError(email, 'Please enter a valid email address');
      isValid = false;
    } else {
      showSuccess(email);
    }

    // Validate password
    if (!validatePassword(password.value)) {
      showError(password, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`);
      isValid = false;
    } else {
      showSuccess(password);
    }

    if (isValid) {
      // Simulate login
      console.log('Login successful', {
        email: email.value
      });

      // Show success message
      showFormMessage(loginForm, 'Login successful! Welcome back.', 'success');

      // Close modal after delay
      setTimeout(() => {
        closeModal();
      }, 1500);
    }
  }

  function handleSignupSubmit(e) {
    e.preventDefault();

    const username = signupForm.querySelector('#signup-username');
    const email = signupForm.querySelector('#signup-email');
    const password = signupForm.querySelector('#signup-password');
    const confirmPassword = signupForm.querySelector('#signup-confirm-password');

    let isValid = true;

    // Validate username
    if (username.value.trim().length < 3) {
      showError(username, 'Username must be at least 3 characters');
      isValid = false;
    } else {
      showSuccess(username);
    }

    // Validate email
    if (!validateEmail(email.value)) {
      showError(email, 'Please enter a valid email address');
      isValid = false;
    } else {
      showSuccess(email);
    }

    // Validate password
    if (!validatePassword(password.value)) {
      showError(password, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`);
      isValid = false;
    } else {
      showSuccess(password);
    }

    // Validate confirm password
    if (password.value !== confirmPassword.value) {
      showError(confirmPassword, 'Passwords do not match');
      isValid = false;
    } else if (confirmPassword.value.length > 0) {
      showSuccess(confirmPassword);
    }

    if (isValid) {
      // Simulate signup
      console.log('Signup successful', {
        username: username.value,
        email: email.value
      });

      // Show success message
      showFormMessage(signupForm, 'Account created successfully! Welcome.', 'success');

      // Close modal after delay
      setTimeout(() => {
        closeModal();
      }, 1500);
    }
  }

  function setupRealtimeValidation() {
    // Login form validation
    if (loginForm) {
      const email = loginForm.querySelector('#login-email');
      const password = loginForm.querySelector('#login-password');

      if (email) {
        email.addEventListener('blur', () => validateEmailField(email));
        email.addEventListener('input', () => clearError(email));
      }

      if (password) {
        password.addEventListener('blur', () => validatePasswordField(password));
        password.addEventListener('input', () => clearError(password));
      }
    }

    // Signup form validation
    if (signupForm) {
      const username = signupForm.querySelector('#signup-username');
      const email = signupForm.querySelector('#signup-email');
      const password = signupForm.querySelector('#signup-password');
      const confirmPassword = signupForm.querySelector('#signup-confirm-password');

      if (username) {
        username.addEventListener('blur', () => validateUsernameField(username));
        username.addEventListener('input', () => clearError(username));
      }

      if (email) {
        email.addEventListener('blur', () => validateEmailField(email));
        email.addEventListener('input', () => clearError(email));
      }

      if (password) {
        password.addEventListener('blur', () => validatePasswordField(password));
        password.addEventListener('input', () => clearError(password));
      }

      if (confirmPassword) {
        confirmPassword.addEventListener('blur', () => validateConfirmPasswordField(password, confirmPassword));
        confirmPassword.addEventListener('input', () => clearError(confirmPassword));
      }
    }
  }

  function validateUsernameField(username) {
    if (username.value.trim().length < 3) {
      showError(username, 'Username must be at least 3 characters');
      return false;
    }
    showSuccess(username);
    return true;
  }

  function validateEmailField(email) {
    if (!validateEmail(email.value)) {
      showError(email, 'Please enter a valid email address');
      return false;
    }
    showSuccess(email);
    return true;
  }

  function validatePasswordField(password) {
    if (!validatePassword(password.value)) {
      showError(password, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`);
      return false;
    }
    showSuccess(password);
    return true;
  }

  function validateConfirmPasswordField(password, confirmPassword) {
    if (password.value !== confirmPassword.value) {
      showError(confirmPassword, 'Passwords do not match');
      return false;
    }
    if (confirmPassword.value.length > 0) {
      showSuccess(confirmPassword);
    }
    return true;
  }

  // Validation helpers
  function validateEmail(email) {
    return EMAIL_REGEX.test(email.trim());
  }

  function validatePassword(password) {
    return password.length >= PASSWORD_MIN_LENGTH;
  }

  // UI feedback helpers
  function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');

    formGroup.classList.add('error');
    formGroup.classList.remove('success');

    if (errorElement) {
      errorElement.textContent = message;
    }

    input.classList.add('error');
    input.classList.remove('success');
  }

  function showSuccess(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');

    formGroup.classList.add('success');
    formGroup.classList.remove('error');

    if (errorElement) {
      errorElement.textContent = '';
    }

    input.classList.add('success');
    input.classList.remove('error');
  }

  function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');

    formGroup.classList.remove('error');

    if (errorElement) {
      errorElement.textContent = '';
    }

    input.classList.remove('error');
  }

  function clearFormErrors(form) {
    if (!form) {return;}

    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(group => {
      group.classList.remove('error', 'success');
      const errorElement = group.querySelector('.error-message');
      if (errorElement) {
        errorElement.textContent = '';
      }
    });

    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
      input.classList.remove('error', 'success');
    });
  }

  function showFormMessage(form, message, type) {
    // Remove any existing message
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;

    // Insert at the top of the form
    form.insertBefore(messageDiv, form.firstChild);

    // Remove after 3 seconds
    setTimeout(() => {
      messageDiv.remove();
    }, 3000);
  }
})();
