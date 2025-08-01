import { Direction } from '2048-logic';

const getKeyEvtDirection = (e: KeyboardEvent): Direction | null => {
	switch (e.key) {
		case 'ArrowUp':
		case 'w': {
			return Direction.UP;
		}
		case 'ArrowDown':
		case 's': {
			return Direction.DOWN;
		}
		case 'ArrowLeft':
		case 'a': {
			return Direction.LEFT;
		}
		case 'ArrowRight':
		case 'd': {
			return Direction.RIGHT;
		}
		default: {
			return null;
		}
	}
};

export default getKeyEvtDirection;
