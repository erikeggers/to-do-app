import React from 'react';
import { useTodo } from '../../contexts/TodoContext';
import { newTodo } from '../../api/todoApi';
import styles from './NewTodoForm.module.css';

const NewTodoForm = () => {
	const { dispatch } = useTodo();
	const [text, setText] = React.useState('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		newTodo(text)
			.then((todo) => {
				dispatch({ type: 'ADD_TODO', payload: todo });
				setText('');
			})
			.catch((error) => {
				if (error) {
					alert('You have reached the maximum number of to-dos');
				}
			});
		setText('');
	};

	return (
		<form onSubmit={handleSubmit} className={styles.newTodoForm}>
			<input
				type='text'
				className={styles.newTodoInput}
				placeholder='Add your to-do...'
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<button 
				type='submit'
				className={styles.addTodoButton}
			>
				Add
			</button>
		</form>
	);
}

export default NewTodoForm;