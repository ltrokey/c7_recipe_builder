$(document).ready(function () {
    $('#searchButton').on('click', function () {
        var ingredient = $('#ingredientInput').val();
        var searchType = $('#searchType').val();

        if (searchType === 'recipe') {
            // Call a function to fetch recipes based on the ingredient
            getRecipes(ingredient);
        } else if (searchType === 'nutrient') {
            // Call a function to fetch nutrient info based on the ingredient
            getNutrientInfo(ingredient);
        }
    });

    function getRecipes(ingredient) {
        // Implement recipe fetching logic here
        function getRecipes(ingredient) {
    window.location.href = `recipe_results.html?ingredient=${ingredient}`;
}

    }

    function getNutrientInfo(ingredient) {
        // Implement nutrient info fetching logic here
    }
});
