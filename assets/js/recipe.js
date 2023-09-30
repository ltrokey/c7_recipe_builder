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

  // Recipe Preview Cards
    function getIngredientRecipes() {
      var requestUrlIngredient = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${urlIngredients}&apiKey=${apiKey}`

      fetch(requestUrlIngredient)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
          for (var i = 0; i < data.length; i++) {

            var recipeImageUrl = data[i].image

            // Image Column
            var recipeImage = $('<img>').addClass('col-12 img-fluid p-4').attr('src', recipeImageUrl)
            var imageColumn = $('<div>').addClass('col-md-6 text-center')
            imageColumn.append(recipeImage)

            // Details Column
            var detailsColumn = $('<div>').addClass('col-md-6 p-3')
            var recipeName = $('<h2>').addClass('text-center').text(data[i].title)
            var recipeId = $('<p>').addClass('text-end').text('Recipe Id: ' + data[i].id)
            var recipeLikes = $('<p>').addClass('text-end').text('Likes: ' + data[i].likes)

            detailsColumn.append(recipeId, recipeLikes, recipeName)

            // View Button & Event Row
            var btnRow = $('<div>').addClass('row justify-content-center')
            var viewBtn = $('<button>').addClass('col-4 m-2 rounded').text("View")
            addViewBtnEvent(viewBtn, data[i].id, recipeImageUrl, data[i].title)

            btnRow.append(viewBtn)

            //Container per Recipe Preview (combines colums)
            var container = $('<div>').addClass('row m-3 border border-secondary')
            container.append(imageColumn,detailsColumn, btnRow)

            $('#recipePreviewContainer').append(container)
          }
        })
        .catch(function(error) {
          console.error("An error occurred:", error)
      })
    }

    // Recipe Card
    function getRecipe(recipeId, recipeImageUrl, recipeName) {
      var requestUrlRecipeIngredients = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`

      fetch(requestUrlRecipeIngredients)
      .then(function(response) {
          return response.json()
      })
      .then(function(data) {

        // Ingredient Details
        var containerDetails = $('<div>').addClass('col-md-6 mt-3')
        var ingredientsListEl = $('<ul>').addClass('row m-1')
        var ingredientTitle = $('<h3>').text('Ingredients')
        var ingredientsList = []

        // Ingredient For Loop
        for (var i = 0; i < data.extendedIngredients.length; i++) {
        var ingredient = data.extendedIngredients[i].measures.us.amount + " " + data.extendedIngredients[i].measures.us.unitShort + " " + data.extendedIngredients[i].nameClean

        ingredientsList.push($('<li>').text(ingredient))
        }

        // Favorite Button
        var favoriteBtn = $('<button>').addClass('col-4 col-md-2 ms-auto m-2 rounded').text("Favorite")


        // Ingredient Container
        containerDetails.append(ingredientTitle, ingredientsListEl, ingredientsList)

        // Recipe Card Image
        var recipeImage = $('<img>').addClass('img-fluid col-12 col-md-8').attr('src', recipeImageUrl)
        var imageColumn = $('<div>').addClass('text-center my-5')
        imageColumn.append(recipeImage)

        // Recipe Card Name
        var listTitle = $('<h2>').addClass('text-center').text(recipeName)

        // Recipe Instuctions
        var instructionTitle = $('<h3>').addClass('mt-4 mb-2').text('Instructions')
        var recipeInstructions = $('<div>').html(data.instructions)

        var cardContainer = $('<div>').addClass('row m-3 border border-secondary')
        cardContainer.append(favoriteBtn,imageColumn, listTitle, containerDetails, instructionTitle, recipeInstructions)

        $('#recipeCard').append(cardContainer)


        // Recipe Instruction (add modal for note if unavailable)

      })
      .catch(function(error) {
        console.error("An error occurred:", error)
    })
    }

    // Add Click Event to View Recipe
    function addViewBtnEvent(viewBtn, recipeId, recipeImageUrl, recipeName) {
      $(viewBtn).on('click', function() {
        $('#recipePreviewContainer').empty()
        // $('#futureWeatherContainer').empty()

        getRecipe(recipeId, recipeImageUrl, recipeName)
      })
    }

    // Clear Local Storage
    // $('.clearBtn').on('click', function() {
    //   localStorage.clear()
    //   location.reload()
    // })
    //   displayLocation()


})





