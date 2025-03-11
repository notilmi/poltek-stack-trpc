"use client";
import { api } from "@/trpc/react";
import React from "react";
import TodoCard from "./_components/todo-card";

function TodoList() {
  const [todos] = api.todo.getAll.useSuspenseQuery();
  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo, idx) => (
        <TodoCard key={idx} {...todo} />
      ))}
    </div>
  );
}

export default TodoList;
