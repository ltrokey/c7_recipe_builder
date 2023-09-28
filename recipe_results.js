$(document).ready(function () {
    // Extract the ingredient from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const ingredient = urlParams.get('ingredient');

    // Function to fetch recipes
    function fetchRecipes(ingredient) {
        // Implement recipe fetching logic here
        // Once you have the list of recipes, call displayRecipes function
        const recipes = [...]; // Placeholder for the list of recipes
        displayRecipes(recipes);
    }

    // Function to display recipes
    function displayRecipes(recipes) {
        const recipeList = $('#recipeList');
        recipes.slice(0, 10).forEach(recipe => {
            const listItem = `<li>${recipe.name}</li>`;
            recipeList.append(listItem);
        });
    }

    // Call the function to fetch recipes
    fetchRecipes(ingredient);
});
