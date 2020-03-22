import {Book, Category} from "../models/Book";
import * as StringUtilities from "../utilities/string.utilities";

export const groupBooksByBookshelf = ( books: Book[])  => {
    let map = new Map();
    books.forEach( book => {
        const key = book.shelf;
        if (map.has(key)){
            const values = map.get(key).concat(book);
            map.set(key, values)
        } else {
            map.set(key, [book])
        }
    });
    return map;
};

export const createCategories = (keys: string[]):Category[] => {
    return keys.map (key => {
        return {
            key: key,
            displayName: StringUtilities.toTitleCase(key)
        }
    })
};
