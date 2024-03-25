// Define states and cities
var stateCities = {
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
    "Delhi": ["New Delhi"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli"],
    // Add more states and cities here
};

// Function to populate cities based on selected state
function populateCities() {
    var stateSelect = document.getElementById("states");
    var citySelect = document.getElementById("cities");
    var selectedState = stateSelect.value;

    // Clear existing options
    citySelect.innerHTML = '<option value="">Select City</option>';

    if (selectedState !== "") {
        var cities = stateCities[selectedState];
        cities.forEach(function(city) {
            var option = document.createElement("option");
            option.text = city;
            option.value = city;
            citySelect.appendChild(option);
        });
    }
}
// Populate states
document.addEventListener("DOMContentLoaded", function() {
    var stateSelect = document.getElementById("states");
    Object.keys(stateCities).forEach(function(state) {
        var option = document.createElement("option");
        option.text = state;
        option.value = state;
        stateSelect.appendChild(option);
    });
});

