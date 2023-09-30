$(document).ready(function () {

    $(".searchBtn").on("click", function (e) {
        e.preventDefault()

        var userInput = $("#userInput").val()
        var formInputValue = $("#format-Input").val()
        var userInputArray = userInput.split(", ")
        if (!userInputArray.length || !formInputValue) {
            alert("Please enter a search query and select an option.")
            return
        }
        var queryString = userInputArray.join("+")
        var redirectUrl
        var option = formInputValue

        if (option === "Nutrition") {
            redirectUrl = `./nutrition.html?q=${queryString}&option=${option}`
        } else if (option === "Recipes") {
            redirectUrl = `./recipe.html?q=${queryString}&option=${option}`
        } else {
            alert("Invalid option selected.")
            return
        }

        if (redirectUrl) {
            window.location.assign(redirectUrl)
        }
    })

})
