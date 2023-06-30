import { LOCALSTORAGE_ARRAY } from "../constants/constants";

export const isVoted = (id) => 
    localStorage.getItem(LOCALSTORAGE_ARRAY) && JSON.parse(localStorage.getItem(LOCALSTORAGE_ARRAY)).some(el=>el===id)