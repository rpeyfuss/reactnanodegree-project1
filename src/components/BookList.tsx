import React from 'react';
import './../App.css';
import {Book, Category, UpdateBookShelf} from "../models/BookModel";
import {BookCover} from "./BookCover";

interface IProps {
    books: any;
    category: Category;
    shelfCategories: Category[];
    onHandleUpdateBookShelf: (updateBookSelf: UpdateBookShelf) => void
}

export class BookList extends React.Component<IProps> {

    render() {
        const {category, books, shelfCategories} = this.props;
        return (
            <div className="list-books-content">
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{category.displayName}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {books?.map( (book: Book) => (
                                <BookCover
                                    key={book.id}
                                    book={book}
                                    shelfCategories={shelfCategories}
                                    onHandleUpdateBookShelf={(updateBookShelf: UpdateBookShelf) =>
                                        this.props.onHandleUpdateBookShelf(updateBookShelf)}
                                />
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}
