var provisions = require('json!./provisions.json');

var headers = Object.keys(provisions).sort((a, b) => {
    if (a > b) {
        return 1;
    }
    if (b > a) {
        return -1;
    }
    return 0;
});

export default headers;
