import { lexer } from "./libs/lexer.js"
import { output } from "./libs/output.js"
import { parser } from "./libs/parser.js"
import { traverser } from "./libs/traverser.js"

const textbox = document.querySelector("#textbox")

textbox.addEventListener("input",
    event => {
        const tokens = lexer(textbox.value)

        const tree = parser(tokens)

        const traversed = traverser(tree)

        console.log({ tokens, tree, traversed })
        output(traversed, "result")
    }
)