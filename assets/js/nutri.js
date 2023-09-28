$(document).ready(function () {

    var apiKey = 'd51f94a45dc58fbdd3b8cb1089f227c9'
    var apiId = 'f491afde'
    var ingredient1 = 'apple'



    function getIngredient() {
        var requestUrlLocation = ` https://api.edamam.com/api/nutrition-details?foodId=${ingredient1}&apiKey=${apiKey}&apiId=${apiId}`

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