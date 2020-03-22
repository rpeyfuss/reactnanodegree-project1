export interface Book {
    allowAnonLogging: boolean;
    authors: string[];
    averageRating: number;
    canonicalVolumeLink: string;
    categories: string[];
    contentVersion: string;
    description: string;
    id: string;
    imageLinks: ImageLinks;
    industryIdentifiers: IndustryIdentifier[];
    infoLink: string;
    language: string;
    maturityRating: string;
    pageCount: number;
    panelizationSummary: PanelizationSummary;
    previewLink: string;
    printType: string;
    publishedDate: string;
    publisher: string;
    ratingsCount: number;
    readingModes: ReadingModes;
    shelf: string;
    subtitle: string;
    title: string;
}

export interface ImageLinks {
    smallThumbnail: string;
    thumbnail: string;
}

export interface IndustryIdentifier {
    type: string;
    identifier: string;
}

export interface PanelizationSummary {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
}

export interface ReadingModes {
    text: boolean;
    image: boolean;
}

export interface Category {
    key: string;
    displayName: string;
}

export interface UpdateBookShelf {
    bookId: string,
    shelfCategory: string
}