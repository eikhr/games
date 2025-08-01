import type { Board } from '2048-logic';
import type { FunctionComponent } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import createBoard from '../board-renderer/createBoard.js';

interface Props {
	boardState: Board;
}

const BoardComponent: FunctionComponent<Props> = ({ boardState }) => {
	const elementRef = useRef<HTMLDivElement>(null);
	const board = useRef(createBoard(boardState));

	useEffect(() => {
		const divElement = elementRef.current;
		const boardElement = board.current.htmlElement;
		divElement?.appendChild(boardElement);
		return () => {
			divElement?.removeChild(boardElement);
		};
	}, []);

	useEffect(() => {
		board.current?.update(boardState);
	}, [boardState]);

	return <div ref={elementRef} />;
};

export default BoardComponent;
