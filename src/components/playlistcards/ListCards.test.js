import { render, screen, cleanup } from '@testing-library/react';
import playlistData from '../utils/playlist-data';
import ListCards from './ListCards'

afterEach(cleanup);

it('renders 4 cards with the correct alts', () => {
    render(<ListCards/>);  
    for(let i = 0 ; i < playlistData; i++){
        expect(screen.getByRole('img', {name: `Picture of ${playlistData[i].name}`})).toBeInTheDocument();
    };
});

it('renders the correct amount of images', () => {
    render(<ListCards/>);
    const images = screen.queryAllByRole('img');
    expect(images.length).toBe(8);
});
