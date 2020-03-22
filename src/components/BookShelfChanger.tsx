import React from 'react';
import './../App.css';
import {Category} from "../models/Book";


interface IProps {
    shelfCategories: Category[],
    shelf: string,
    onHandleChange: (category: string) => void
}
export class BookShelfChanger extends React.Component<IProps> {

    updateShelf = (selectedShelfCategory: string) => {
        this.props.onHandleChange(selectedShelfCategory)
    };

    render() {
        return (
        <div className="book-shelf-changer">
            <select
                onChange={(event) => this.updateShelf(event.target.value)}>
                <option value="move" disabled>Move to...</option>
                { this.props.shelfCategories.map( (category: Category) => (
                    <option key={category.key} value={category.key}>{category.displayName}</option>
                ))}
            </select>
        </div>
        )
    }
}