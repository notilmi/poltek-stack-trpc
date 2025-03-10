import { auth } from "@/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { connection } from "next/server";
import TodoCard from "./_components/todo-card";

async function DashboardPage() {
  await connection();
  const session = await auth();

  if (!session) redirect("/auth");

  const todos = await api.todo.getAll();

  return (
    <div
      aria-label="container"
      className="mx-auto min-h-screen max-w-screen-sm p-4"
    >
      <div className="rounded-lg border p-4">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h1 className="text-2xl font-bold">🗒️ Sticky Wall Todo</h1>
          <Link href="/dashboard/new">
            <Button>
              <PlusCircle />
              Tambah
            </Button>
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          {todos.map((todo, idx) => (
            <TodoCard {...todo} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
