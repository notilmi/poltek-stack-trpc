import { api } from "@/trpc/server";
import React, { Suspense } from "react";
import EditTodoForm from "./form";
import { redirect } from "next/navigation";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const todo = await api.todo.getById(id);

  if (!todo) redirect("/dashboard");

  return (
    <Suspense>
      <EditTodoForm {...todo} />
    </Suspense>
  );
}

export default Page;
