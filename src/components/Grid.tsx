import { observer } from "mobx-react-lite";
import type { PropsWithChildren } from "react";
import type Game from "../game/game";
import Cell from "./Cell";

type Props = {
    game: Game;
};

const Grid = observer((props: PropsWithChildren<Props>) => {
    const { children, game } = props;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${game.size}, 30px)`, position: 'relative', justifyContent: 'center' }}>
            {game.cells.map((cell, idx) => (
                <Cell key={idx} cell={cell} onReveal={() => game.reveal(cell)} onFlag={() => game.toggleFlag(cell)} />
            ))}

            {children}
        </div>
    );
});

export default Grid;