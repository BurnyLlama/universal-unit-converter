export const simpleGrammar = [
    {
        type: "WORD",
        regex: /^[a-zA-Z]+$/
    },
    {
        type: "NUMBER",
        regex: /^[0-9]+$/
    },
    {
        type: "OPERATOR",
        regex: /^[\^*/+-]$/
    },
    {
        type: "DECIMAL",
        regex: /^[\.,]$/
    }
]

export function grammarMatch(string, ruleset) {
    for (const i in ruleset) {
        const rule = ruleset[i]
        if (string.match(rule.regex)) {
            return {
                success: true,
                type: rule.type
            }
        }
    }

    return {
        success: false
    }
}