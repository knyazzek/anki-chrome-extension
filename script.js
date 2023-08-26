function addCopyToClipboardButton(audioElement) {
    const mp3Source = audioElement.getElementsByTagName("source")[0];
    const mp3Url =  "https://dictionary.cambridge.org/" + mp3Source.getAttribute("src");

    const playButton = audioElement.parentElement

    const copyButton = document.createElement("button");
    copyButton.classList.add("copyAudioButton");
    copyButton.innerHTML = "&#10064;";

    // Add click event listener
    copyButton.addEventListener("click", function() {
      // Copy text to clipboard
      navigator.clipboard.writeText(mp3Url).then(function() {
        console.log("Text successfully copied");
      }).catch(function(err) {
        console.log("Unable to copy text", err);
      });
    });

    playButton.insertAdjacentElement("afterbegin", copyButton)
}

const audioElements = document.getElementsByTagName("audio");
Array.from(audioElements).forEach(addCopyToClipboardButton);