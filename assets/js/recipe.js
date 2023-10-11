$(document).ready(function () {
  var apiKey = "c4f88b4f93e474ca7a15d148f0cc24000";
  var userInput = "";
  var urlIngredients = "";
  var favorites = JSON.parse(localStorage.getItem("savedFavorites")) || [];

  // User Search Parameters
  function getParams() {
    var searchParams = new URLSearchParams(document.location.search);
    userInput = searchParams.get("q");

    if (userInput) {
      urlIngredients = userInput.replace(/, /g, ",+");
      getIngredientRecipes(urlIngredients);
    }
  }

  getParams();

  // Recipe Page Search Bar
  $(".searchBtn").on("click", function (e) {
    e.preventDefault();
    var userInput = $("#userInput").val();
    var queryString = userInput.replace(/, /g, ",+");
    var url = `./recipe.html?q=${queryString}`;
    if (!userInput.length) {
      $("#errorMessage").text(
        "Please enter a search query. (Example: apple or pork, apple)"
      );
      $("#alertModal").modal("show");
    } else {
      window.location.assign(url);
    }
  });

  // Modal Button Close
  $("#closeModalBtn").on("click", function () {
    $("#alertModal").modal("hide");
  });

  // Recipe Preview Cards
  function getIngredientRecipes() {
    var requestUrlIngredient = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${urlIngredients}&apiKey=${apiKey}`;

    fetch(requestUrlIngredient)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.length === 0) {
          $("#errorMessage").text("Invalid entry, please check your spelling.");
          $("#alertModal").modal("show");
        } else {
          for (var i = 0; i < data.length; i++) {
            var recipeImageUrl = data[i].image;

            // Image Column
            var recipeImage = $("<img>")
              .addClass("col-12 img-fluid p-4")
              .attr("src", recipeImageUrl);
            var imageColumn = $("<div>").addClass("col-md-6 text-center");
            imageColumn.append(recipeImage);

            // Details Column
            var detailsColumn = $("<div>").addClass("col-md-6 p-3");
            var recipeName = $("<h2>")
              .addClass("text-center")
              .text(data[i].title);
            var recipeId = $("<p>")
              .addClass("text-end")
              .text("Recipe Id: " + data[i].id);
            var recipeLikes = $("<p>")
              .addClass("text-end")
              .text("Likes: " + data[i].likes);

            detailsColumn.append(recipeId, recipeLikes, recipeName);

            // View Button & Event Row
            var btnRow = $("<div>").addClass("row justify-content-center");
            var viewBtn = $("<button>")
              .addClass("bg-warning col-4 col-md-2 m-2 rounded hover")
              .text("View");
            addViewBtnEvent(viewBtn, data[i].id);
            // $("viewBtn").css({"background-color": "#352903", "color": "antiquewhite", "font-family": "'philosopher', sans-serif"});

            btnRow.append(viewBtn);

            //Container per Recipe Preview (combines colums)
            var container = $("<div>").addClass(
              "rounded border-warning row m-3 border border-secondary"
            );
            container.append(imageColumn, detailsColumn, btnRow);

            $("#recipePreviewContainer")
              .append(container)
              .addClass("text-secondary");
          }
        }
      })
      .catch(function (error) {
        console.error("An error occurred:", error);
      });
  }

  // Recipe Card
  function getRecipe(recipeId) {
    var requestUrlRecipeIngredients = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    fetch(requestUrlRecipeIngredients)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var recipeImageUrl = data.image;
        var recipeId = data.id;
        var recipeName = data.title;

        // Ingredient Details
        var containerDetails = $("<div>").addClass("col-md-6 mt-3");
        var ingredientsListEl = $("<ul>").addClass("row m-1");
        var ingredientTitle = $("<h3>").text("Ingredients");
        var ingredientsList = [];

        // Ingredient For Loop
        for (var i = 0; i < data.extendedIngredients.length; i++) {
          var ingredient =
            data.extendedIngredients[i].measures.us.amount +
            " " +
            data.extendedIngredients[i].measures.us.unitShort +
            " " +
            data.extendedIngredients[i].nameClean;

          ingredientsList.push($("<li>").text(ingredient));
        }

        // Favorite Button
        var favoriteBtn = $("<button>")
          .addClass("col-4 col-md-2 ms-auto m-2 rounded")
          .text("❤️");
        $(favoriteBtn).on("click", function () {
          saveFavoriteRecipe(recipeId, recipeName);
        });

        $(favoriteBtn).on("click", function () {
          saveFavoriteRecipe(recipeId, recipeName);
        });

        // Ingredient Container
        containerDetails.append(
          ingredientTitle,
          ingredientsListEl,
          ingredientsList
        );

        // Recipe Card Image
        var recipeImage = $("<img>")
          .addClass("img-fluid col-12 col-md-6")
          .attr("src", recipeImageUrl);
        var imageColumn = $("<div>").addClass("text-center my-5");
        imageColumn.append(recipeImage);

        // Recipe Card Name
        var listTitle = $("<h2>").addClass("text-center").text(recipeName);

        // Recipe Instuctions

        var instructionText =
          data.instructions ||
          "Oops! 🙁 This information is currently unavailable. Please check again later.";

        var instructionTitle = $("<h3>")
          .addClass("mt-4 mb-2")
          .text("Instructions");
        var recipeInstructions = $("<div>").html(instructionText);

        var cardContainer = $("<div>").addClass(
          "row m-3 border border-secondary"
        );
        cardContainer.append(
          favoriteBtn,
          listTitle,
          imageColumn,
          containerDetails,
          instructionTitle,
          recipeInstructions
        );

        $("#recipeCard").append(cardContainer);

        // Recipe Instruction (add modal for note if unavailable)
      })
      .catch(function (error) {
        console.error("An error occurred:", error);
      });
  }

  // Add Click Event to View Recipe
  function addViewBtnEvent(viewBtn, recipeId) {
    $(viewBtn).on("click", function () {
      $("#recipePreviewContainer").empty();

      getRecipe(recipeId);
    });
  }

  // Saved function for Favorite Recipes

  function saveFavoriteRecipe(recipeId, recipeName) {
    var existingFavorite = favorites.find(function (favorite) {
      return favorite.recipeId === recipeId;
    });

    if (!existingFavorite) {
      favorites.push({
        recipeId: recipeId,
        recipeName: recipeName,
      });

      localStorage.setItem("savedFavorites", JSON.stringify(favorites));
    }
    displayFavoriteRecipes();
  }

  // Click Event to Saved Favorites Buttons
  function addFavoriteBtnEvent(favoriteBtn, recipeId) {
    favoriteBtn.on("click", function () {
      $("#recipePreviewContainer").empty();
      $("#recipeCard").empty();

      getRecipe(recipeId);
    });
  }

  function displayFavoriteRecipes() {
    $("#savedFavorites").empty();

    for (var i = 0; i < favorites.length; i++) {
      var favoriteBtn = $("<button>")
        .addClass("col-12 m-2 rounded")
        .text(favorites[i].recipeName);

      favoriteBtn.attr("data-recipe-id", favorites[i].recipeId);

      addFavoriteBtnEvent(favoriteBtn, favorites[i].recipeId);

      $("#savedFavorites").append(favoriteBtn);
    }
  }

  displayFavoriteRecipes();

  // Clear Local Storage
  $(".clearBtn").on("click", function () {
    localStorage.clear();
    location.reload();
    // add modal to confirm clear history
  });
});
