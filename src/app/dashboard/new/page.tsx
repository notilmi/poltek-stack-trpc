import React from "react";
import CreateTodoForm from "./form";
import BackButton from "@/app/_components/back-button";

function Page() {
  return (
    <div className="mx-auto max-w-screen-sm p-4">
      <BackButton className="mb-4" />
      <CreateTodoForm />
    </div>
  );
}

export default Page;
