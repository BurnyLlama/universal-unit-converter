import { token } from "./token.js"
import { simpleGrammar, grammarMatch } from "./grammar.js"

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
            return `Error at "${char}": Unrecognized/invalid character!`
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

function advancedPass(simpleTokens) {
    for (const i in simpleTokens) {
        const token = simpleTokens[i]

        switch (token.type) {
            case "NUMBER":
                token.value = Number(token.value)
                break

            default:
                break
        }

        // simpleTokens[i] = token
    }

    return simpleTokens
}

export function lexer(string) {
    string = string.replace(/\s/g, "")

    const simpleTokens = simplePass(string)
    const tokens = advancedPass(simpleTokens)

    return tokens
}