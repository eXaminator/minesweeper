import { makeAutoObservable } from "mobx";
import GameCell from "./GameCell";

export default class Game {
    private _cells: GameCell[] = [];
    private _isGameOver = false;
    private _mineCount = 0;
    private _time = 0;
    private _timer: number | undefined;
    private _isGameWon = false;

    constructor(private _size: number) {
        makeAutoObservable(this);
        this.start();
    }

    private placeMine(index: number) {
        if (!this._cells[index]) return;

        this._cells[index].placeMine();
        this.findSurroundingCells(this._cells[index]).forEach(cell => cell.incrementSurroundingMines());
    }

    private removeMine(index: number) {
        if (!this._cells[index]) return;

        this._cells[index].removeMine();
        this.findSurroundingCells(this._cells[index]).forEach(cell => cell.decrementSurroundingMines());
    }

    private placeMines(): void {
        if (!this._cells.length) return;

        const mineSpots = new Set<number>();
        while (mineSpots.size < this.mineCount) {
            mineSpots.add(Math.floor(Math.random() * this._cells.length));
        }

        for (const spot of mineSpots) {
            this.placeMine(spot);
        }
    }

    private findSurroundingCells(cell: GameCell): GameCell[] {
        const index = this._cells.indexOf(cell);
        const x = index % this._size;
        const y = Math.floor(index / this._size);
        const cells = [];

        for (let i = y - 1; i <= y + 1; i++) {
            for (let j = x - 1; j <= x + 1; j++) {
                const cell = this.getCellByPosition(j, i);
                if (cell) {
                    cells.push(cell);
                }
            }
        }

        return cells;
    }

    private getCellByPosition(x: number, y: number): GameCell | null {
        if (y < 0 || y >= this._size || x < 0 || x >= this._size) {
            return null;
        }

        return this._cells[y * this._size + x];
    }

    private resetState() {
        this._isGameOver = false;
        this._isGameWon = false;
        this._time = 0;
        this._timer = undefined;
        this._cells = [];
    }

    reveal(cell: GameCell): void {
        if (!this._timer) {
            // First reveal!
            if (cell.isMine) {
                // Move mine to first available position.
                this.placeMine(this.cells.findIndex(cell => !cell.isMine));
                this.removeMine(this._cells.indexOf(cell));
            }

            this.startTimer();
        }

        if (cell.isShown || cell.isFlagged || this.isGameOver) {
            return;
        }

        cell.show();

        if (cell.isMine) {
            this.gameOver();
            return;
        }

        if (cell.surroundingMines === 0) {
            const surroundings = this.findSurroundingCells(cell);
            surroundings.forEach(neigbour => this.reveal(neigbour));
        }

        if (this._cells.filter(cell => !cell.isMine).every(cell => cell.isShown)) {
            this._isGameWon = true;
            this.stopTimer();
        }
    }

    toggleFlag(cell: GameCell): void {
        cell.toggleFlag();
    }

    start(size = this._size): void {
        this.resetState();
        this._size = size;
        this._mineCount = Math.round((size ** 2) * 0.156);

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                this._cells.push(new GameCell(0, false, false, false));
            }
        }

        this.placeMines();
    }

    gameOver() {
        this._isGameOver = true;
        this.stopTimer();
    }

    get isGameOver(): boolean {
        return this._isGameOver;
    }

    get cells(): GameCell[] {
        return this._cells;
    }

    get mineCount(): number {
        return this._mineCount;
    }

    get isGameWon(): boolean {
        return this._isGameWon;
    }

    startTimer(): void {
        this.stopTimer();
        this._timer = setInterval(() => this._time += 1, 1000);
    }

    stopTimer(): void {
        clearInterval(this._timer);
    }

    get time(): number {
        return this._time;
    }

    get size(): number {
        return this._size;
    }
}
