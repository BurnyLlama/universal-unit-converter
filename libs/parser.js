import { complexGrammar } from "./grammar.js"


export function parser(tokens) {
    for (const i in complexGrammar) {
        const rule = complexGrammar[i]

        let cursor = 0
        while (cursor < tokens.length) {
            const prevToken = tokens[cursor - 1]
            const currentToken = tokens[cursor]
            const nextToken = tokens[cursor + 1]

            if (
                prevToken?.type === rule.rule[0] &&
                currentToken.type === rule.rule[1] &&
                nextToken.type === rule.rule[2]
            ) {
                console.log("Yes!")

                const prevTokens = parser(tokens.slice(0, cursor))
                const nextTokens = parser(tokens.slice(cursor + 1))
                console.log({prevTokens, nextTokens})

                return {
                    type: rule.type,
                    value: currentToken.value,
                    children: [
                        prevTokens,
                        nextTokens
                    ]
                }
            }


            ++cursor
        }
    }

    return tokens.length === 1 ? tokens[0] : tokens
}