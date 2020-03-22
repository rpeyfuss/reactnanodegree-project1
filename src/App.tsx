import React from 'react';
import './App.css';
import {Link, Route} from 'react-router-dom';
import Search from './components/Search';
import {Book, Category, UpdateBookShelf} from "./models/Book";
import {BookCover} from "./components/BookCover";
import * as BooksAPI from "./APIServices/BooksAPI";
import * as BookService from "./services/book.service";

interface IState {
    books:  Book[];
    groupedBooks: any,
    shelfCategories: Category[];
    searchBooks: Book[];
}

class BooksApp extends React.Component {
    state: IState = {
        books: [],
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
                const shelfCategories = BookService.createCategories(Array.from(groupedBooks.keys())).concat([
                    {key: "none", displayName: "None"}
                ]);
                this.setState(() => (
                    {books, groupedBooks, shelfCategories}
                ))}
            )
    }
    filterBooks = (str: string) => {
        if (!str) this.setState(()=> ({searchBooks: []}));
        BooksAPI.search(str.toUpperCase())
            .then((books: any) => {
                const foundBooks = books && books.error ? books.items : books;
                this.setState(()=> ({searchBooks: foundBooks}))}
            )
    };
    updateBookShelf = (updateBookShelf: UpdateBookShelf) => {
        const {bookId, shelfCategory} = updateBookShelf;
        BooksAPI.update(bookId, shelfCategory)
            .then((res: any) => {
                this.getAllBooks();
            })
    }


    render() {
        const {groupedBooks, shelfCategories, searchBooks} = this.state;
        return (
            <div className="app">
                <Route path="/search"  render={() => (
                    <Search books={searchBooks}
                            shelfCategories={shelfCategories}
                            onHandleSearch={(search) => this.filterBooks(search)}
                            onHandleUpdateBookShelf={(e) => this.updateBookShelf(e)}
                    />
                    )}>
                </Route>

                <Route exact path="/">
                    {(groupedBooks && shelfCategories)
                        ? (shelfCategories.map( (category) => (
                        <div key={category.key} className="list-books">
                            <div className="list-books-title">
                                <h1 >{category.displayName}</h1>
                            </div>
                            <div className="list-books-content">
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">{category.displayName}</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            {groupedBooks.get(category.key)?.map( (book: Book) => (
                                                <BookCover key={book.id}
                                                           book={book}
                                                           shelf={category.displayName}
                                                           shelfCategories={shelfCategories}
                                                           onHandleUpdateBookShelf={(e) => this.updateBookShelf(e)}
                                                />
                                            ))}
                                        </ol>
                                    </div>
                                </div>
                            </div>
                            <div className="open-search">
                                <Link to="/search" onClick={() => this.setState({showSearchPage: true})}>Add a book</Link>
                            </div>
                        </div>
                        )))
                        : (<p>Loading</p>)
                    }
                </Route>
            </div>
        )
    }
}

export default BooksApp
