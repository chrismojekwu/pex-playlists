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
    const testId = Utils.returnTestSongObject()[0].id.$t;
    expect(Utils.addSongToUserPlaylistReturnId(Utils.returnTestSongObject()[0])).toEqual(testId);
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
    const testObject = Utils.returnTestSongObject()[0]
    const testUserPlaylist = [testObject, testObject, testObject];
    const correct = Utils.formatSongObjectValues(Utils.returnTestSongObject());
    const calculated = Utils.averageUserPlaylist(testUserPlaylist).collected;

    for(let i = 0 ; i < correct.length; i++){
        expect(+correct[i]).toEqual(+calculated[i]);
    };
});