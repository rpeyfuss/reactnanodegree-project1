import React from 'react';
import './../App.css';
import {BookShelfChanger} from "./BookShelfChanger";
import {Book} from "../models/Book";

interface IProps {
    book: Book
}

export class BookCover extends React.Component<IProps> {
    render() {
        const {book} = this.props;
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover"
                             style={{
                                 width: 128,
                                 height: 193,
                                 backgroundImage: `url(${book.imageLinks.thumbnail})`}}
                        >
                        </div>
                        <BookShelfChanger />
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">
                        {book.authors.map ((author) => (
                            <span key={author}>{author}</span>
                        ))}
                    </div>
                </div>
            </li>
        )
    }
}