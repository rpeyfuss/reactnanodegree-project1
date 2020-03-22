import * as StringUtlities from './StringUtilities'

describe('String utilities test', () => {

    it('converts string to title case', () => {
        expect(StringUtlities.toTitleCase("currentlyReading")).toEqual("Currently Reading");
        expect(StringUtlities.toTitleCase("read")).toEqual("Read");
        expect(StringUtlities.toTitleCase(undefined)).toEqual("");
        expect(StringUtlities.toTitleCase(null)).toEqual("");
    });
});