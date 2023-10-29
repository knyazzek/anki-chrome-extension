// Insert a copy button with "textToCopy" at the beginning of the "parentElement"
function addCopyButton(textToCopy, element) {
    const copyButton = document.createElement("button");
    copyButton.classList.add("copyButton");
    copyButton.innerHTML = defaultSettings.copyButtonSign;

    copyButton.addEventListener("click", function() {
        // Copy text to clipboard
        navigator.clipboard.writeText(textToCopy).then(function() {
            console.log("Text successfully copied: " + textToCopy);
            copyButton.style.color = defaultSettings.copyButtonClickedColor;
        }).catch(function(err) {
            console.log("Unable to copy text", err);
        });
    });

    element.insertAdjacentElement("afterbegin", copyButton)
}


// Add copy mp3 to clipboard
function addCopyMp3ToClipboardButton(audioElement) {
    const mp3Source = audioElement.getElementsByTagName("source")[0];
    const mp3Url =  defaultSettings.cambridgeDictionaryUrl + mp3Source.getAttribute("src");

    addCopyButton(mp3Url, audioElement.parentElement)
}

const audioElements = document.getElementsByTagName("audio");
Array.from(audioElements).forEach(addCopyMp3ToClipboardButton);


// Add copy word's definition to clipboard
function addCopyDefinitionToClipboardButton(definitionElement) {
    let wordTitle = ''
    let wordDefinitionText = '';
    let wordType = '';

    // Copy word's title
    rootElementSelector = defaultSettings.wordRootElementClasses.join(", ")
    const wordRootElement = definitionElement.closest(rootElementSelector);
    wordTitle = getElementsTextWithoutTags(wordRootElement.querySelector(defaultSettings.wordTitleElementClass));

    // Copy word's definition
    wordDefinitionText = getElementsTextWithoutTags(definitionElement).trim();

    // Copy word's type
    const wordTypeElement = wordRootElement.querySelector(defaultSettings.wordTypeElementClass);

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
    
    // Some definitions contain the word/phrase already
    if (!wordDefinitionText.includes(wordTitle)) {
        clipboardText = wordTitle + " - " + clipboardText
    }

    addCopyButton(clipboardText, definitionElement)
}

const definitionElements = document.getElementsByClassName("def");
Array.from(definitionElements).forEach(addCopyDefinitionToClipboardButton);


// Add copy word's example to clipboard
function addCopyExampleToClipboardButton(exampleElement) {
    exampleTextElement = exampleElement.getElementsByClassName(defaultSettings.wordExampleElementClass)[0]
    exampleText = getElementsTextWithoutTags(exampleTextElement)

    addCopyButton(exampleText, exampleElement)
}

const exampleElements = document.getElementsByClassName("examp");
Array.from(exampleElements).forEach(addCopyExampleToClipboardButton);