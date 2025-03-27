const images = document.querySelectorAll('.carousel img');
let currentIndex = 0;
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const nextBtn1 = document.getElementById('nextBtn1');
const nextBtn2 = document.getElementById('nextBtn2');
const signupForm = document.getElementById('signupForm');
const progressBarSteps = document.querySelectorAll('.progress-bar-step');
const progressBarLines = document.querySelectorAll('.progress-bar-line');
const currentStepDisplay = document.getElementById('currentStep');
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
        showStep(2);
    });
}

if (nextBtn2) {
    nextBtn2.addEventListener('click', () => {
        showStep(3);
    });
}

signupForm.addEventListener('submit', (event) => {
    alert('Sign Up Successful!');
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