import { prefixes } from "./libs/prefixes.js"
import { lexer } from "./libs/lexer.js"
import { parser } from "./libs/parser.js"

const textbox = document.querySelector("#textbox")
const infoText = document.querySelector("#info-text")

textbox.addEventListener("input",
    event => {
        const tokens = lexer(textbox.value)

        const tree = parser(tokens)

        console.log({ tokens, tree })

        infoText.innerHTML = tokens.toString()
    }
)