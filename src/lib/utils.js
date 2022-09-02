// https://stackoverflow.com/a/4032497
function measureText(pText, pFontSize, pStyle) {
    let lDiv = document.createElement('div');

    document.body.appendChild(lDiv);

    if (pStyle != null) {
        lDiv.style = pStyle;
    }

    lDiv.style.whiteSpace = "pre-line";  // https://stackoverflow.com/a/45178556
    lDiv.style.fontSize = "" + pFontSize + "px";
    lDiv.style.position = "absolute";
    lDiv.style.left = -1000;
    lDiv.style.top = -1000;

    lDiv.textContent = pText;

    let lResult = {
        width: lDiv.clientWidth,
        height: lDiv.clientHeight
    };

    document.body.removeChild(lDiv);
    lDiv = null;

    return lResult;
}


export function newFontsizeToFitSize(text, currentFontSize, targetWidth, targetHeight) {

    let i;
    for (i = currentFontSize; i > currentFontSize / 2; i -= 1) {
        let dimensions = measureText(text, i, null)
        if (dimensions.width <= targetWidth && dimensions.height <= targetHeight) {
            return i;
        }
    }
    return i;

}
