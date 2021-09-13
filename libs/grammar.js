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
        type: "MULTIPLICATION",
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

export function complexGrammarMatch(array, ruleset) {
    for (const i in ruleset) {
        const rule = ruleset[i]

        if (
            array[0] === rule.rule[0] &&
            array[1] === rule.rule[1] &&
            array[2] === rule.rule[2]
        ) {
            return {
                type: rule.type,
                success: true
            }
        }
    }

    return {
        success: false
    }
}