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
           const listItem = `<li>
            <span>${recipe.name}</span>
            <a href="recipe_details.html?name=${encodeURIComponent(recipe.name)}&servingSize=${recipe.servingSize}&prepTime=${recipe.prepTime}&ingredients=${encodeURIComponent(JSON.stringify(recipe.ingredients))}&instructions=${encodeURIComponent(JSON.stringify(recipe.instructions))}&imageUrl=${recipe.imageUrl}">View Details</a>
        </li>`;
            recipeList.append(listItem);
        });
    }

    // Call the function to fetch recipes
    fetchRecipes(ingredient);
});
