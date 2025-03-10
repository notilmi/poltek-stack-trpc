"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import type { Todos } from "@prisma/client";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function TodoCard(todo: Todos) {
  const router = useRouter();
  const { mutate: updateTodoMutation, isPending: updateTodoMutationPending } =
    api.todo.update.useMutation({
      onSuccess: () => {
        router.refresh();
      },
    });

  const { mutate: deleteTodoMutation, isPending: deleteTodoMutationPending } =
    api.todo.delete.useMutation({
      onSuccess: () => {
        router.refresh();
      },
    });

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border p-4">
      <p className={cn("text-xl", todo.completed && "line-through")}>
        {todo.title}
      </p>
      <div className="flex items-center gap-2">
        <Checkbox
          disabled={updateTodoMutationPending || deleteTodoMutationPending}
          defaultChecked={todo.completed}
          onCheckedChange={(checked) => {
            console.log(checked);
            updateTodoMutation({
              id: todo.id,
              completed: Boolean(checked),
              title: todo.title,
            });
          }}
          className="h-8 w-8"
        />
        <Link href={`/dashboard/edit/${todo.id}`}>
          <Button
            size="icon"
            className="h-8 w-8 bg-blue-500 hover:bg-blue-600"
            disabled={deleteTodoMutationPending || updateTodoMutationPending}
            onClick={() => {
              deleteTodoMutation({ id: todo.id });
            }}
          >
            <Edit2 />
          </Button>
        </Link>
        <Button
          variant="destructive"
          size="icon"
          className="h-8 w-8"
          disabled={deleteTodoMutationPending || updateTodoMutationPending}
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}

export default TodoCard;
