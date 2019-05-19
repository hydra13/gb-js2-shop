"use strict"

console.log('RegExpTest started...');


fetch('/data/texttoreplace.txt')
    .then(response => response.text())
    .then((data) => {
        console.log('Text Before: ')
        console.log(data)

        let changedText = data.replace(/(^)'|(\W)'|'(\W)|'($)/g, "$1$2\"$3");

        console.log('Text After: ');
        console.log(changedText);
    })