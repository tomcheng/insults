import importedBuckets from "./buckets";
import {
  addIndefiniteArticle,
  capitalize,
  pluralize,
  nounify,
  ingify
} from "./languageHelpers";

const randomElement = arr => {
  if (arr[0] && arr[0].weight) {
    const totalWeight = arr.reduce((acc, curr) => acc + curr.weight, 0);
    const rand = Math.random() * totalWeight;
    let count = 0, index = 0;

    do {
      count += arr[index].weight;
      index++;
    } while (count < rand);

    return arr[index - 1].value;
  } else {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
  }
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

const replaceSimplePattern = buckets => (_, bucketName) =>
  select(bucketName, buckets);

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

const getInsult = (buckets = importedBuckets) =>
  capitalize(select("insults", buckets));

export default getInsult;
