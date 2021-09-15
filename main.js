import { lexer } from "./libs/lexer.js"
import { parser } from "./libs/parser.js"
import { traverser } from "./libs/traverser.js"

const textbox = document.querySelector("#textbox")
const infoText = document.querySelector("#info-text")

textbox.addEventListener("input",
    event => {
        const tokens = lexer(textbox.value)

        const tree = parser(tokens)

        const traversed = traverser(tree)

        console.log({ tokens, tree, traversed })

        infoText.innerHTML = `Result: ${traversed.toString()}`
    }
)