import { render, screen, cleanup } from '@testing-library/react';
import UserPlaylist from './UserPlaylist';


afterEach(cleanup);

it('renders empty playlist message for empty user playlist', () => {
    render(<UserPlaylist songs={[]}/>);
    expect(screen.getByTestId('emptyplaylist')).toBeInTheDocument();
});

it('renders error message for null playlist', () => {
    render(<UserPlaylist songs={null}/>);
    expect(screen.getByTestId('error')).toBeInTheDocument();
});
