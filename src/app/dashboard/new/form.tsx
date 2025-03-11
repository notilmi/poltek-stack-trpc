"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import todoValidator from "@/server/api/routers/todo/validator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function CreateTodoForm() {
  const utils = api.useUtils();
  const searchParams = useSearchParams();

  const [todoId] = useState(searchParams.get("id"));
  const isEditing = useMemo(() => {
    if (todoId && searchParams.get("title")) return true;
    return false;
  }, [todoId, searchParams]);

  const { isPending: createTodoPending, mutate: createTodo } =
    api.todo.create.useMutation({
      onSuccess: async () => {
        toast.success("Todo created successfully");
        await utils.todo.getAll.invalidate();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const { isPending: updateTodoPending, mutate: updateTodo } =
    api.todo.update.useMutation({
      onSuccess: async () => {
        toast.success("Todo updated successfully");
        await utils.todo.getAll.invalidate();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const form = useForm<z.infer<typeof todoValidator.create>>({
    resolver: zodResolver(todoValidator.create),
    defaultValues: {
      title: searchParams.get("title") ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof todoValidator.create>) => {
    if (isEditing && todoId) {
      updateTodo({
        id: todoId,
        ...values,
      });
    } else {
      createTodo(values);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Todo" : "Create Todo"}</CardTitle>
        <CardDescription>
          Fill out the form below to {isEditing ? "edit" : "create"} a new todo.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <CardContent>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Wash Your Car" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button disabled={createTodo || updateTodoPending} type="submit">
              Create
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
