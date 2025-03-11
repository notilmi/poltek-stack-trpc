"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { api } from "@/trpc/react";
import { type Todo } from "@prisma/client";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo } from "react";
import toast from "react-hot-toast";

function TodoCard({ title, completed, id }: Todo) {
  const router = useRouter();
  const pathname = usePathname();
  const { mutate: toggleMutate, isPending: toggleMutatePending } =
    api.todo.update.useMutation({
      onError: (err) => {
        toast.error(err.message);
      },
    });

  const { mutate: deleteMutate, isPending: deleteMutatePending } =
    api.todo.delete.useMutation({
      onSuccess: () => {
        router.refresh();
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  const updateQueryParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set("title", title);
    params.set("id", id.toString());
    return `/dashboard/new?${params.toString()}`;
  }, [title, id]);

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border p-2 text-lg">
      {title}
      <div className="flex items-center gap-2">
        <Checkbox
          defaultChecked={completed}
          disabled={toggleMutatePending}
          className="h-8 w-8 rounded-lg"
          onCheckedChange={(checked) =>
            toggleMutate({ id, completed: Boolean(checked) })
          }
        />
        <Link href={updateQueryParams}>
          <Button
            className="aspect-square h-8 w-8"
            disabled={deleteMutatePending}
          >
            <Edit2 />
          </Button>
        </Link>
        <Button
          variant="destructive"
          className="aspect-square h-8 w-8"
          disabled={deleteMutatePending}
          onClick={() => {
            deleteMutate(id);
          }}
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}

export default TodoCard;
