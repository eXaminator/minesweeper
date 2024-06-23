import { observer } from "mobx-react-lite";
import type Game from "../game/game";

type Props = { game: Game };

const Statistics = observer(({ game }: Props) => {
    return (
        <div>
            <span>Time: {game.time}</span>
            <span>Mines: {game.mineCount}</span>
        </div>
    );
});

export default Statistics;