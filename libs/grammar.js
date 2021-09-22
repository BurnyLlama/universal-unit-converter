export const simpleGrammar = [
    {
        type: "WORD",
        regex: /^[a-zA-Z]+$/
    },
    {
        type: "NUMBER",
        regex: /^[0-9\.]+$/
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
        type: "DIVIDE",
        regex: /^\/$/
    },
    {
        type: "RAISED-BY",
        regex: /^\^$/
    },
    {
        type: "START-BLOCK",
        regex: /^\($/
    },
    {
        type: "END-BLOCK",
        regex: /^\)$/
    },
    {
        type: "SEPARATOR",
        regex: /^,$/
    }
]

export const complexGrammar = [
    {
        type: "ADDITION",
        rule: ["NUMBER", "PLUS", "NUMBER"]
    },
    {
        type: "SUBTRACTION",
        rule: ["NUMBER", "MINUS", "NUMBER"]
    },
    {
        type: "MULTIPLICATION",
        rule: ["NUMBER", "TIMES", "NUMBER"]
    },
    {
        type: "DIVISION",
        rule: ["NUMBER", "DIVIDE", "NUMBER"]
    },
    {
        type: "POWER",
        rule: ["NUMBER", "RAISED-BY", "NUMBER"]
    },
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
