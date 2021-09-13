import { prefixes } from "./libs/prefixes.js"
import { lexer } from "./libs/lexer.js"
import { parser } from "./libs/parser.js"

const textbox = document.querySelector("#textbox")
const infoText = document.querySelector("#info-text")

textbox.addEventListener("input",
    event => {
        const lexed = lexer(textbox.value)
        console.log(lexed)

        const parsed = parser(lexed)
        console.log(parsed)

        infoText.innerHTML = lexed.toString()
    }
)