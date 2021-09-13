import { complexGrammar, complexGrammarMatch } from "./grammar.js"

function createNode(type, value, children) {
    return {
        type,
        value,
        children
    }
}

export function parser(tokens) {
    let tree = createNode("EXPRESSION", null, [])

    let cursor = 1
    while (cursor < tokens.length) {
        const backwardToken = tokens[cursor - 1]
        const currentToken = tokens[cursor]
        const forwardToken = tokens[cursor + 1]

        console.log(complexGrammarMatch([backwardToken, currentToken, forwardToken], complexGrammar))
    }
}