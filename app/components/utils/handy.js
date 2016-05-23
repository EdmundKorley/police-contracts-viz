export function truncate(text, bound) {
    let textToShow;
    if (text.length > bound) {
        textToShow = text.substr(0, bound) + '...';
    } else {
        textToShow = text;
    }
    return textToShow;
}
