import { cleanup } from '@testing-library/react';
import * as Utils from './../utils/functions';

afterEach(cleanup);

it('testing get user playlist function', () => {
    const playlist = Utils.getUserPlaylist();
    expect(playlist).toBe(null);
});

it('testing filter songs function', () => {
    const filteredSongs = Utils.filterSongs(Utils.returnTestSongObject());
    const emptyObject = { agg: [], creep: [], fun: [] };
    expect(filteredSongs).toEqual(emptyObject);
});

it('testing playlist modal descirption function', () => {
    let titles = ['Aggressive', 'Spooky', 'Whimsical'];

    for(let i = 0 ; i < titles.length; i++){
        let description = Utils.playlistModalDescription(titles[i]);
        expect(description).toEqual( expect.stringContaining(titles[i]));
    };
});

it('testing calculate percent function', () => {
    const values = Utils.formatSongObjectValues(Utils.returnTestSongObject());
    const correct = [1, 87, 45, 2, 21, 95];
    const calculated = Utils.calculatePercent(values);

    for(let i = 0 ; i < calculated.length; i++){
        expect(calculated[i].percent).toEqual(correct[i]);
    };   
});

it('testing keypress function', () => {
    const e = {};
    e.key = "Enter";
    const mockAltKeypress = () => "Alt";
    expect(Utils.handleEnterKeypress(e, "test string")).toEqual("test string");
    expect(Utils.handleEnterKeypress(mockAltKeypress)).toEqual(false);
});

it('testing that localstorage function returns id', () => {
    const testId = "https://testid.net";
    expect(Utils.addSongToUserPlaylistReturnId(testId)).toEqual(testId);
});

it('testing function to retrieve user playlist objects', () => {
    const objects = [{id:{$t: 1}}, {id:{$t: 2}}, {id:{$t: 3}}, {id:{$t: 4}}, {id:{$t: 5}}];
    const ids = [2, 4, 5];
    const expectedResult = [{id:{$t: 2}}, {id:{$t: 4}}, {id:{$t: 5}}];
    expect(Utils.filterUserPlaylistSongs(ids, objects)).toEqual(expectedResult);
});

it('testing object formatting function', () => {
    const result = Utils.formatSongObjectValues(Utils.returnTestSongObject());
    expect(result).toHaveLength(6);
});

it('testing percent string function', () => {
    const over = 150;
    const normal = 80;
    expect(Utils.formatPercentString(over)).toEqual("50%");
    expect(Utils.formatPercentString(normal)).toEqual("90%");
});

it('testing average user playlist function', () => {
    const testSongArray = Utils.returnTestSongObject();
    const testUserPlaylist = [testSongArray[0].id.$t, testSongArray[0].id.$t, testSongArray[0].id.$t];
    const correct = Utils.formatSongObjectValues(Utils.returnTestSongObject());
    const calculated = Utils.averageUserPlaylist(testUserPlaylist, testSongArray).collected;

    for(let i = 0 ; i < correct.length; i++){
        expect(+correct[i]).toEqual(+calculated[i]);
    };
});