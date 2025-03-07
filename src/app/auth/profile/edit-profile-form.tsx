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
import { Save } from "lucide-react";

type ProfileEditForm = {
  name: string | undefined;
  avatar: string | undefined;
};

export default function ProfileEditForm({ name, avatar }: ProfileEditForm) {
  const [userAvatar, setUserAvatar] = useState<string>(
    avatar ?? "/placeholder.svg",
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof profileSchema.update>>({
    resolver: zodResolver(profileSchema.update),
    defaultValues: {
      name: name ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof profileSchema.update>) {
    // Here you would typically send the data to your backend
    console.log("Form submitted", { ...values, avatar });
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

  const handleUploadAvatar = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("public", "true");

      const response = await fetch("/api/storage/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        return null;
      }

      const data = (await response.json()) as { message: string; url: string };
      return data;
    }
    return null;
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-semibold">Edit Profile</CardTitle>
        <CardDescription>Update your profile information below</CardDescription>
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
            <Button type="submit" className="w-full">
              <Save />
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
