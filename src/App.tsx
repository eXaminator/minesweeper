import { observer } from 'mobx-react-lite';
import './App.css';
import Grid from './components/Grid';
import Message from './components/Message';
import Options from './components/Options';
import Statistics from './components/Statistics';
import Game from './game/Game';

const game = new Game(8);

const App = observer(function AppCmp() {
    return (
        <div>
            <h1>Minesweeper</h1>
            <Options game={game} />
            <Statistics game={game} />
            <Grid game={game}>
                {game.isGameOver && <Message text="Game Over!" buttonLabel="Restart" onAction={() => game.start()} />}
                {game.isGameWon && <Message text="You win!" buttonLabel="Restart" onAction={() => game.start()} />}
            </Grid>
        </div >
    )
});

export default App
