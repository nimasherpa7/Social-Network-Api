function dateFunction(timestamp) {
    // use the 'toLocaleDateString()' method to format the date as MM/DD/YYYY
    return `${new Date(timestamp).toLocaleDateString()}`;
}

module.exports = dateFunction;