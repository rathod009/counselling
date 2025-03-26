const images = document.querySelectorAll('.carousel img');
        let currentIndex = 0;
        const step1 = document.getElementById('step1');
        const step2 = document.getElementById('step2');
        const step3 = document.getElementById('step3');
        const nextBtn1 = document.getElementById('nextBtn1');
        const prevBtn2 = document.getElementById('prevBtn2');
        const nextBtn2 = document.getElementById('nextBtn2');
        const prevBtn3 = document.getElementById('prevBtn3');
        const signupForm = document.getElementById('signupForm');
        const progressBarSteps = document.querySelectorAll('.progress-bar-step');
        const progressBarLines = document.querySelectorAll('.progress-bar-line');
        const currentStepDisplay = document.getElementById('currentStep');
        const otpInput = document.getElementById('otp');
        const otpError = document.getElementById('otpError');
        let currentStep = 1; // Initialize currentStep

        function updateProgressBar() {
            progressBarSteps.forEach((step, index) => {
                step.classList.toggle('active', index < currentStep);
            });
            progressBarLines.forEach((line, index) => {
                line.classList.toggle('active', index < currentStep - 1);
            });
            currentStepDisplay.textContent = currentStep;
        }

        function showStep(stepNumber) {
            step1.classList.remove('active');
            step2.classList.remove('active');
            step3.classList.remove('active');

            if (stepNumber === 1) {
                step1.classList.add('active');
                currentStep = 1;
            } else if (stepNumber === 2) {
                step2.classList.add('active');
                currentStep = 2;
            } else if (stepNumber === 3) {
                step3.classList.add('active');
                currentStep = 3;
            }

            updateProgressBar();
        }

        if (nextBtn1) {
            nextBtn1.addEventListener('click', () => {
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const mobile = document.getElementById('mobile').value.trim();
                const password = document.getElementById('password').value.trim();

                if (name && email && mobile && password) {
                    showStep(2);
                } else {
                    alert('Please fill in all the required fields in the first step.');
                }
            });
        }

        if (prevBtn2) {
            prevBtn2.addEventListener('click', () => {
                showStep(1);
            });
        }

        if (nextBtn2) {
            nextBtn2.addEventListener('click', () => {
                const otpValue = otpInput.value.trim();
                if (otpValue) {
                    otpError.textContent = '';
                    showStep(3);
                } else {
                    otpError.textContent = 'Please enter the OTP.';
                }
            });
        }

        if (prevBtn3) {
            prevBtn3.addEventListener('click', () => {
                showStep(2);
            });
        }

        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const mobile = document.getElementById('mobile').value;
            const password = document.getElementById('password').value;
            const otp = document.getElementById('otp').value;
            const city = document.getElementById('city').value;
            const occupation = document.getElementById('occupation').value;

            console.log('Form Data:', { name, email, mobile, password, otp, city, occupation });
            alert('Sign Up Successful! (Check console for data)');
        });

        function nextSlide() {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length; // Loop back to first image
            images[currentIndex].classList.add('active');
        }

        setInterval(nextSlide, 3000); // Change image every 3 seconds

        // Show the first step initially
        showStep(currentStep);
        updateProgressBar();