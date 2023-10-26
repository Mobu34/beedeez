export const getPlurialSentence = (nb: number, sentence: string) => {
  if (nb === 1) {
    return `${nb} ${sentence}`;
  }
  const splitStr = sentence.split(' ');
  let newStr = '';
  for (const split of splitStr) {
    newStr = `${newStr}${split}s `;
  }
  return `${nb} ${newStr}`;
};
