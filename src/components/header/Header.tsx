import React from 'react';
import TodoFilter from '../todoFilter/TodoFilter';
import styles from './Header.module.css';

const Header = () => {
	return (
		<div className={styles.headerWrapper}>
			<h1>To-dos</h1>
			<TodoFilter />
		</div>
	);
};

export default Header;