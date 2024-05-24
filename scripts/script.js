const form = document.querySelector("form")

// Inputs
const day = form.querySelector("input#day")
const month = form.querySelector("input#month")
const year = form.querySelector("input#year")

// User age spans
const userYears = document.querySelector(".user-years")
const userMonths = document.querySelector(".user-months")
const userDays = document.querySelector(".user-days")

const inputConteiners = document.querySelectorAll(".input-container")

const errorText = document.querySelector("small")

let currentDate = new Date()

form.addEventListener("submit", (e) => {
    e.preventDefault()

    checkInputs(day, month, year)
})

inputConteiners.forEach((inputConteiner) => {
    inputConteiner.addEventListener("keydown", () => {
        inputConteiner.classList.remove("error")
    })
})

function checkInputs(day, month, year) {
    this.day = +day.value
    this.month = +month.value
    this.year = +year.value

    let maxDaysInMonth = 31
    let hasError = false

    switch (this.month) {
        case 2:
            if (
                (this.year % 4 == 0 && this.year % 100 != 0) ||
                this.year % 400 == 0
            ) {
                maxDaysInMonth = 29
            } else {
                maxDaysInMonth = 28
            }
            break
        case 4:
        case 6:
        case 9:
        case 11:
            maxDaysInMonth = 30
            break
        default:
            maxDaysInMonth = 30
    }

    if (!this.day) {
        setErrorFor(day, "This field is required")
        hasError = true
    } else if (this.day < 1 || this.day > maxDaysInMonth) {
        setErrorFor(day, "Must be a valid day")
        hasError = true
    }

    if (!this.month) {
        setErrorFor(month, "This field is required")
        hasError = true
    } else if (this.month < 1 || this.month > 12) {
        setErrorFor(month, "Must be a valid month")
        hasError = true
    }

    if (!this.year) {
        setErrorFor(year, "This field is required")
        hasError = true
    } else if (this.year < 1900) {
        setErrorFor(
            year,
            "Year must be between 1900 and " + currentDate.getFullYear()
        )
        hasError = true
    } else if (this.year > currentDate.getFullYear()) {
        setErrorFor(year, "Must be in the past")
        hasError = true
    }

    function refuseNumbersOnInput(input, maxDigits) {
        input.addEventListener("input", function (event) {
            let inputValue = event.target.value

            inputValue = inputValue.replace(/[^0-9]/g, "")

            if (inputValue.length > maxDigits) {
                inputValue = inputValue.slice(0, maxDigits)
            }

            event.target.value = inputValue
        })
    }

    refuseNumbersOnInput(day, 2)
    refuseNumbersOnInput(month, 2)
    refuseNumbersOnInput(year, 4)

    if (!hasError) {
        updateUserAge(this.day, this.month, this.year)
    }
}

function setErrorFor(input, error) {
    const formControl = input.parentNode
    const small = formControl.querySelector("small")

    small.innerText = error

    formControl.className = "input-container error"
}

function updateUserAge(day, month, year) {
    const birthDate = new Date(year, month - 1, day)

    let days = currentDate.getDate() - birthDate.getDate()
    let months = currentDate.getMonth() - birthDate.getMonth()
    let years = currentDate.getFullYear() - birthDate.getFullYear()

    if (days < 0) {
        months--
        days += new Date(year, month, 0).getDate()
    }

    if (months < 0) {
        years--
        months += 12
    }

    userDays.textContent = days
    userMonths.textContent = months
    userYears.textContent = years
}
