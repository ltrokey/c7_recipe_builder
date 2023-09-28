$(document).ready(function () {
    // Extract the recipe details from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const recipeName = urlParams.get('name');
    const servingSize = urlParams.get('servingSize');
    const prepTime = urlParams.get('prepTime');
    const ingredients = JSON.parse(urlParams.get('ingredients'));
    const instructions = JSON.parse(urlParams.get('instructions'));
    const imageUrl = urlParams.get('imageUrl');

    // Display recipe details
    $('#recipeImage').attr('src', imageUrl);
    $('#recipeName').text(recipeName);
    $('#servingSize').text(servingSize);
    $('#prepTime').text(prepTime);

    const ingredientList = $('#ingredientList');
    ingredients.forEach(ingredient => {
        const listItem = `<li>${ingredient}</li>`;
        ingredientList.append(listItem);
    });

    const instructionList = $('#instructionList');
    instructions.forEach(instruction => {
        const listItem = `<li>${instruction}</li>`;
        instructionList.append(listItem);
    });
});
