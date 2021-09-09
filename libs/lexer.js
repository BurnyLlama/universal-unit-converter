import { token } from "./token.js"
import { simpleGrammar, grammarMatch } from "./grammar.js"

/* 
    Reference: https://github.com/peter-leonov/picojs/blob/main/lexer.js 
*/

export function lexer(string) {
    string = string.replace(/\s/g, "")

    let tokens = []
    let cursor = 0
    while (cursor < string.length) {
        const char = string[cursor]

        const cursorMatch = grammarMatch(char, simpleGrammar)
        let forwardCursor = cursor + 1
        let forwardMatch = cursorMatch

        // Read ahead until the 'forwardString' is no longer valid to the current token type.
        while (cursorMatch.type === forwardMatch.type) {
            const forwardString = string.substring(cursor, forwardCursor)
            forwardMatch = grammarMatch(forwardString, simpleGrammar)

            if (!forwardMatch.success || forwardCursor > string.length) {
                const latestValidToken = string.substring(cursor, forwardCursor - 1)
                const latestValidMatch = grammarMatch(latestValidToken, simpleGrammar)
                tokens.push(
                    token.createSimple(
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