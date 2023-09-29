$(document).ready(function () {

    var apiKey = 'bf4058784ea84f3f89a280160f3d1ff3'
    var ingredient1 = 'apple'



    function getIngredient() {
        var requestUrlLocation = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient1}&apiKey=${apiKey}`

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




d51f94a45dc58fbdd3b8cb1089f227c9