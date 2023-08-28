function addCopyButton(textToCopy, parentElement) {
    const copyButton = document.createElement("button");
    copyButton.classList.add("copyButton");
    copyButton.innerHTML = "&#10064;";

    copyButton.addEventListener("click", function() {
        // Copy text to clipboard
        navigator.clipboard.writeText(textToCopy).then(function() {
            console.log("Text successfully copied");
//            copyButton.innerHTML = "&#9745;";
            copyButton.style.color = "#C0C0C0";
        }).catch(function(err) {
            console.log("Unable to copy text", err);
        });
    });

    parentElement.insertAdjacentElement("afterbegin", copyButton)
}


//Add copy mp3 to clipboard
function addCopyMp3ToClipboardButton(audioElement) {
    const mp3Source = audioElement.getElementsByTagName("source")[0];
    const mp3Url =  "https://dictionary.cambridge.org/" + mp3Source.getAttribute("src");

    addCopyButton(mp3Url, audioElement.parentElement)
}

const audioElements = document.getElementsByTagName("audio");
Array.from(audioElements).forEach(addCopyMp3ToClipboardButton);


//Add copy word's definition to clipboard
function addCopyDefinitionToClipboardButton(definitionElement) {
    let definitionText = '';
    let partOfSpeech = '';

    // Copy definition text
    definitionText = getElementsTextWithoutTags(definitionElement)

    // Copy part of speech
    const workHeaderElement = definitionElement.closest(".pr");
    console.log(workHeaderElement)
    const partOfSpeechElement = workHeaderElement.querySelector(".pos.dpos");
    console.log(partOfSpeechElement)

    if (partOfSpeechElement) {
        partOfSpeech = partOfSpeechElement.childNodes[0].textContent
        console.log(partOfSpeech)
    }

    const clipboardText = definitionText + partOfSpeech
    addCopyButton(clipboardText, definitionElement.parentElement)
}

const definitionElements = document.getElementsByClassName("def");
Array.from(definitionElements).forEach(addCopyDefinitionToClipboardButton);

function addCopyExampleToClipboardButton(exampleElement) {
    exampleTextElement = exampleElement.getElementsByClassName("eg")[0]
    exampleText = getElementsTextWithoutTags(exampleTextElement)

    addCopyButton(exampleText, exampleElement)
}

const exampleElements = document.getElementsByClassName("examp");
Array.from(exampleElements).forEach(addCopyExampleToClipboardButton);