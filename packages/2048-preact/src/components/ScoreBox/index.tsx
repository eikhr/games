import type { FunctionComponent } from 'preact';
import styles from './ScoreBox.module.css';

interface Props {
	label: string;
	score: string | number;
}

const ScoreBox: FunctionComponent<Props> = ({ label, score }) => {
	return (
		<div className={styles.container}>
			<div className={styles.label}>{label}</div>
			<div className={styles.score}>{score}</div>
		</div>
	);
};

export default ScoreBox;
