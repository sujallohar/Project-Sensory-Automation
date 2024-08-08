$(document).ready(function(){
    $('#feedbackForm').on('submit', function(e){
        e.preventDefault();
        alert('Feedback submitted successfully!');

        var formData = new FormData(e.target);
        var feedbackData = [];
        var itemName, batch, appearance, flavor, taste;

        for (let [key, value] of formData.entries()) {
            if (key === 'itemName[]') itemName = value;
            if (key === 'batch[]') batch = value;
            if (key === 'appearance[]') appearance = parseInt(value);
            if (key === 'flavor[]') flavor = parseInt(value);
            if (key === 'taste[]') taste = parseInt(value);

            if (itemName && batch && appearance && flavor && taste) {
                feedbackData.push({ itemName, batch, appearance, flavor, taste });
                itemName = batch = appearance = flavor = taste = null;
            }
        }

        var existingFeedbackData = JSON.parse(localStorage.getItem('feedbackData')) || [];
        existingFeedbackData = existingFeedbackData.concat(feedbackData);
        localStorage.setItem('feedbackData', JSON.stringify(existingFeedbackData));

        $(this).find('input[type="number"]').val('');
    });

    $('input').hover(function() {
        $(this).attr('title', $(this).attr('placeholder'));
    });

    var feedbackInputs = document.querySelectorAll('input[name="appearance[]"], input[name="flavor[]"], input[name="taste[]"]');
    feedbackInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            if (this.value < 1 || this.value > 10) {
                alert("Please enter values between 1 and 10");
                this.value = '';
            }
        });
    });
});




$(document).ready(function() {
    // Function to add a new dish
    $('#addDish').click(function() {
        var newDish = $('.dish').first().clone().css('display', 'block');
        newDish.find('input[type="hidden"]').val('NEW DISH');
        newDish.find('.dish-name').text('NEW DISH');
        newDish.find('input[type="number"]').val('');
        $('#dishes').append(newDish);
    });

    // Function to remove a dish
    $(document).on('click', '.remove-dish', function() {
        $(this).closest('.dish').remove();
    });
});







$(document).ready(function() {
    // Function to add a new dish form
    function addDish() {
        const dishTemplate = `
            <div class="dish">
                <h3 class="dish-name" contenteditable="true">New Dish</h3>
                <input type="hidden" name="itemName[]" value="New Dish">
                <input type="number" name="batch[]" placeholder="Enter batch" title="Enter the batch number" required>
                <input type="number" name="appearance[]" placeholder="Enter appearance" title="Rate the appearance out of 10" min="1" max="10" required>
                <input type="number" name="flavor[]" placeholder="Enter flavor" title="Rate the flavor out of 10" min="1" max="10" required>
                <input type="number" name="taste[]" placeholder="Enter taste" title="Rate the taste out of 10" min="1" max="10" required>
                <button type="button" class="remove-dish">Remove</button>
            </div>`;
        $('#dishes').append(dishTemplate);
    }

    // Add a dish on button click
    $('#addDish').on('click', function() {
        addDish();
    });

    // Remove a dish on button click
    $('#dishes').on('click', '.remove-dish', function() {
        $(this).parent('.dish').remove();
    });

    // Update the hidden input value when the dish name is edited
    $('#dishes').on('input', '.dish-name', function() {
        $(this).siblings('input[name="itemName[]"]').val($(this).text());
    });
});




$(document).ready(function() {
    let dishCount = 1; // Counter to maintain unique name attributes

    // Function to add a new dish
    function addDish() {
        let newDish = $('.dish.template').clone().removeClass('template').show();
        let newDishHtml = newDish.html().replace(/template/g, dishCount);
        newDish.html(newDishHtml);
        newDish.find('input[type="hidden"]').val("NEW DISH " + dishCount);
        $('#dishes').append(newDish);
        dishCount++;
    }

    // Add dish button click handler
    $('#addDishButton').click(function() {
        addDish();
    });

    // Remove dish button click handler
    $(document).on('click', '.remove-dish', function() {
        $(this).closest('.dish').remove();
    });

    // Submit form handler
    $('#feedbackForm').submit(function(event) {
        event.preventDefault();
        alert('Feedback submitted!');
        // Implement form submission via AJAX or any other method here
    });
});


