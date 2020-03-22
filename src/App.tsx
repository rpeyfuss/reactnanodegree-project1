import React from 'react';
import './App.css';
import {Link, Route} from 'react-router-dom';
import Search from './components/Search';
import {Book, Category, UpdateBookShelf} from "./models/Book";
import {BookList} from "./components/BookList";
import * as BooksAPI from "./APIServices/BooksAPI";
import * as BookService from "./services/book.service";

interface IState {
    booksByIdMap: any;
    groupedBooks: any;
    shelfCategories: Category[];
    searchBooks: Book[];
}

class BooksApp extends React.Component {
    state: IState = {
        booksByIdMap: new Map<string, Book>(),
        groupedBooks: new Map<string, Book[]>(),
        shelfCategories: [],
        searchBooks: []
    };

    componentDidMount(): void {
        this.getAllBooks()
    }
    getAllBooks(){
        BooksAPI.getAll()
            .then((books: Book[]) => {
                const groupedBooks = BookService.groupBooksByBookshelf(books);
                const booksByIdMap = BookService.booksById(books);
                const shelfCategories = BookService.createCategories(Array.from(groupedBooks.keys())).concat([
                    {key: "none", displayName: "None"}
                ]);
                this.setState(() => (
                    {booksByIdMap, groupedBooks, shelfCategories}
                ))}
            )
    }
    filterBooks = (str: string) => {
        if (!str) this.setState(()=> ({searchBooks: []}));
        BooksAPI.search(str.toUpperCase())
            .then((books: any) => {
                const foundBooks = books && books.error ? books.items : books;
                const updatedSearchBooks = BookService.updateShelfWithExistingShelf(this.state.booksByIdMap, foundBooks);
                this.setState(()=> ({searchBooks: updatedSearchBooks}))}
            )
    };
    updateBookShelf = (updateBookShelf: UpdateBookShelf) => {
        const {bookId, shelfCategory} = updateBookShelf;
        BooksAPI.update(bookId, shelfCategory)
            .then((res: any) => {
                this.getAllBooks();
            })
    };


    render() {
        const {groupedBooks, shelfCategories, searchBooks} = this.state;
        return (
            <div className="app">
                <Route path="/search" render={() => (
                    <Search books={searchBooks}
                            shelfCategories={shelfCategories}
                            onHandleSearch={(search) => this.filterBooks(search)}
                            onHandleUpdateBookShelf={(e) => this.updateBookShelf(e)}
                    />
                    )}>
                </Route>

                <Route exact path="/" render={() => (
                    (groupedBooks && shelfCategories)
                        ? (shelfCategories.map( (category) => (
                            groupedBooks?.get(category.key)?.length > 0
                            ? (
                                <div key={category.key} className="list-books">
                                    <div className="list-books-title">
                                        <h1 >{category.displayName}</h1>
                                    </div>
                                    <BookList
                                        books={groupedBooks.get(category.key)}
                                        category={category}
                                        shelfCategories={shelfCategories}
                                        onHandleUpdateBookShelf={(updateBookShelf: UpdateBookShelf) =>
                                            this.updateBookShelf(updateBookShelf)}
                                    />
                                    <div className="open-search">
                                        <Link to="/search" onClick={() => this.setState(
                                            {showSearchPage: true, searchBooks: []})}>Add a book</Link>
                                    </div>
                                </div>
                                )
                                : <div key={category.key}/>
                            )))
                        : (
                            <p className="loading">Loading...<div className="loader"/></p>
                        )
                )}>
                </Route>
            </div>
        )
    }
}

export default BooksApp
