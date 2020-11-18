import { render, screen, cleanup } from '@testing-library/react';
import { returnTestUserPlaylistIds} from './../utils/functions';
import { spooky, aggro, whimsical } from './../utils/stats'
import Modal from './Modal';

afterEach(cleanup);

it('renders user modal with correct data', () => {
    render(<Modal modal={true} modalType={"user-playlist"} data={returnTestUserPlaylistIds}/>);
    expect(screen.getByTestId("X Icon")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toBeInTheDocument();
});

it('renders Spooky description modal correctly', () => {
    render(<Modal modal={true} modalType={"playlist"} data={spooky} />);
    expect(screen.getByTestId("X Icon")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toBeInTheDocument();
});

it('renders Aggressive description modal correctly', () => {
    render(<Modal modal={true} modalType={"playlist"} data={aggro} />);
    expect(screen.getByTestId("X Icon")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toBeInTheDocument();
});

it('renders Whimsical description modal correctly', () => {
    render(<Modal modal={true} modalType={"playlist"} data={whimsical} />);
    expect(screen.getByTestId("X Icon")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toBeInTheDocument();
});
