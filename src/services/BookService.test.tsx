import * as BookService from './BookService'

describe('Book Service tests - Grouping of Books by Shelf', () => {

    it('group books by shelf', () => {
        const books = [
            {id: "123", shelf: "read"},
            {id: "124", shelf: "read"},
            {id: "125", shelf: "currentlyReading"},
            {id: "126", shelf: "read"}
        ];
        const map = new Map ();
           map.set("read",[{id: "123", shelf: "read"}, {id: "124", shelf: "read"}, {id: "126", shelf: "read"}]);
           map.set("currentlyReading", [{id: "125", shelf: "currentlyReading"}]);
        expect(BookService.groupBooksByBookshelf(books)).toEqual(map)
    });
    it('group books by shelf with undefined shelf', () => {
        const books = [
            {id: "123"}
        ];
        const map = new Map ();
        map.set(undefined, [{id: "123"}]);
        expect(BookService.groupBooksByBookshelf(books)).toEqual(map)
    });
});

describe('Book Service tests - Create Categories', () => {

    it('create categories with all items in base list', () => {
        const keys = [ "currentlyReading", "wantToRead", "read"];
        const expectedCategories = [
            {key: "currentlyReading", displayName: "Currently Reading"},
            {key: "wantToRead", displayName: "Want To Read"},
            {key: "read", displayName: "Read"},
            ];
        expect(BookService.createCategories(keys)).toEqual(expectedCategories)
    })

    it('create categories with one of the items in base list', () => {
        const keys = ["read"];
        const expectedCategories = [
            {key: "currentlyReading", displayName: "Currently Reading"},
            {key: "wantToRead", displayName: "Want To Read"},
            {key: "read", displayName: "Read"},
        ];
        expect(BookService.createCategories(keys)).toEqual(expectedCategories)
    })
});

describe('Book Service tests - Update shelf with existing shelf', () => {

    it('updated shelf', () => {
        const searchList = [{id: "123"}, {id: "124"}];
        const existingBookMap = new Map();
        existingBookMap.set("123", {id: "123", shelf: "read"});
        const expectedList = [{id: "123", shelf: "read"}, {id: "124"}];
        expect(BookService.updateShelfWithExistingShelf(existingBookMap, searchList)).toEqual(expectedList);
    })
});

describe('Book Service tests - create map with book id for each book', () => {

    it('books by id', () => {
        const books = [{id: "123", shelf:"read"}, {id: "124", shelf:"read"}];
        const expectedMap = new Map();
        expectedMap.set("123", {id: "123", shelf: "read"});
        expectedMap.set("124", {id: "124", shelf: "read"});
        expect(BookService.booksById(books)).toEqual(expectedMap);
    })
});