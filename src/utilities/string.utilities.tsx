
export const toTitleCase = (str: string) => {
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
