$(document).ready(function () {
    $(".searchBtn").on("click", function(){
        var formInputValue = $("#format-Input").val(); 
        if (formInputValue === "Nutrition") {
            
            window.location.href = "file:///C:/Users/PC/repos/c7_recipe_builder/Nutrition.html";
        } else if (formInputValue === "Recipes") {
            
            window.location.href = "file:///C:/Users/PC/repos/c7_recipe_builder/Recipes.html";
        } else {
         
            alert("Please select a valid option");
        }
    });
});


//function for when "recipe" button is clicked it will send you to the recipe.html page.



// function redirectRecipes(){
//     window.open("recipe.html")
// }
// //function for when "Nutrient" button is clicked it will send you to nutri.html page.
// function redirectNutri(){
//     window.open("nutri.html")
// }
