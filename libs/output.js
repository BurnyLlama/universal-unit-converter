const infoText = document.querySelector("#info-text")


export function output(text, type) {
    switch (type) {
        case "result":
            infoText.innerHTML = `Result: ${text ? text : "(No statement)"}`
            break

        case "error":
            infoText.innerHTML = `Error: ${text ? text : "(Unknown error)"}`
            break

        default:
            break
    }
}