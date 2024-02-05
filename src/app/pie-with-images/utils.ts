export function breakWord(string: string, symbolsCount: number) {
  const splittedBySpacing = string.split(" ");
  const spacing = " ";
  return splittedBySpacing.reduce(
    (total, current, idx) => {
      let lastElem = total[total.length - 1];
      const nextLength = lastElem.length + ` ${current}`.length;
      if (nextLength <= symbolsCount) {
        total[total.length - 1] += `${idx ? spacing : ""}${current}`;
      } else {
        total.push(`${current}`);
      }
      return total;
    },
    [""]
  );
}
export function truncate(text: string, symbolsCount: number) {
  if (text.length <= symbolsCount) return text;
  return text.slice(0, symbolsCount) + "...";
}
