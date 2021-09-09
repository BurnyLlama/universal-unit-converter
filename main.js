import { prefixes } from "./libs/prefixes.js"
import { lexer } from "./libs/lexer.js"

const textbox = document.querySelector("#textbox")
const infoText = document.querySelector("#info-text")

textbox.addEventListener("input",
    event => {
        const result = lexer(textbox.value)
        console.log(result)

        infoText.innerHTML = result.toString()
    }
)