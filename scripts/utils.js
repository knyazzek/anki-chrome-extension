function getElementsTextWithoutTags(element) {
    let text = "";

    // Loop through all child nodes of the current element
    for (let child of element.childNodes) {
        if (child.nodeType === 3) { // Text node
            text += child.nodeValue;
        } else if (child.nodeType === 1) { // Element node
            text += getElementsTextWithoutTags(child);
        }
    }

    return text;
}