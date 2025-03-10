"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";

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
import { todoValidators } from "@/server/api/routers/todo/validator";
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
import { PlusCircle } from "lucide-react";
import BackButton from "@/app/_components/back-button";
import { useRouter } from "next/navigation";
import { type Todos } from "@prisma/client";

export default function EditTodoForm(todo: Todos) {
  const form = useForm<z.infer<typeof todoValidators.create>>({
    resolver: zodResolver(todoValidators.create),
    defaultValues: {
      title: todo.title,
    },
  });

  const router = useRouter();
  const utils = api.useUtils();

  const { mutate: todoMutate, isPending: todoMutationPending } =
    api.todo.update.useMutation({
      onSuccess: async () => {
        toast.success("Todo Updated successfully");
        form.reset();
        await utils.todo.getAll.invalidate();
        router.refresh();
        router.push("/dashboard");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const onSubmit = (values: z.infer<typeof todoValidators.create>) => {
    todoMutate({
      id: todo.id,
      completed: todo?.completed ?? false,
      title: values.title,
    });
  };

  return (
    <div
      aria-label="container"
      className="mx-auto flex h-screen max-w-screen-sm items-center justify-center p-4"
    >
      <div>
        <BackButton className="mb-4" />
        <Card>
          <CardHeader>
            <CardTitle>Edit Todo</CardTitle>
            <CardDescription>
              Create Your Todo List, By Filling Out Form Below
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
                        <Input
                          placeholder="Memasak Argumen Pemerintah"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button disabled={todoMutationPending} type="submit">
                  <PlusCircle />
                  Submit
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
