function addCopyToClipboardForButton(button, textToCopy) {
    button.addEventListener("click", function() {
        // Copy text to clipboard
        navigator.clipboard.writeText(textToCopy).then(function() {
            console.log("Text successfully copied");
        }).catch(function(err) {
            console.log("Unable to copy text", err);
        });
    });
}



//Add copy mp3 to clipboard button

function addCopyMp3ToClipboardButton(audioElement) {
    const mp3Source = audioElement.getElementsByTagName("source")[0];
    const mp3Url =  "https://dictionary.cambridge.org/" + mp3Source.getAttribute("src");

    const playButton = audioElement.parentElement

    const copyButton = document.createElement("button");
    copyButton.classList.add("copyButton");
    copyButton.innerHTML = "&#10064;";

    addCopyToClipboardForButton(copyButton, mp3Url)
    playButton.insertAdjacentElement("afterbegin", copyButton)
}

const audioElements = document.getElementsByTagName("audio");
Array.from(audioElements).forEach(addCopyMp3ToClipboardButton);


//Add copy definition to clipboard button

function addCopyDefinitionToClipboardButton(definitionElement) {
    const definitionContainerElement = definitionElement.parentElement

    const copyButton = document.createElement("button");
    copyButton.classList.add("copyButton");
    copyButton.innerHTML = "&#10064;";

    let definitionText = '';
    let partOfSpeech = '';

    // Copy definition text
    definitionElement.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            definitionText += node.textContent;
        } else if (node.tagName === 'A') {
            definitionText += node.textContent;
        }
    });

    // Copy part of speech
    const workHeaderElement = definitionElement.closest(".pr.entry-body__el");
    console.log(workHeaderElement)
    const partOfSpeechElement = workHeaderElement.querySelector(".pos.dpos");
    console.log(partOfSpeechElement)

    if (partOfSpeechElement) {
        partOfSpeech = partOfSpeechElement.childNodes[0].textContent
        console.log(partOfSpeech)
    }

    const clipboardText = definitionText + partOfSpeech

    addCopyToClipboardForButton(copyButton, clipboardText)
    definitionContainerElement.insertAdjacentElement("afterbegin", copyButton)
}

const definitionElements = document.getElementsByClassName("def");
Array.from(definitionElements).forEach(addCopyDefinitionToClipboardButton);