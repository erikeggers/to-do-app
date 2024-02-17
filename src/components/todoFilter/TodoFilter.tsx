import React, { useState } from 'react';
import { useTodo } from '../../contexts/TodoContext';
import styles from './TodoFilter.module.css';

const TodoFilter = () => {
	const { dispatch } = useTodo();
	const [filter, setFilter] = useState('All');
	const [showDropdown, setShowDropdown] = useState(false);

	const handleFilter = (filter: string) => {
		dispatch({ type: "FILTER_TODOS", payload: filter });
	}

	const filterSvg = (
		<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M9.50423 5.4209L6.99998 7.92515L4.49573 5.4209L3.6709 6.24573L6.99998 9.57482L10.3291 6.24573L9.50423 5.4209Z" fill="black"/>
		</svg>
	);

	return (
		<div className={styles.filterWrapper}>
			<div 
				className={styles.filterSelect}
				onClick={() => setShowDropdown(!showDropdown)}
			>
				{filter}
				{filterSvg}
				{showDropdown && (
					<div className={styles.filterDropdown}>
						<p
							className={filter === 'All' ? styles.filterOptionActive : ''}
							onClick={() => {
								handleFilter('all');
								setFilter('All');
								setShowDropdown(false);
							}}
						>
							All
						</p>
						<p
							className={filter === 'Done' ? styles.filterOptionActive : ''}
							onClick={() => {
								handleFilter('isDone');
								setFilter('Done');
								setShowDropdown(false);
							}}
						>
							Done
						</p>
						<p
							className={filter === 'Undone' ? styles.filterOptionActive : ''}
							onClick={() => {
								handleFilter('undone');
								setFilter('Undone');
								setShowDropdown(false);
							}}
						>
							Undone
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default TodoFilter;