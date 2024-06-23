import { observer } from "mobx-react-lite";
import type Game from "../game/Game";

type Props = {
    game: Game,
};

const Options = observer((props: Props) => {
    const { game } = props;

    return (
        <div>
            <label>
                Difficulty:
                <select value={game.size} onChange={e => game.start(Number(e.target.value))}>
                    <option value={8}>Easy</option>
                    <option value={16}>Medium</option>
                    <option value={24}>Hard</option>
                </select>
            </label>
        </div>
    );
});

export default Options;
