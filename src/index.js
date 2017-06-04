import importedBuckets from "./buckets";

const isVowel = letter => ["a","e","i","o","u"].includes(letter.toLowerCase());

const randomElement = arr => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

export const addIndefiniteArticle = str => {
  if (str.match(/^(use|urin)/)) {
    return "a " + str;
  }

  if (isVowel(str[0])) {
    return "an " + str;
  }

  return "a " + str;
};

export const capitalize = str => str[0].toUpperCase() + str.slice(1);

export const pluralize = str => {
  if (str.slice(-1) === "s") {
    return str + "es";
  }
  if (str.slice(-2) === "sh") {
    return str + "es";
  }
  return str + "s";
};

export const nounify = str => {
  if (str.slice(-3) === "ate") {
    return str.slice(0, str.length - 1) + "or";
  }

  if (isVowel(str.slice(-1))) {
    return str + "r";
  }

  if (isVowel(str[str.length - 2]) && isVowel(str[str.length - 3])) {
    return str + "er";
  }

  if (isVowel(str[str.length - 2])) {
    return str + str.slice(-1) + "er";
  }

  return str + "er";
};

export const ingify = str => {
  if (isVowel(str.slice(-1))) {
    return str.slice(0, str.length - 1) + "ing";
  }

  if (isVowel(str[str.length - 2]) && isVowel(str[str.length - 3])) {
    return str + "ing";
  }

  if (isVowel(str[str.length - 2])) {
    return str + str.slice(-1) + "ing";
  }

  return str + "ing";
};

const replacePatternWithModifier = buckets => (_, modifier, bucketName) => {
  const phrase = select(bucketName, buckets);

  switch (modifier) {
    case "s":
      return addIndefiniteArticle(phrase);
    case "c":
      return capitalize(phrase);
    case "p":
      return pluralize(phrase);
    case "n":
      return nounify(phrase);
    case "v":
      return ingify(phrase);
    default:
      return phrase;
  }
};

const replaceSimplePattern = buckets => (_, bucketName) => select(bucketName, buckets);

function parse(str, buckets) {
  let output = str;
  const repeatingMatch = str.match(/r{(.*?)}/);

  if (repeatingMatch) {
    const phrase = parse(repeatingMatch[1], buckets);

    output = output.replace(/r{.*?}/g, phrase);
  }

  return output
    .replace(/\((.)\)\[(.*?)]/g, replacePatternWithModifier(buckets))
    .replace(/\[(.*?)]/g, replaceSimplePattern(buckets));
}

function select(bucketName, buckets) {
  const phrase = randomElement(buckets[bucketName]);

  return parse(phrase, buckets);
}

const getInsult = (buckets = importedBuckets) => {
  const output = select("insults", buckets).replace("'", "’");

  return capitalize(output);
};

export default getInsult;
