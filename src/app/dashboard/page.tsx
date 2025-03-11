import { api, HydrateClient } from "@/trpc/server";
import React, { Suspense } from "react";
import TodoList from "./todo-list";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

async function DashboardPage() {
  void api.todo.getAll.prefetch();
  return (
    <HydrateClient>
      <div className="mx-auto max-w-screen-sm p-4 lg:p-8">
        <div className="flex flex-row items-center justify-between gap-2">
          <h1 className="text-2xl font-bold">TODO List 📔</h1>
          <Link href="/dashboard/new">
            <Button size="sm">
              <PlusCircle />
              Add
            </Button>
          </Link>
        </div>
        <Separator className="my-4" />
        <Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <TodoList />
          </ErrorBoundary>
        </Suspense>
      </div>
    </HydrateClient>
  );
}

export default DashboardPage;
