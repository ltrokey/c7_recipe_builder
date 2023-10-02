$(document).ready(function () {

  var apiKey = '8b9c8c71e3d367c93cc3fa4726db96dc'
  var apiId = '6a272aa5'
  var userInput = ''
  var urlIngredients = ''
  var facts = JSON.parse(localStorage.getItem('savedFacts')) || []

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

    // Nutriction Facts Page Search Bar
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
        savedFacts(userInput)
    }
  })

    // Saved function for Facts
  function savedFacts(userInput) {
    var existingFact = facts.find(function (fact) {
      return (fact.userInput === userInput)
    })

    if (!existingFact) {
        facts.push({
          userInput: userInput
        })

      localStorage.setItem('savedFacts', JSON.stringify(facts))
    }
    displaySavedFacts()
  }

  // Click Event to Saved Facts Buttons
  function addFactBtnEvent(factBtn, userInput) {
    factBtn.on('click', function() {
      $('#nurtitionCard').empty()

      getNutritionCards(userInput)
    });
  }

  function displaySavedFacts() {
    $('#savedFacts').empty()

    for (var i = 0; i < facts.length; i++) {
      var factBtn = $('<button>').addClass('col-12 m-2 rounded').text(facts[i].userInput)

      factBtn.attr('data-userInput', facts[i].userInput)

      addFactBtnEvent (factBtn, facts[i].userInput)

      $('#savedFacts').append(factBtn);
    }
  }

  displaySavedFacts()

  // Clear Local Storage
  $('.clearBtn').on('click', function() {
    localStorage.clear()
    location.reload()
    // add modal to confirm clear history
  })

  function getNutritionCards(urlIngredients) {
    var requestUrlLocation = `https://api.edamam.com/api/food-database/v2/parser?app_id=${apiId}&app_key=${apiKey}&ingr=${urlIngredients}&nutrition-type=cooking`

    fetch(requestUrlLocation)
      .then(function(response) {
          return response.json()
      })
      .then(function(data) {
        for (var i = 0; i < 10; i++) {

        //Nutrition Card Title
        var listTitle = $("<h2>").addClass('text-center py-3').text(data.hints[i].food.label)

        //Nutrition Card image
        var nutritionImageUrl = data.hints[i].food.image
        var nutritionImage = $("<img>").addClass("img-fluid rounded").attr("src", nutritionImageUrl)
        var imageCol = $("<div>").addClass('col-md-6 text-center py-3')
        imageCol.append(nutritionImage)

        //Nutrition Card Facts
        var listCarb = $('<p>').text("Carbohydrate: " + Math.round(data.hints[i].food.nutrients.CHOCDF) + " g")
        var listEnergy = $('<p>').text("Energy: " + Math.round(data.hints[i].food.nutrients.ENERC_KCAL) + " kcal")
        var listFat = $('<p>').text("Fat: " + Math.round(data.hints[i].food.nutrients.FAT) + " g")
        var listFiber = $('<p>').text("Fiber: " + Math.round(data.hints[i].food.nutrients.FIBTG) + " g")
        var listProtein = $('<p>').text("Protein: " + Math.round(data.hints[i].food.nutrients.PROCNT) + " g")

        // Details Column
        var detailsCol = $('<div>').addClass('col-md-6 text-left py-5')
        detailsCol.append(listCarb, listEnergy, listFat, listFiber, listProtein)

        var container = $('<div>').addClass('row m-3 border rounded')
        container.append(listTitle, imageCol, detailsCol)

        $('#nurtitionCard').append(container)

        }
      })
      .catch(function (error) {
        console.error("An error occurred:", error)
    })
  }
})

