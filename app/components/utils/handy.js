// Truncating text
export function truncate(text, bound) {
    let textToShow;
    if (text.length > bound) {
        textToShow = text.substr(0, bound) + '...';
    } else {
        textToShow = text;
    }
    return textToShow;
}

// For checking if we are in an iFrame
export function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
