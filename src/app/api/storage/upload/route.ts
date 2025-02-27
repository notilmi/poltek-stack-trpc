import { auth } from "@/auth";
import { s3, s3Bucket } from "@/lib/storage/s3";
import { type NextRequestWithAuth } from "@/types";
import {
  PutObjectCommand,
  type PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export const POST = auth(async (request: NextRequestWithAuth) => {
  try {
    if (!request.auth) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { user } = request.auth;

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file =
      formData.get("file") instanceof File
        ? (formData.get("file") as File)
        : null;
    const privacy: string = (formData.get("privacy") as string) || "public";

    if (["public", "private"].includes(privacy)) {
      return NextResponse.json(
        { message: "Invalid privacy rule" },
        { status: 400 },
      );
    }

    if (!file) {
      return NextResponse.json({ message: "No file found" }, { status: 400 });
    }

    const input = {
      Bucket: s3Bucket,
      Key: `${user.id}/${file.name}`,
      Body: file,
      Metadata: {
        privacy,
        owner: user.id!,
      },
    } satisfies PutObjectCommandInput;

    const command = new PutObjectCommand(input);
    const response = await s3.send(command);

    if (!response) {
      return NextResponse.json(
        { message: "Failed to upload file" },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "File uploaded" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to upload file" },
      { status: 500 },
    );
  }
});
