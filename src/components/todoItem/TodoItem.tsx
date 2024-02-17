'use client';

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTodo } from "../../contexts/TodoContext";
import { Todo } from "@/types/todo";
import { deleteTodo, toggleTodo, editTodo } from "@/api/todoApi";
import styles from "./TodoItem.module.css";

const TodoItem = ({ todo }: { todo: Todo }) => {
	const { state, dispatch } = useTodo();

	// Close the menu when clicking outside of it
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Display an alert to confirm the deletion of a todo item.
	// If it is confirmed, deleted it.
	const handleDeleteTodo = async (id: string) => {
		const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
		if (confirmDelete) {
			setMenuOpen(false);
			await deleteTodo(id);
			dispatch({ type: "DELETE_TODO", payload: id });
		} else {
			return;
		}
	}

	const handleToggleTodo = async (id: string) => {
		await toggleTodo(id);
		dispatch({ type: "TOGGLE_TODO", payload: id });
	}

	const handleEditTodo = (id: string, text: string) => {
		editTodo(id, text);
		dispatch({ type: "EDIT_TODO", payload: { id, text } });
	}

 const [isEditing, setIsEditing] = useState(false);
 const [text, setText] = useState(todo.text);
 const [menuOpen, setMenuOpen] = useState(false);
 const inputRef = useRef<HTMLInputElement>(null);
 const menuRef = useRef<HTMLDivElement>(null);

	return (
		<div className={styles.todoItemWrapper}>
			<input
				type="checkbox"
				checked={todo.isDone}
				onChange={() => handleToggleTodo(todo._id)}
			/>
			{
				isEditing ? (
					<input
						ref={inputRef}
						type="text"
						className={styles.editInput}
						value={text}
						onChange={(e) => setText(e.target.value)}
						onBlur={() => {
							setIsEditing(false);
							setText(todo.text);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								setIsEditing(false);
								handleEditTodo(todo._id, text);
							}
							if (e.key === "Escape") {
								setIsEditing(false);
								setText(todo.text);
							}
						}}
					/>
				) : (
					<span
						className={todo.isDone ? styles.todoItemTextComplete : styles.todoItemText}
						onClick={() => {
							setIsEditing(true);
							setTimeout(() => inputRef.current?.focus(), 0);
						}}
					>
						{todo.text}
					</span>
				)
			}		
				<div className={styles.menu} ref={menuRef}>
					<Image
						src="/menu.svg"
						alt="menu"
						className={styles.menuIcon}
						onClick={() => setMenuOpen(!menuOpen)}
						width={24}
						height={24}
					/>
					{menuOpen && (
						<div className={styles.menuDropdown}>
							<p onClick={() => handleDeleteTodo(todo._id)}>Delete</p>
						</div>
					)}
				</div>
		</div>
	);
}

export default TodoItem;