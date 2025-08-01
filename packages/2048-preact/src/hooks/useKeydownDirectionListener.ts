import type { Direction } from '2048-logic';
import { useMemo } from 'preact/hooks';
import getKeyEvtDirection from '../utils/getKeyEvtDirection.js';
import useKeydownListener from './useKeydownListener.js';

interface Options {
	preventDefault?: boolean;
}

const useKeydownDirectionListener = (
	handler: (direction: Direction) => void,
	options: Options = {},
) => {
	const { preventDefault = true } = options;

	const keydownHandler = useMemo(() => {
		return (e: KeyboardEvent) => {
			preventDefault && e.preventDefault();
			const direction = getKeyEvtDirection(e);
			direction !== null && handler(direction);
		};
	}, [handler, preventDefault]);

	useKeydownListener(keydownHandler);
};

export default useKeydownDirectionListener;
