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
        type: "PLUS",
        regex: /^\+$/
    },
    {
        type: "MINUS",
        regex: /^\-$/
    },
    {
        type: "TIMES",
        regex: /^\*$/
    },
    {
        type: "DIVISION",
        regex: /^\/$/
    },
    {
        type: "DECIMAL",
        regex: /^[\.,]$/
    }
]

export const complexGrammar = [
    {
        type: "ADDITION",
        rule: ["NUMBER", "PLUS", "NUMBER"]
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
