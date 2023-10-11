$(document).ready(function () {

    $(".searchBtn").on("click", function (e) {
        e.preventDefault()

        var userInput = $("#userInput").val()
        var formInputValue = $("#format-Input").val()

        if (!userInput.length && !formInputValue) {
            $('#errorMessage').text('Invalid - Must enter an ingredient and select an option.')
            $('#alertModal').modal("show")
            return
        }

        if (!userInput.length) {
            $('#errorMessage').text('Invalid - Must enter an ingredient.')
            $('#alertModal').modal("show")
            return
        }

        if (!formInputValue) {
            $('#errorMessage').text('Invalid - Must select an option from the drop-down menu.')
            $('#alertModal').modal("show")
            return
        }

        var queryString = userInput.replace(/, /g, ',+')
        var redirectUrl
        var option = formInputValue

        if (option === "Nutrition") {
            redirectUrl = `./nutrition.html?q=${queryString}&option=${option}`
        } else if (option === "Recipes") {
            redirectUrl = `./recipe.html?q=${queryString}&option=${option}`
        } else {
            $('#errorMessage').text('Invalid option selected')
            $('#alertModal').modal("show")
            return
        }

        if (redirectUrl) {
            window.location.assign(redirectUrl)
        }
    })

    // Modal Button Close
    $("#closeModalBtn").on("click", function () {
        $("#alertModal").modal("hide")
    })
})
