$(document).ready(function () {

  var apiKey = '8b9c8c71e3d367c93cc3fa4726db96dc'
  var apiId = '6a272aa5'
  var userInput = ''
  var urlIngredients = ''
  var favorites = JSON.parse(localStorage.getItem('savedFavorites')) || []

  //user Search Parameters
  function getParams() {
    var searchParams = new URLSearchParams(document.location.search)
    userInput = searchParams.get("q")
    console.log(userInput)

    if (userInput) {
        urlIngredients = userInput.replace(/, /g, ',+')
        getNutritionCards(urlIngredients)
    }
  }

  getParams()

      // Recipe Page Search Bar
      $(".searchBtn").on("click", function (e) {
        e.preventDefault()

        var userInput = $("#userInput").val()
        var queryString = userInput.replace(/, /g, ',+')
        var url = `./nutrition.html?q=${queryString}`

        if (!userInput.length) {
            alert("Please enter a search query.")
            return
        } else {
            window.location.assign(url)

        }
    })

  function getNutritionCards(urlIngredients) {
    var requestUrlLocation = `https://api.edamam.com/api/food-database/v2/parser?app_id=${apiId}&app_key=${apiKey}&ingr=${urlIngredients}&nutrition-type=cooking`

    fetch(requestUrlLocation)
      .then(function(response) {
          return response.json()
      })
      .then(function(data) {
        for (var i = 0; i < 10; i++) {

        // Details Column 

        var detailsCol = $('<div>').addClass('text-center top: 80px; col-md-9')
        detailsCol.append(listCarb, listEnergy, listFat, listFiber, listProtein)

        var container = $('<div>').addClass('row m-3 border border-radius: 5px')
        container.append(listTitle, imageCol, detailsCol,)

        $('#nurtitionCard').append(container)


        //Nutrition Card image
        var nutritionImageUrl = data.hints[i].food.image
        var nutritionImage = $("<img>").addClass("img-fluid col-3 col-md-3").attr("src", nutritionImageUrl) 
        var imageCol = $("<div>").addClass('text-left border border-light')
        imageCol.append(nutritionImage,detailsCol)

        //Nutrition Card Title
        var listTitle = $("<h2>").addClass('text-center').text(data.hints[i].food.label)

        //Nutrition Card Facts 
        var listCarb = $('<p>').text("Carbohydrate: " + Math.round(data.hints[i].food.nutrients.CHOCDF) + " g")
        var listEnergy = $('<p>').text("Energy: " + Math.round(data.hints[i].food.nutrients.ENERC_KCAL) + " kcal")
        var listFat = $('<p>').text("Fat: " + Math.round(data.hints[i].food.nutrients.FAT) + " g")
        var listFiber = $('<p>').text("Fiber: " + Math.round(data.hints[i].food.nutrients.FIBTG) + " g")
        var listProtein = $('<p>').text("Protein: " + Math.round(data.hints[i].food.nutrients.PROCNT) + " g")
    



          console.log(data.hints[i])
          // Image
          console.log(data.hints[i].food.image)
          // Name
          console.log(data.hints[i].food.label)
          //Carbohydrate Unit Gram
          console.log(data.hints[i].food.nutrients.CHOCDF)
          //Energy Unit Kcal
          console.log(data.hints[i].food.nutrients.ENERC_KCAL)
          // Protein Unit Gram
          console.log(data.hints[i].food.nutrients.PROCNT)
          // Fat Unit Gram
          console.log(data.hints[i].food.nutrients.FAT)
          // Fiber Unit Gram
          console.log(data.hints[i].food.nutrients.FIBTG)
        }
      })
      .catch(function (error) {
        console.error("An error occurred:", error)
    })
  }
})

