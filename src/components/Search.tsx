import React from 'react';
import {Link} from 'react-router-dom'
import './../App.css';
import {Book, Category, UpdateBookShelf} from "../models/Book";
import {BookCover} from "./BookCover";
// import serializeForm from 'form-serialize';

interface IProps {
    books: Book[],
    shelfCategories: Category[],
    onHandleSearch: (searchTerm: string) => void
    onHandleUpdateBookShelf: (updateBookShelf: UpdateBookShelf) => void
}

class Search extends React.Component<IProps> {
    state = {
        showSearchPage: true,
        searchTerm: ''
    };

    updateSearchTerm = (event: any) => {
        event.preventDefault();
        const searchTerm = event.target.value;
        this.setState(() => ({
            searchTerm: searchTerm.trim()
        }));
        if (this.props && this.props.onHandleSearch)
            this.props.onHandleSearch(searchTerm.trim())
    };


    render() {
        const {books, shelfCategories} = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to={"/"} className="close-search" >Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                    <input type="text"
                           placeholder="Search by title or author"
                           value={this.state.searchTerm}
                           onChange={(event) => this.updateSearchTerm(event)}
                    />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books?.map( (book: Book) => (
                            <BookCover
                                key={book.id}
                                book={book} shelf={book.id}
                                shelfCategories={shelfCategories}
                                onHandleUpdateBookShelf={(e) => console.log(e)}/>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;