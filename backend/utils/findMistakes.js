import * as diff from "diff";
import natural from "natural";

const tokenizer = new natural.WordTokenizer();
const americanStemmer = natural.LancasterStemmer;
const americanTokenizer = new natural.WordTokenizer();

function findMistakes(originalSentence, userSentence) {
  // Tokenize the sentences
  const originalTokens = americanTokenizer.tokenize(originalSentence);
  const userTokens = americanTokenizer.tokenize(userSentence);

  // Create a diff
  const differences = diff.diffArrays(originalTokens, userTokens);
  // Identify words with mistakes
  const mistakes = differences
    .filter((part) => part.added || part.removed)
    .map((part) => part.value);

  return mistakes;
}


// // Example usage:
// const originalSentence = "The quick brown fox jumps over the lazy dog.";
// const userSentence = "The quick brown fox jumps over the lazy dog.";

// const mistakes = findMistakes(originalSentence, userSentence);
// console.log("Mistakes:", mistakes);

export default findMistakes
