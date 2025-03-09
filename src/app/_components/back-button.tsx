"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function BackButton({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      variant="outline"
      className={className}
    >
      <ArrowLeft /> Back
    </Button>
  );
}

export default BackButton;
