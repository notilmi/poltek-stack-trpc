import { auth } from "@/auth";
import { s3, s3Bucket } from "@/lib/storage/s3";
import {
  PutObjectCommand,
  type PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { type NextRequest, NextResponse } from "next/server";
import { HTTPException } from "../../_errors";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) throw new HTTPException("Unauthorized", 401);
    const { user } = session;

    const formData = await request.formData();

    const file =
      formData.get("file") instanceof File
        ? (formData.get("file") as File)
        : null;
    const isPublic: string = (formData.get("public") as string) ?? "true";

    const parsedPublic = isPublic === "true" ? true : false;

    if (!file) throw new HTTPException("BAD REQUEST", 400);

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const objectKey = `${user.id}/${file.name}`;

    const input = {
      Bucket: s3Bucket,
      Key: `${user.id}/${file.name}`,
      Body: fileBuffer,
      ContentType: file.type,
      Metadata: {
        public: parsedPublic.toString(),
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

    return NextResponse.json(
      { message: "File uploaded", url: `/api/storage/view/${objectKey}` },
      { status: 200 },
    );
  } catch (error) {
    console.error(`[❌ Storage ERROR: POST /api/storage/upload`, error);

    if (error instanceof HTTPException) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: error.status,
        },
      );
    }

    return NextResponse.json(
      { message: "Failed to upload file" },
      { status: 500 },
    );
  }
}
