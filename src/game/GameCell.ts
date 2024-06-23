import { makeAutoObservable } from "mobx";

export default class GameCell {
    constructor(
        private _surroundingMines: number,
        private _isMine: boolean,
        private _isFlagged: boolean,
        private _isShown: boolean,
    ) {
        makeAutoObservable(this);
    }

    show(): void {
        this._isShown = true;
    }

    get isShown(): boolean {
        return this._isShown;
    }

    toggleFlag(): void {
        this._isFlagged = !this._isFlagged;
    }

    get isFlagged(): boolean {
        return this._isFlagged;
    }

    makeMine(): void {
        this._isMine = true;
    }

    get isMine(): boolean {
        return this._isMine;
    }

    incrementSurroundingMines(): void {
        this._surroundingMines++;
    }

    get surroundingMines(): number {
        return this._surroundingMines;
    }
}