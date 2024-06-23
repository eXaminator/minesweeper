import { observer } from "mobx-react-lite";
import type GameCell from "../game/GameCell";
import { useCallback } from "react";

const colorMap = [
    'black',
    'blue',
    'green',
    'red',
    'purple',
    'maroon',
    'teal',
    'black',
    'gray',
];

type Props = {
    cell: GameCell,
    onReveal: () => void,
    onFlag: () => void,
};


const Cell = observer((props: Props) => {
    const { cell, onReveal, onFlag } = props;

    const handleLeftClick = useCallback((e: React.MouseEvent) => { e.preventDefault(); onReveal(); }, [onReveal]);
    const handleRightClick = useCallback((e: React.MouseEvent) => { e.preventDefault(); onFlag(); }, [onFlag]);

    let content = '';

    if (cell.isFlagged) content = '🚩';
    else if (!cell.isShown) content = '';
    else if (cell.isMine) content = '💣';
    else if (cell.surroundingMines === 0) content = '';
    else content = cell.surroundingMines.toString();

    return (
        <button type="button" onClick={handleLeftClick} onContextMenu={handleRightClick} style={{
            border: '1px solid #555',
            background: cell.isShown ? '#ccc' : '#666',
            color: colorMap[cell.surroundingMines] ?? 'black',
            fontWeight: 'bold',
            borderRadius: '0',
            width: '30px',
            height: '30px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 0,
            padding: 0,
        }}>
            {content}
        </button>
    );
});

export default Cell;
