import React from 'react';
import './App.css';
import {Link, Route} from 'react-router-dom';
import Search from './components/Search';
import * as BooksAPI from "./APIServices/BooksAPI";
import {Book} from "./models/Book";
import {BookCover} from "./components/BookCover";

interface IState {
    books: Book[];
}

class BooksApp extends React.Component {
    state: IState = {
        books: []
    };

    componentDidMount(): void {
        BooksAPI.getAll()
            .then((books: Book[]) => {
                console.log(books);
                this.setState(() => (
                    {books}
                ))}
            )
    }

    render() {
        const {books} = this.state;
        return (
            <div className="app">
                <Route path="/search" className="search">
                    <Search/>
                </Route>

                <Route exact path="/">
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Currently Reading</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {this.state.books.map ( (book) => (
                                            <BookCover key={book.id} book={book} />
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search" onClick={() => this.setState({showSearchPage: true})}>Add a book</Link>
                        </div>
                    </div>
                </Route>
            </div>
        )
    }
}

export default BooksApp
