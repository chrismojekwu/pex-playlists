import { render, screen, cleanup } from '@testing-library/react';
import { returnTestSongObject } from './../utils/functions';
import Songs from './Songs'

afterEach(cleanup);

it('renders a song correctly', () => {
    render(<Songs songs={returnTestSongObject()}/>);    
    expect(screen.getByRole("listitem")).toBeInTheDocument();
});

it('renders error when data is null', () => {
    render(<Songs songs={null}/>);
    expect(screen.getByTestId("error")).toBeInTheDocument();
});

it('renders error when data is null', () => {
    render(<Songs songs={undefined}/>);
    expect(screen.getByTestId("error")).toBeInTheDocument();
});