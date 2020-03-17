import React from 'react';
import './App.css';
import {Link, Route} from 'react-router-dom';
import Search from './components/Search';
import * as BooksAPI from "./APIServices/BooksAPI";
import {Book} from "./models/Book";
import {BookCover} from "./components/BookCover";

interface IState {
    books:  any;
    keys: string[];
}

class BooksApp extends React.Component {
    state: IState = {
        books: new Map<string, Book[]>(),
        keys: []
    };

    componentDidMount(): void {
        BooksAPI.getAll()
            .then((books: Book[]) => {
                const groupedBooks = this.groupBooksByBookshelf(books);
                const keys = Array.from(groupedBooks.keys());
                this.setState(() => (
                    {books: groupedBooks, keys}
                ))}
            )
    }

    groupBooksByBookshelf( books: Book[]) {
        let map = new Map();
        books.forEach( book => {
            const key = this.toTitleCase(book.shelf);
            if (map.has(key)){
                const values = map.get(key).concat(book);
                map.set(key, values)
            } else {
                map.set(key, [book])
            }
        });
        return map;
    }
    toTitleCase(str: string):string {
        let titleCaseWord = str.substring(0,1).toUpperCase() + str.substring(1);
        let i = 1;
        while (i < titleCaseWord.length) {
            if (titleCaseWord[i] === titleCaseWord[i].toUpperCase()){
                titleCaseWord = titleCaseWord.substring(0,i) + " " + titleCaseWord.substring(i)
                i++;
            }
            i++;
        }
        return titleCaseWord;
    }

    render() {
        const {books, keys} = this.state;
        return (
            <div className="app">
                <Route path="/search" className="search">
                    <Search/>
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
