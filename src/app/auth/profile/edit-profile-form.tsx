"use client";

import type React from "react";

import { useState, useRef } from "react";
import Image from "next/image";
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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import profileSchema from "@/server/api/routers/profile/validator";
import { Forward, Save } from "lucide-react";
import { handleUploadFile } from "@/lib/storage/client";
import toast from "react-hot-toast";
import { api } from "@/trpc/react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";

type ProfileEditForm = {
  name: string | undefined;
  avatar: string | undefined;
};

export function ProfileEditFormSkeleton() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-semibold">
          <Skeleton className="mx-auto h-6 w-[200px]" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="mx-auto h-4 w-[250px]" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="grid gap-2">
          <FormItem>
            <FormLabel>
              <Skeleton className="h-4 w-24" />
            </FormLabel>
            <FormControl>
              <Skeleton className="h-10 w-full" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}

export function ProfileEditForm({ name, avatar }: ProfileEditForm) {
  const [userAvatar, setUserAvatar] = useState<string>(
    avatar ?? "/placeholder.svg",
  );

  const searchParams = useSearchParams();
  const router = useRouter();

  const isNew = searchParams.get("new");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isPending: profileMutationPending, mutate: profileMutate } =
    api.profile.update.useMutation({
      onSuccess: () => {
        toast.success("Profile updated successfully");
        if (isNew) router.push("/dashboard");
      },
      onError: () => {
        toast.error("Failed to update profile");
      },
    });

  const form = useForm<z.infer<typeof profileSchema.update>>({
    resolver: zodResolver(profileSchema.update),
    defaultValues: {
      name: name ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof profileSchema.update>) {
    const file = fileInputRef.current?.files?.[0];

    if (file) {
      const response = await handleUploadFile(file, true, 1024 * 1024 * 5);

      if ("url" in response) {
        values.image = response.url;
      } else {
        return toast.error(response.message);
      }
    }

    profileMutate(values);
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-semibold">
          {isNew ? "Finish Your Profile" : "Edit Profile"}
        </CardTitle>
        <CardDescription>
          {isNew ? "Finish" : "Update"} your profile information below
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div
                className="relative h-24 w-24 cursor-pointer overflow-hidden rounded-full transition-opacity hover:opacity-80"
                onClick={handleAvatarClick}
              >
                <Image
                  fill
                  src={userAvatar}
                  alt="Avatar"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAvatarClick}
              >
                Change Photo
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={profileMutationPending}
            >
              {isNew ? <Forward /> : <Save />}
              {isNew ? "Finish Profile" : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
