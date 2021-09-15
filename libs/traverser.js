export function traverser(tree) {
    switch (tree.type) {
        case "ADDITION":
            return traverser(tree.children[0]) + traverser(tree.children[1])
            break

        case "SUBTRACTION":
            return traverser(tree.children[0]) - traverser(tree.children[1])
            break

        case "MULTIPLICATION":
            return traverser(tree.children[0]) * traverser(tree.children[1])
            break

        case "DIVISION":
            return traverser(tree.children[0]) / traverser(tree.children[1])
            break

        case "POWER":
            return traverser(tree.children[0]) ** traverser(tree.children[1])
            break

        default:
            return tree.value
            break
    }
}