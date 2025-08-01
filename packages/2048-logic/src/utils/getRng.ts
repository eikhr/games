import { create, type RandomSeed } from 'random-seed';
import type { MutableGameState } from '../types.js';

const getRng = (gameState: MutableGameState): RandomSeed => {
	if (gameState.rngNumber) {
		gameState.rngNumber++;
		return create(String(gameState.rngNumber));
	} else {
		return create();
	}
};

export default getRng;
