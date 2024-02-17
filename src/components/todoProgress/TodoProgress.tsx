import React from 'react';
import { useTodo } from '../../contexts/TodoContext';
import styles from './TodoProgress.module.css';

const TodoProgress = () => {
	const { state } = useTodo();
	const { completed, percent } = state;
	return (
		<div className={styles.progressWrapper}>
			<h2>Progress</h2>
			<div className={styles.progressBarOutter}>
				<div
					className={styles.progressBarInner}
					style={{ width: `${percent}%` }}
				></div>
				</div>
				<p className={styles.completedText}>
					{`${completed} completed`}
				</p>
		</div>
	);
}

export default TodoProgress;