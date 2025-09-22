export const summarizeArray = (arr: any[], maxVisible = 4) => {
  if (maxVisible < arr.length) {
    const hiddenCount = arr.length - maxVisible
    return [...arr.slice(0, maxVisible), `+ ${hiddenCount}`]
  }
  return arr
}
