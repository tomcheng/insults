const isVowel = letter =>
  ["a", "e", "i", "o", "u"].includes(letter.toLowerCase());

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
