import { LOCALSTORAGE_ARRAY } from "../constants/constants"

export const saveToLocalStorage = (id) => {
    const LSItem = localStorage.getItem(LOCALSTORAGE_ARRAY)

    const arr = (LSItem) ? JSON.parse(LSItem)  : []

    arr.push(id)

    localStorage.setItem(LOCALSTORAGE_ARRAY,JSON.stringify(arr))
}