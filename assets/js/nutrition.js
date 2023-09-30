$(document).ready(function () {

  var apiKey = '8b9c8c71e3d367c93cc3fa4726db96dc'
  var apiId = '6a272aa5'
  var userInput = ''
  var urlIngredients = ''

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