const elements = document.getElementsByTagName('*');

const dictionary = {
  fromWords: ['corona virus', 'coronavirus', 'covid-19'],
  toWord: 'Miley Cyrus',
}

function exact(string) {
  return string;
}

function capitalize(string) {
  return String(string).charAt(0).toUpperCase() + string.slice(1);
}

function upperCase(string) {
  return String(string).toUpperCase();
}

function applyModifier(modifierCallback) {
  let fromWords = dictionary.fromWords.map(modifierCallback);
  let toWord = modifierCallback(dictionary.toWord);

  return [
    new RegExp('\\b' + fromWords.join('\\b|\\b') + '\\b', 'g'),
    toWord
  ];
}

let modifiedWords = [];

[exact, capitalize, upperCase].forEach((callback) => {
  return modifiedWords.push(applyModifier(callback));
})

function applyRegex(text, sourceRegexToTargetWords) {
  for (let k = 0; k < sourceRegexToTargetWords.length; k++) {
    const [regex, targetWord] = sourceRegexToTargetWords[k];

    text = text.replace(regex, targetWord)
  }
  return text;
}

for (let i = 0; i < elements.length; i++) {
  let element = elements[i];

  for (let j = 0; j < element.childNodes.length; j++) {
    const node = element.childNodes[j];

    if (node.nodeType === 3) {
      const text = node.nodeValue;
      const replacedText = applyRegex(text, modifiedWords);

      if (replacedText !== text) {
        element.replaceChild(document.createTextNode(replacedText), node);
      }
    }
  }
}
