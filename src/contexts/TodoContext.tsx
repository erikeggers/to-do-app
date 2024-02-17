"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { Todo } from "@/types/todo";

type State = {
	todos: Todo[];
	allTodos: Todo[];
	isLoading: boolean;
	completed: number;
	percent: number;
	filter: string;
	total: number;
};

type Action =
	| { type: "FETCH_TODOS"; payload: Todo[] }
	| { type: "SET_LOADING"; payload: boolean }
	| { type: "ADD_TODO"; payload: Todo }
	| { type: "EDIT_TODO"; payload: { id: string; text: string } }
	| { type: "DELETE_TODO"; payload: string }
	| { type: "TOGGLE_TODO"; payload: string }
	| { type: "FILTER_TODOS"; payload: string }

const TodoContext = createContext<{
	state: State;
	dispatch: React.Dispatch<Action>;
} | null>(null);

const todoReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "FETCH_TODOS":
			const total = action.payload.length;
			const completed = action.payload.filter(todo => todo.isDone).length;
			const percent = (completed / total) * 100;
			return {
				...state,
				todos: action.payload,
				allTodos: action.payload,
				total,
				completed,
				percent,
			};
		case "SET_LOADING":
			return { ...state, isLoading: action.payload };
		case "ADD_TODO":
			const newTodo = action.payload;
			const addCompleted = state.completed + (newTodo.isDone ? 1 : 0);
			const addPercent = ((state.completed) / (state.total + 1)) * 100;
			return {
				...state,
				todos: [newTodo, ...state.todos],
				allTodos: [newTodo, ...state.allTodos],
				total: state.total + 1,
				completed: addCompleted,
				percent: addPercent,
			};
		case "EDIT_TODO":
			const editedTodoId = action.payload.id;
			const editedText = action.payload.text;
			const updatedTodosAfterEdit = state.todos.map(todo =>
				todo._id === editedTodoId ? { ...todo, text: editedText } : todo
			);
			return {
				...state,
				todos: updatedTodosAfterEdit,
				allTodos: updatedTodosAfterEdit,
			};
		case "DELETE_TODO":
			const todoToDelete = state.todos.find(todo => todo._id === action.payload) as Todo;
			const deleteCompleted = state.completed - (todoToDelete.isDone ? 1 : 0);
			const deletePercent = ((state.completed - 1) / (state.total - 1)) * 100;
			return {
				...state,
				todos: state.todos.filter(todo => todo._id !== action.payload),
				allTodos: state.allTodos.filter(todo => todo._id !== action.payload),
				total: state.total - 1,
				completed: deleteCompleted,
				percent: deletePercent,
			};
		case "TOGGLE_TODO":
			const toggledTodoId = action.payload;
			const updatedTodos = state.todos.map(todo =>
				todo._id === toggledTodoId ? { ...todo, isDone: !todo.isDone } : todo
			);
			const toggleCompleted = updatedTodos.filter(todo => todo.isDone).length;
			const togglePercent = (toggleCompleted / state.total) * 100;
			return {
				...state,
				todos: updatedTodos,
				completed: toggleCompleted,
				percent: togglePercent,
			};
		case "FILTER_TODOS":
			let filteredTodos: Todo[] = [];
			if (action.payload === "all") {
				filteredTodos = state.allTodos;
			} else if (action.payload === "isDone") {
				filteredTodos = state.allTodos.filter(todo => todo.isDone);
			} else if (action.payload === "undone") {
				filteredTodos = state.allTodos.filter(todo => !todo.isDone);
			}
			return {
				...state,
				todos: filteredTodos,
			};
		default:
			return state;
	}
};

export const TodoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [state, dispatch] = useReducer(todoReducer, {
		todos: [],
		allTodos: [],
		isLoading: false,
		completed: 0,
		percent: 0,
		filter: "all",
		total: 0,
	});

	useEffect(() => {
		const fetchTodos = async () => {
			dispatch({ type: "SET_LOADING", payload: true });
			axios.get("https://nanameue-front-end-candidate-test.vercel.app/api/erike/todos")
				.then(response => {
					dispatch({ type: "FETCH_TODOS", payload: response.data });
				})
				.catch(error => {
					console.error(error);
				})
				.finally(() => {
					dispatch({ type: "SET_LOADING", payload: false });
				});
		};
		fetchTodos();
	}
	, []);

	return <TodoContext.Provider value={{ state, dispatch }}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
	const context = useContext(TodoContext);
	if (!context) {
		throw new Error("useTodo must be used within a TodoContextProvider");
	}
	return context;
};
