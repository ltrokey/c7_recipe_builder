$(document).ready(function () {

    var apiKey = '8b9c8c71e3d367c93cc3fa4726db96dc'
    var apiId = '6a272aa5'
    var ingredient1 = 'apple'



    function getIngredient() {
        var requestUrlLocation = `https://api.edamam.com/api/food-database/v2/parser?app_id=${apiId}&app_key=${apiKey}&ingr=${ingredient1}&nutrition-type=cooking`

        fetch(requestUrlLocation)
          .then(function(response) {
              return response.json()
          })
          .then(function(data) {
            console.log(data)
          })
      }

      getIngredient()
    // all code goes inside this function
})