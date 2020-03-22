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
    let categories = [
        {key: "currentlyReading", displayName: "Currently Reading"},
        {key: "wantToRead", displayName: "Want To Read"},
        {key: "read", displayName: "Read"}
    ];
    const keysCategories = keys.reduce ((accum: Category[], key:string) => {
        const category = {key: key, displayName: StringUtilities.toTitleCase(key)};
        if (categories.filter(value => value.key === key).length > 0) return accum;
        else return accum.concat({...category})
    },[]);
    return categories.concat(keysCategories);
};

export const updateShelfWithExistingShelf = (booksByIdMap: Map<string, Book>, searchBookList: Book[]) => {
    searchBookList.forEach(book => {
        if(booksByIdMap.has(book.id)) {
            const existBook = booksByIdMap.get(book.id);
            // @ts-ignore
            book['shelf'] = existBook.shelf
        }
    });
    return searchBookList;
};

export const booksById = (books: Book[]): Map<string, Book> => {
    let bookMap = new Map<string, Book>();
    books.forEach( book => {
        bookMap.set(book.id, book);
    });
    return bookMap;
};