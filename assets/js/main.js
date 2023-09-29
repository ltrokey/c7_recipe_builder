$(document).ready(function () {
    
    
    
    $(".searchBtn").on("click", function(e){
       e.preventDefault();
       var userInput=$("#userInput").val().split(", ");
       console.log(userInput);
        var formInputValue = $("#format-Input").val();
        for (var i = 0; i < userInput.length; i++) {
            
        }
        if (formInputValue === "Nutrition") {
            
            window.location.assign("./nutrition.html?q=" + userInput) 
        } else if (formInputValue === "Recipes") {
            
            window.location.assign("./recipe.html?q=" + userInput) ;
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
