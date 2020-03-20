import React from 'react';
import './App.css';
import {Link, Route} from 'react-router-dom';
import Search from './components/Search';
import {Book} from "./models/Book";
import {BookCover} from "./components/BookCover";
import * as BooksAPI from "./APIServices/BooksAPI";
import * as BookService from "./services/book.service";

interface IState {
    books:  any;
    keys: string[];
    searchBooks: Book[];
}

class BooksApp extends React.Component {
    state: IState = {
        books: new Map<string, Book[]>(),
        keys: [],
        searchBooks: []
    };

    componentDidMount(): void {
        BooksAPI.getAll()
            .then((books: Book[]) => {
                const groupedBooks = BookService.groupBooksByBookshelf(books);
                const keys = Array.from(groupedBooks.keys());
                this.setState(() => (
                    {books: groupedBooks, keys}
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

    render() {
        const {books, keys, searchBooks} = this.state;
        return (
            <div className="app">
                <Route path="/search"  render={({ history }) => (
                    <Search books={searchBooks} onHandleSearch={ this.filterBooks } />
                    )}>
                </Route>

                <Route exact path="/">
                    {(books && keys)
                        ? (keys.map( (key) => (
                        <div key={key} className="list-books">
                            <div className="list-books-title">
                                <h1 >{key}</h1>
                            </div>
                            <div className="list-books-content">
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">{key}</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            {books.get(key).map( (book: Book) => (
                                                <BookCover key={book.id} book={book} shelf={key} />
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
