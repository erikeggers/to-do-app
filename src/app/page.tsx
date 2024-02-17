'use client';
import styles from "./page.module.css";
import { useTodo } from "@/contexts/TodoContext";
import DisplayTodos from "@/components/displayTodos/DisplayTodos";
import TodoProgress from "@/components/todoProgress/TodoProgress";
import NewTodoForm from "@/components/newTodoForm/NewTodoForm";
import Header from "@/components/header/Header";

export default function Home() {
  const { state } = useTodo();
  const { isLoading } = state;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <TodoProgress />
        <Header />
        <NewTodoForm />
        {isLoading ? <p className={styles.loading}>Loading...</p> : <DisplayTodos />}
      </div>
    </main>
  );
}
