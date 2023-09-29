$(document).ready(function() {

    var apiKey ='4f88b4f93e474ca7a15d148f0cc24000'
    userInput = 'turkey, cranberry'
    var UrlIngredients = userInput.replace(/,/g, ',+')

    console.log(UrlIngredients)


      // reminder - make alerts if data not available

    function getIngredientRecipe() {
      var requestUrlIngredient = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${UrlIngredients}&apiKey=${apiKey}`

      fetch(requestUrlIngredient)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
          for (var i = 0; i < 9; i++) {
            console.log(data[i])
            // Recipe Id
            console.log(data[i].id)
            // Recipe Image
            console.log(data[i].image)
            // Recipe Name
            console.log(data[i].title)
          }
          // Place Holder Id - First Item (need to add event listener?)
          getRecipeIngredientList(data[3].id)
        })
    }
      getIngredientRecipe()


    function getRecipeIngredientList(recipeId) {
      var requestUrlRecipeIngredients = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`

      fetch(requestUrlRecipeIngredients)
      .then(function(response) {
          return response.json()
      })
      .then(function(data) {
        for (var i = 0; i < data.extendedIngredients.length; i++) {
        console.log(data)
        // Ingredient Name
        console.log(data.extendedIngredients[i].nameClean)
        // Ingredient Amount
        console.log(data.extendedIngredients[i].measures.us.amount)
        // Ingredient Measurement
        console.log(data.extendedIngredients[i].measures.us.unitShort)

        }
        // Recipe Instruction (add modal for note if unavailable)
        console.log(data.instructions)
      })
    }
      // getRecipeIngredientList()

})




d51f94a45dc58fbdd3b8cb1089f227c9
