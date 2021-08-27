import { prefixes } from "./libs/prefixes.js"

const textbox = document.querySelector("#textbox")
const infoText = document.querySelector("#info-text")

function parse(input) {
    let result = input
        // Exponents
        .replace(
            /([^0-9.]-)?([0-9.]+)\^(-?[0-9.]+)/g,
            (_, isNegative, base, exponent) => 
                `${isNegative ? isNegative.substring(0,1) : ''}${parseFloat(isNegative ? `-${base}` : base) ** parseFloat(exponent)}`
        )

        // Multiplication
        .replace(
            /([^0-9.]-)?([0-9.]+)\*(-?[0-9.]+)/g,
            (_, isNegative, factorA, factorB) => 
                `${isNegative ? isNegative.substring(0,1) : ''}${parseFloat(isNegative ? `-${factorA}` : factorA) * parseFloat(factorB)}`
        )

        // Division
        .replace(
            /([^0-9.]-)?([0-9.]+)\/(-?[0-9.]+)/g,
            (_, isNegative, factorA, factorB) => 
                `${isNegative ? isNegative.substring(0,1) : ''}${parseFloat(isNegative ? `-${factorA}` : factorA) / parseFloat(factorB)}`
            )

        // Addition
        .replace(
            /([^0-9.]-)?([0-9.]+)\+(-?[0-9.]+)/g,
            (_, isNegative, termA, termB) => 
                `${isNegative ? isNegative.substring(0,1) : ''}${parseFloat(isNegative ? `-${termA}` : termA) + parseFloat(termB)}`
            )

        // Subtraction
        .replace(
            /([^0-9.]-)?([0-9.]+)\-(-?[0-9.]+)/g,
            (_, isNegative, termA, termB) => 
                `${isNegative ? isNegative.substring(0,1) : ''}${parseFloat(isNegative ? `-${termA}` : termA) - parseFloat(termB)}`
        )

    console.log({result})

    if (result.match(/[\+\-\*\/]/))
        result = parse(result)
    return result
}

textbox.addEventListener("input",
    event => {
        // Remove all whitespace from the input and replace commas with periods. Also remove any trailing operators.
        let input = textbox.value.replace(/\s+/g, "").replace(",", ".").replace(/[\+\-\*\/]*$/, "")

        // Replace prefixes with their corresponfing factor
        input = input.replace(/[a-zA-Z]/g, match => prefixes[match] ? `${prefixes[match]}` : '')

        // Parse the input
        const result = parse(input)

        infoText.innerHTML = `Result: ${input ? result : '(No statement)'}`
        console.log({ input, result })
    }
)