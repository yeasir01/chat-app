export const truncate = (sentence = "", maxLen = 50) => {
    if (sentence.length < maxLen) {
        return sentence;
    }
    return sentence.substring(0, maxLen) + "..."
}