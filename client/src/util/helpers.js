import { parseISO } from "date-fns";

export const truncate = (sentence = "", maxLen = 50) => {
    if (sentence.length < maxLen) {
        return sentence;
    }
    return sentence.substring(0, maxLen) + "..."
}

export const getInitials = (firstName, lastName) => {
   const first = firstName.trim().charAt(0).toUpperCase() || "";
   const last = lastName.trim().charAt(0).toUpperCase() || "";
   return first + last;
}

export const convertTime = (isoTimestamp) => {
    return parseISO(isoTimestamp);
}