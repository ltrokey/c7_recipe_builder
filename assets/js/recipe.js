$(document).ready(function() {

    var apiKey ='be47e6c6d3c6419f9c6b84d60fa5460e'
    var userInput = ''
    var urlIngredients = ''
    var favorites = JSON.parse(localStorage.getItem('savedFavorites')) || []

  // User Search Parameters
    function getParams() {
      var searchParams = new URLSearchParams(document.location.search)
      userInput = searchParams.get("q")

      if (userInput) {
          urlIngredients = userInput.replace(/, /g, ',+')
          getIngredientRecipes(urlIngredients)
      }
    }

    getParams()

    // Recipe Page Search Bar
    $(".searchBtn").on("click", function (e) {
      e.preventDefault()

      var userInput = $("#userInput").val()
      var queryString = userInput.replace(/, /g, ',+')
      var url = `./recipe.html?q=${queryString}`

      if (!userInput.length) {
          alert("Please enter a search query.")
          return
      } else {
          window.location.assign(url)

      }
  })

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
            var viewBtn = $('<button>').addClass('col-4 col-md-2 m-2 rounded').text("View")
            addViewBtnEvent(viewBtn, data[i].id)

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
    function getRecipe(recipeId) {
      var requestUrlRecipeIngredients = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`

      fetch(requestUrlRecipeIngredients)
      .then(function(response) {
          return response.json()
      })
      .then(function(data) {

        var recipeImageUrl = data.image
        var recipeId = data.id
        var recipeName = data.title

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
        $(favoriteBtn).on('click', function() {
          saveFavoriteRecipe(recipeId, recipeName)
        })

        // Ask Eric - Trying to use Icon
        // var svgElement = $('<svg>').attr({
        //   xmlns: 'http://www.w3.org/2000/svg',
        //   height: '1em',
        //   viewBox: '0 0 576 512',
        // })

        // var pathElement = $('<path>').attr('d', 'M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z')

        // svgElement.append(pathElement)

        // var btnIcon = $('<i>').addClass('fa-solid fa-star')

        // btnIcon.append(svgElement)

        // var favoriteBtn = $('<button>').addClass('col-4 col-md-2 ms-auto m-2')

        // favoriteBtn.append(btnIcon)

        // $(favoriteBtn).on('click', function() {
        //   saveFavoriteRecipe(recipeId, recipeName)
        // })

        // Ingredient Container
        containerDetails.append(ingredientTitle, ingredientsListEl, ingredientsList)

        // Recipe Card Image
        var recipeImage = $('<img>').addClass('img-fluid col-12 col-md-6').attr('src', recipeImageUrl)
        var imageColumn = $('<div>').addClass('text-center my-5')
        imageColumn.append(recipeImage)

        // Recipe Card Name
        var listTitle = $('<h2>').addClass('text-center').text(recipeName)

        // Recipe Instuctions

        var instructionText = data.instructions || "Oops! 🙁 This information is currently unavailable. Please check again later."

        var instructionTitle = $('<h3>').addClass('mt-4 mb-2').text('Instructions')
        var recipeInstructions = $('<div>').html(instructionText)

        var cardContainer = $('<div>').addClass('row m-3 border border-secondary')
        cardContainer.append(favoriteBtn, listTitle,imageColumn, containerDetails, instructionTitle, recipeInstructions)

        $('#recipeCard').append(cardContainer)


        // Recipe Instruction (add modal for note if unavailable)

      })
      .catch(function(error) {
        console.error("An error occurred:", error)
    })
    }

    // Add Click Event to View Recipe
    function addViewBtnEvent(viewBtn, recipeId) {
      $(viewBtn).on('click', function() {
        $('#recipePreviewContainer').empty()

        getRecipe(recipeId)
      })
    }

    // Saved function for Favorite Recipes

    function saveFavoriteRecipe(recipeId, recipeName) {

      var existingFavorite = favorites.find(function (favorite) {
        return (favorite.recipeId === recipeId)
      })

      if (!existingFavorite) {
          favorites.push({
            recipeId: recipeId,
            recipeName: recipeName
          })

        localStorage.setItem('savedFavorites', JSON.stringify(favorites))
      }
      displayFavoriteRecipes()
    }

    // Click Event to Saved Favorites Buttons
    function addFavoriteBtnEvent(favoriteBtn, recipeId) {
      favoriteBtn.on('click', function() {
        $('#recipePreviewContainer').empty()
        $('#recipeCard').empty()

        getRecipe(recipeId)
      });
    }

    function displayFavoriteRecipes() {

      $('#savedFavorites').empty()

      for (var i = 0; i < favorites.length; i++) {
        var favoriteBtn = $('<button>').addClass('col-12 m-2 rounded').text(favorites[i].recipeName)

        favoriteBtn.attr('data-recipe-id', favorites[i].recipeId)

        addFavoriteBtnEvent (favoriteBtn, favorites[i].recipeId)

        $('#savedFavorites').append(favoriteBtn);
      }
    }

    displayFavoriteRecipes()

    // Clear Local Storage
    $('.clearBtn').on('click', function() {
      localStorage.clear()
      location.reload()
      // add modal to confirm clear history
    })

})
