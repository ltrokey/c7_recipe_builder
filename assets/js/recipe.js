$(document).ready(function() {

    var apiKey ='c9503030b0c3421a80e16c30f4f1b65e'
    var userInput = ''
    var urlIngredients = ''

  // User Search Parameters
    function getParams() {
      var searchParams = new URLSearchParams(document.location.search)
      userInput = searchParams.get("q")
      console.log(userInput)

      if (userInput) {
          urlIngredients = userInput.replace(/,/g, ',+')
          getIngredientRecipes(urlIngredients)
      }
    }

    getParams()

  // Reipe Preview Cards
    function getIngredientRecipes() {
      var requestUrlIngredient = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${urlIngredients}&apiKey=${apiKey}`

      fetch(requestUrlIngredient)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
          for (var i = 0; i < data.length; i++) {

            // Image Column
            var imageColumn = $('<div>').addClass('col-md-4')
            var recipeImage = $('<img>').addClass('img-fluid').attr('src', recipeImageUrl)
            var recipeImageUrl = data[i].image

            imageColumn.append(recipeImage)

            // Details Column
            var detailsColumn = $('<div>').addClass('col-md-8')
            var recipeName = $('<h2>').text(data[i].title)
            var recipeId = $('<p>').addClass('text-right').text('Recipe Id: ' + data[i].id)
            var recipeLikes = $('<p>').text('Likes: ' + data[i].likes)
            var viewBtn = $('<button>').text("View")

            detailsColumn.append(recipeId, recipeName, recipeLikes, viewBtn)

            //Container per Recipe Preview (combines colums)
            var container = $('<div>').addClass('row m-3 border border-secondary')
            container.append(imageColumn,detailsColumn)

            $('#recipePreviewContainer').append(container)
          }
          // Place Holder Id - First Item (need to add event listener?)
          // getRecipe(data[3].id)
        })
        .catch(function(error) {
          console.error("An error occurred:", error)
      })
    }

    // Recipe Card
    function getRecipe(recipeId) {
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

        // var favoriteBtn = $('<button>').text("Favorite")

        }
        // Recipe Instruction (add modal for note if unavailable)
        console.log(data.instructions)
      })
      .catch(function(error) {
        console.error("An error occurred:", error)
    })
    }
      getRecipe()

})





