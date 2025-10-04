// Auth Modal Handler
(function () {
    // Email validation regex
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PASSWORD_MIN_LENGTH = 6;

    // Wait for DOM and layout.js to load
    window.addEventListener('DOMContentLoaded', initAuthModal);

    function initAuthModal() {
        // Wait for header and modal to be loaded
        const checkAndInit = () => {
            const modalContainer = document.getElementById('auth-modal');
            const modal = modalContainer?.querySelector('.auth-modal');
            const header = document.getElementById('header');
            
            // Check if both header and modal content are loaded
            if (!modalContainer || !modal || !modal.querySelector('.auth-modal-content')) {
                setTimeout(checkAndInit, 50);
                return;
            }
            
            if (!header || !header.querySelector('.icons-btn')) {
                setTimeout(checkAndInit, 50);
                return;
            }

            const userButton = header.querySelector('.icons-btn:first-of-type');
            const closeButton = modal.querySelector('.auth-modal-close');
            const overlay = modal.querySelector('.auth-modal-overlay');
            const tabs = modal.querySelectorAll('.auth-tab');
            const loginForm = modal.querySelector('#loginForm');
            const signupForm = modal.querySelector('#signupForm');
            
            console.log('Auth modal initialized', { 
                userButton, 
                modal, 
                modalContainer,
                header,
                hasModalContent: !!modal.querySelector('.auth-modal-content'),
                modalHTML: modal.innerHTML
            });

            // Open modal when user icon is clicked
            if (userButton) {
                console.log('Adding click listener to user button');
                userButton.addEventListener('click', (e) => {
                    console.log('User button clicked!');
                    openModal();
                });
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
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    closeModal();
                }
            });

            // Tab switching
            tabs.forEach(tab => {
                tab.addEventListener('click', () => switchTab(tab));
            });

            // Password toggle functionality
            setupPasswordToggles();

            // Form submissions
            if (loginForm) {
                loginForm.addEventListener('submit', handleLoginSubmit);
            }
            if (signupForm) {
                signupForm.addEventListener('submit', handleSignupSubmit);
            }

            // Real-time validation
            setupRealtimeValidation();

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
                if (loginForm) loginForm.reset();
                if (signupForm) signupForm.reset();
                
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
                    button.addEventListener('click', function() {
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
                    });
                });
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
                    // Mock successful login
                    console.log('Login successful!', {
                        email: email.value,
                        password: '***hidden***'
                    });
                    
                    // Show success message
                    alert('Login successful! (This is a demo - no backend yet)');
                    closeModal();
                }
            }

            function handleSignupSubmit(e) {
                e.preventDefault();
                
                const name = signupForm.querySelector('#signup-name');
                const email = signupForm.querySelector('#signup-email');
                const password = signupForm.querySelector('#signup-password');
                const confirmPassword = signupForm.querySelector('#signup-confirm-password');
                const terms = signupForm.querySelector('input[name="terms"]');
                
                let isValid = true;
                
                // Validate name
                if (!name.value.trim() || name.value.trim().length < 2) {
                    showError(name, 'Please enter your full name');
                    isValid = false;
                } else {
                    showSuccess(name);
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
                
                // Validate password confirmation
                if (password.value !== confirmPassword.value) {
                    showError(confirmPassword, 'Passwords do not match');
                    isValid = false;
                } else if (confirmPassword.value) {
                    showSuccess(confirmPassword);
                }
                
                // Validate terms checkbox
                if (!terms.checked) {
                    alert('Please agree to the Terms & Conditions');
                    isValid = false;
                }
                
                if (isValid) {
                    // Mock successful signup
                    console.log('Signup successful!', {
                        name: name.value,
                        email: email.value,
                        password: '***hidden***'
                    });
                    
                    // Show success message
                    alert('Account created successfully! (This is a demo - no backend yet)');
                    closeModal();
                }
            }

            function setupRealtimeValidation() {
                // Login form
                const loginEmail = loginForm?.querySelector('#login-email');
                const loginPassword = loginForm?.querySelector('#login-password');
                
                if (loginEmail) {
                    loginEmail.addEventListener('blur', function() {
                        if (this.value) {
                            if (!validateEmail(this.value)) {
                                showError(this, 'Please enter a valid email address');
                            } else {
                                showSuccess(this);
                            }
                        }
                    });
                    
                    loginEmail.addEventListener('input', function() {
                        if (this.classList.contains('error')) {
                            clearFieldError(this);
                        }
                    });
                }
                
                if (loginPassword) {
                    loginPassword.addEventListener('blur', function() {
                        if (this.value) {
                            if (!validatePassword(this.value)) {
                                showError(this, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`);
                            } else {
                                showSuccess(this);
                            }
                        }
                    });
                    
                    loginPassword.addEventListener('input', function() {
                        if (this.classList.contains('error')) {
                            clearFieldError(this);
                        }
                    });
                }
                
                // Signup form
                const signupEmail = signupForm?.querySelector('#signup-email');
                const signupPassword = signupForm?.querySelector('#signup-password');
                const signupConfirmPassword = signupForm?.querySelector('#signup-confirm-password');
                
                if (signupEmail) {
                    signupEmail.addEventListener('blur', function() {
                        if (this.value) {
                            if (!validateEmail(this.value)) {
                                showError(this, 'Please enter a valid email address');
                            } else {
                                showSuccess(this);
                            }
                        }
                    });
                    
                    signupEmail.addEventListener('input', function() {
                        if (this.classList.contains('error')) {
                            clearFieldError(this);
                        }
                    });
                }
                
                if (signupPassword) {
                    signupPassword.addEventListener('blur', function() {
                        if (this.value) {
                            if (!validatePassword(this.value)) {
                                showError(this, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`);
                            } else {
                                showSuccess(this);
                            }
                        }
                    });
                    
                    signupPassword.addEventListener('input', function() {
                        if (this.classList.contains('error')) {
                            clearFieldError(this);
                        }
                    });
                }
                
                if (signupConfirmPassword && signupPassword) {
                    signupConfirmPassword.addEventListener('blur', function() {
                        if (this.value) {
                            if (this.value !== signupPassword.value) {
                                showError(this, 'Passwords do not match');
                            } else {
                                showSuccess(this);
                            }
                        }
                    });
                    
                    signupConfirmPassword.addEventListener('input', function() {
                        if (this.classList.contains('error')) {
                            clearFieldError(this);
                        }
                    });
                }
            }

            function validateEmail(email) {
                return EMAIL_REGEX.test(email);
            }

            function validatePassword(password) {
                return password.length >= PASSWORD_MIN_LENGTH;
            }

            function showError(input, message) {
                const formGroup = input.closest('.form-group');
                const errorMessage = formGroup?.querySelector('.error-message');
                
                if (input) {
                    input.classList.add('error');
                    input.classList.remove('success');
                }
                if (errorMessage) {
                    errorMessage.textContent = message;
                }
            }

            function showSuccess(input) {
                const formGroup = input.closest('.form-group');
                const errorMessage = formGroup?.querySelector('.error-message');
                
                if (input) {
                    input.classList.remove('error');
                    input.classList.add('success');
                }
                if (errorMessage) {
                    errorMessage.textContent = '';
                }
            }

            function clearFieldError(input) {
                const formGroup = input.closest('.form-group');
                const errorMessage = formGroup?.querySelector('.error-message');
                
                if (input) {
                    input.classList.remove('error');
                    input.classList.remove('success');
                }
                if (errorMessage) {
                    errorMessage.textContent = '';
                }
            }

            function clearFormErrors(form) {
                if (!form) return;
                
                const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
                inputs.forEach(input => {
                    if (input) {
                        clearFieldError(input);
                    }
                });
            }
        };
        
        checkAndInit();
    }
})();

