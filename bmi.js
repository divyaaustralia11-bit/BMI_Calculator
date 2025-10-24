// BMI Calculator JavaScript with Error Handling
document.addEventListener('DOMContentLoaded', function() {
    console.log('BMI Calculator loaded'); // Debug message
    
    const bmiForm = document.getElementById('bmiForm');
    const resetBtn = document.getElementById('resetBtn');
    const resultDiv = document.getElementById('result');
    
    if (!bmiForm) {
        console.error('BMI form not found!');
        return;
    }
    
    bmiForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted'); // Debug message
        
        // Clear previous errors
        clearBMIErrors();

        // Get input values
        let height = parseFloat(document.getElementById('height').value);
        const heightUnit = document.getElementById('heightUnit').value;
        const weight = parseFloat(document.getElementById('weight').value);

        console.log('Height:', height, 'Unit:', heightUnit, 'Weight:', weight); // Debug

        let isValid = true;

        // Validate height
        if (isNaN(height) || height <= 0) {
            showBMIError('heightError', 'Please enter a valid height');
            isValid = false;
        } else {
            // Convert height to meters if in cm
            if (heightUnit === 'cm') {
                if (height < 50 || height > 300) {
                    showBMIError('heightError', 'Height must be between 50 and 300 cm');
                    isValid = false;
                }
                height = height / 100; // Convert cm to meters
            } else {
                if (height < 0.5 || height > 3) {
                    showBMIError('heightError', 'Height must be between 0.5 and 3 meters');
                    isValid = false;
                }
            }
        }

        // Validate weight
        if (isNaN(weight) || weight <= 0) {
            showBMIError('weightError', 'Please enter a valid weight');
            isValid = false;
        } else if (weight < 20 || weight > 300) {
            showBMIError('weightError', 'Weight must be between 20 and 300 kg');
            isValid = false;
        }

        if (isValid) {
            // Calculate BMI
            const bmi = weight / (height * height);
            console.log('Calculated BMI:', bmi); // Debug
            displayResult(bmi);
        }
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            bmiForm.reset();
            if (resultDiv) {
                resultDiv.style.display = 'none';
            }
            clearBMIErrors();
        });
    }

    function displayResult(bmi) {
        const bmiValue = document.getElementById('bmiValue');
        const bmiCategory = document.getElementById('bmiCategory');
        const bmiMessage = document.getElementById('bmiMessage');
        
        if (!bmiValue || !bmiCategory || !bmiMessage || !resultDiv) {
            console.error('Result elements not found!');
            return;
        }

        const bmiRounded = bmi.toFixed(1);
        bmiValue.textContent = bmiRounded;

        let category = '';
        let message = '';
        let categoryClass = '';

        if (bmi < 18.5) {
            category = 'Underweight';
            categoryClass = 'underweight';
            message = 'Your BMI is ' + bmiRounded + ' — Underweight. You may need to gain weight for optimal health. Consider consulting with our healthcare professionals for personalized advice on nutrition and healthy weight gain strategies.';
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            category = 'Normal Weight';
            categoryClass = 'normal';
            message = 'Your BMI is ' + bmiRounded + ' — Normal. Congratulations! You are in a healthy weight range. Continue maintaining your current lifestyle with balanced nutrition and regular physical activity.';
        } else if (bmi >= 25 && bmi <= 29.9) {
            category = 'Overweight';
            categoryClass = 'overweight';
            message = 'Your BMI is ' + bmiRounded + ' — Overweight. You may benefit from lifestyle changes including a balanced diet and increased physical activity. Our team can help you develop a personalized weight management plan.';
        } else {
            category = 'Obese';
            categoryClass = 'obese';
            message = 'Your BMI is ' + bmiRounded + ' — Obese. It is important to consult with healthcare professionals to discuss potential health risks and develop a comprehensive plan for weight management and overall health improvement.';
        }

        bmiCategory.textContent = category;
        bmiCategory.className = 'result-category ' + categoryClass;
        bmiMessage.textContent = message;

        // Show result with animation
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        console.log('Result displayed successfully'); // Debug
    }

    function showBMIError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearBMIErrors() {
        const errors = ['heightError', 'weightError'];
        errors.forEach(errorId => {
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
        });
    }
});
