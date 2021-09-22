import { token } from "./token.js"
import { simpleGrammar, grammarMatch } from "./grammar.js"
import { output } from "./output.js"

/* 
    Reference: https://github.com/peter-leonov/picojs/blob/main/lexer.js 
*/
function simplePass(string) {
    let tokens = []
    let cursor = 0
    while (cursor < string.length) {
        const char = string[cursor]

        const cursorMatch = grammarMatch(char, simpleGrammar)
        let forwardCursor = cursor + 1
        let forwardMatch = cursorMatch

        if (!cursorMatch.success) {
            return output(`Error at "${char}": Unrecognized/invalid character!`, "error")
        }

        // Read ahead until the 'forwardString' is no longer valid to the current token type.
        while (cursorMatch.type === forwardMatch.type) {
            const forwardString = string.substring(cursor, forwardCursor)
            forwardMatch = grammarMatch(forwardString, simpleGrammar)

            if (!forwardMatch.success || forwardCursor > string.length) {
                const latestValidToken = string.substring(cursor, forwardCursor - 1)
                const latestValidMatch = grammarMatch(latestValidToken, simpleGrammar)
                tokens.push(
                    token.create(
                        latestValidMatch.type,
                        latestValidToken
                    )
                )
                cursor = forwardCursor - 1
                break
            } else {
                ++forwardCursor
            }
        }
    }

    return tokens
}

function handleBlock(tokens, cursorStart) {
    let cursor = cursorStart + 1
    let children = []

    while (tokens[cursor].type !== "END-BLOCK" && cursor < tokens.length) {
        const token = tokens[cursor]

        if (token.type === "START-BLOCK") {
            const block = handleBlock(tokens, cursor)
            children.push(block.children)
            cursor = block.current
        }

        ++cursor
    }

    children.push(tokens.slice(cursorStart + 1, cursor))

    return { cursor, children }
}

function advancedPass(simpleTokens) {
    let newTokens = []
    let cursor = 0

    while (cursor < simpleTokens.length) {
        const currentToken = simpleTokens[cursor]

        switch (currentToken.type) {
            case "NUMBER":
                currentToken.value = Number(currentToken.value)
                newTokens.push(currentToken)
                break

            default:
                newTokens.push(currentToken)
                break
        }

        ++cursor
    }

    return newTokens
}

function blockPass(advancedTokens) {
    let newTokens = []
    let cursor = 0

    while (cursor < advancedTokens.length) {
        const currentToken = advancedTokens[cursor]

        if (currentToken.type !=="START-BLOCK") {
            const block = handleBlock(advancedTokens, cursor)
            const [...value] = block.children
            newTokens.push(
                token.create("BLOCK", value)
            )
            cursor = block.cursor
        } else {
            newTokens.push(currentToken)
        }

        ++cursor
    }

    return newTokens
}

export function lexer(string) {
    string = string.replace(/\s/g, "")

    const simpleTokens = simplePass(string)
    const advancedTokens = advancedPass(simpleTokens)
    const tokens = blockPass(advancedTokens)

    return tokens
}