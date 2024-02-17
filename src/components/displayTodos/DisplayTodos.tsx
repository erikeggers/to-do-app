'use client';

import React from "react";
import { useTodo } from "../../contexts/TodoContext";
import { Todo } from "@/types/todo";
import TodoItem from "../todoItem/TodoItem";

export default function DisplayTodos() {
	const { state } = useTodo();

	return (
		<div>
			{state.todos.map((todo: Todo) => (
				<TodoItem 
					key={todo._id} 
					todo={todo} 
				/>
			))}
		</div>
	);
}