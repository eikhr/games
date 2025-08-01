export interface BoardMeta {
	cols: number;
	rows: number;
}

export interface Position {
	row: number;
	col: number;
}

export interface BaseTileData {
	id?: number;
	value: number;
	position: Position;
	ghost?: boolean;
	previousValue?: number;
	previousPosition?: Position;
}

interface NewTileData extends BaseTileData {
	ghost: false;
}

interface MovedTileData extends BaseTileData {
	ghost: false;
	previousValue: number;
	previousPosition: Position;
}

interface GhostTileData extends BaseTileData {
	ghost: true;
	previousPosition: Position;
}

export type TileData = (NewTileData | MovedTileData | GhostTileData) & {
	id: number;
};
