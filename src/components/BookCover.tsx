import React from 'react';
import './../App.css';
import {BookShelfChanger} from "./BookShelfChanger";
import {Book, Category, UpdateBookShelf} from "../models/Book";

interface IProps {
    book: Book,
    shelfCategories: Category[],
    onHandleUpdateBookShelf: (updateBookSelf: UpdateBookShelf) => void
}

export class BookCover extends React.Component<IProps> {

    updateShelf = (shelf: string) => {
        const updateBookShelf = { bookId: this.props.book.id, shelfCategory: shelf };
        this.props.onHandleUpdateBookShelf(updateBookShelf);
    };

    render() {
        const {book, shelfCategories} = this.props;
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover"
                             style={{
                                 width: 128,
                                 height: 193,
                                 backgroundImage: `url(${book?.imageLinks?.thumbnail})`}}
                        >
                        </div>
                        <BookShelfChanger shelfCategories={shelfCategories}
                                          shelf={book.shelf ? book.shelf : "none"}
                                          onHandleChange={ (shelf:string) => this.updateShelf(shelf)} />
                    </div>
                    <div className="book-title">{book?.title}</div>
                    <div className="book-authors">
                        {book?.authors?.map ((author) => (
                            <span key={author}>{`${author} `}</span>
                        ))}
                    </div>
                </div>
            </li>
        )
    }
}