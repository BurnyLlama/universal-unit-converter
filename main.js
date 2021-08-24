const textbox = document.querySelector("#textbox")
const infoText = document.querySelector("#info-text")

textbox.addEventListener("input",
    event => {
        // Remove all whitespace from the input
        const input = textbox.value.replace(/\s+/g, "")

        // Parse the input
        const result = input

            // Multiplication
            .replace(
                /([0-9]+)\*([0-9]+)/g,
                (_, factorA, factorB) => parseInt(factorA) * parseInt(factorB)
            )

            // Division
            .replace(
                /([0-9]+)\/([0-9]+)/g,
                (_, factorA, factorB) => parseInt(factorA) / parseInt(factorB)
            )

            // Addition
            .replace(
                /([0-9]+)\+([0-9]+)/g,
                (_, termA, termB) => parseInt(termA) + parseInt(termB)
            )

            // Subtraction
            .replace(
                /([0-9]+)\-([0-9]+)/g,
                (_, termA, termB) => parseInt(termA) - parseInt(termB)
            )

        infoText.innerHTML = `Result: ${input ? result : '(No statement)'}`
        console.log({ input, result })
    }
)