$(document).ready(function () {

    var apiKey = '8b9c8c71e3d367c93cc3fa4726db96dc'
    var apiId = '6a272aa5'
    userInput = 'turkey, carrot'
    var UrlIngredients = userInput.replace(/,/g, ',+')



    function getIngredient() {
        var requestUrlLocation = `https://api.edamam.com/api/food-database/v2/parser?app_id=${apiId}&app_key=${apiKey}&ingr=${UrlIngredients}&nutrition-type=cooking`

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
      }

      // reminder - make alerts if data not available

      getIngredient()
    // all code goes inside this function
})