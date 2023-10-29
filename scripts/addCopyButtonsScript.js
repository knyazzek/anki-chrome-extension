// Insert a copy button with "textToCopy" at the beginning of the "parentElement"
function addCopyButton(textToCopy, element) {
    const copyButton = document.createElement("button");
    copyButton.classList.add("copyButton");
    copyButton.innerHTML = "&#10064;";

    copyButton.addEventListener("click", function() {
        // Copy text to clipboard
        navigator.clipboard.writeText(textToCopy).then(function() {
            console.log("Text successfully copied: " + textToCopy);
            copyButton.style.color = "#C0C0C0";
        }).catch(function(err) {
            console.log("Unable to copy text", err);
        });
    });

    element.insertAdjacentElement("afterbegin", copyButton)
}


// Add copy mp3 to clipboard
function addCopyMp3ToClipboardButton(audioElement) {
    const mp3Source = audioElement.getElementsByTagName("source")[0];
    const mp3Url =  "https://dictionary.cambridge.org/" + mp3Source.getAttribute("src");

    addCopyButton(mp3Url, audioElement.parentElement)
}

const audioElements = document.getElementsByTagName("audio");
Array.from(audioElements).forEach(addCopyMp3ToClipboardButton);


// Add copy word's definition to clipboard
function addCopyDefinitionToClipboardButton(definitionElement) {
    let word = ''
    let wordDefinitionText = '';
    let wordType = '';

    // Copy word
    const wordRootElement = definitionElement.closest(".entry-body__el") || definitionElement.closest(".pr.idiom-block");
    word = getElementsTextWithoutTags(wordRootElement.querySelector(".di-title"));

    // Copy word's definition
    wordDefinitionText = getElementsTextWithoutTags(definitionElement).trim();

    // Copy word's type
    const wordTypeElement = wordRootElement.querySelector(".pos.dpos");

    if (wordTypeElement) {
        wordType = wordTypeElement.childNodes[0].textContent

        // Some word's definitions are without colon at the end. 
        // To unify the approach we add check and if it's not exist then add it.
        console.log()

        if (wordDefinitionText.slice(-1) != ":") {
            wordDefinitionText += ":"
        }
    }

    let clipboardText = wordDefinitionText + " " + wordType
    if (!wordDefinitionText.includes(word)) {
        clipboardText = word + " - " + clipboardText
    }

    addCopyButton(clipboardText, definitionElement)
}

const definitionElements = document.getElementsByClassName("def");
Array.from(definitionElements).forEach(addCopyDefinitionToClipboardButton);


// Add copy word's example to clipboard
function addCopyExampleToClipboardButton(exampleElement) {
    exampleTextElement = exampleElement.getElementsByClassName("eg")[0]
    exampleText = getElementsTextWithoutTags(exampleTextElement)

    addCopyButton(exampleText, exampleElement)
}

const exampleElements = document.getElementsByClassName("examp");
Array.from(exampleElements).forEach(addCopyExampleToClipboardButton);