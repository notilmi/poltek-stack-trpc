import { HTTPException } from "@/app/api/_errors";
import { auth } from "@/auth";
import { s3, s3Bucket } from "@/lib/storage/s3";
import {
  GetObjectCommand,
  type GetObjectCommandInput,
} from "@aws-sdk/client-s3";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Label
 * - Private: Only Same User (Owner) Can View
 * - Public: Anyone Can View
 */
export async function GET(request: NextRequest) {
  const url = request.url;
  const s3Key = url.split("/").slice(6).join("/");
  try {
    if (!s3Key) throw new HTTPException("Not Found", 404);
    const session = await auth();
    if (!session?.user) throw new HTTPException("Unauthorized", 401);

    const { user } = session;

    const s3input = {
      Bucket: s3Bucket,
      Key: s3Key,
    } satisfies GetObjectCommandInput;

    const response = await s3.send(new GetObjectCommand(s3input));
    const { Body } = response;

    if (!Body) throw new HTTPException("Not Found", 404);

    const contentType = response.ContentType;
    type ObjectMetadata = { owner: string; public: string };
    const metadata: ObjectMetadata = response.Metadata as ObjectMetadata;

    if (metadata.owner !== user.id) {
      if (metadata.public !== "true") {
        throw new HTTPException("Forbidden", 403);
      }
    }
    return new NextResponse(Body as BodyInit, {
      headers: contentType
        ? {
            "Content-Type": contentType,
          }
        : {},
    });
  } catch (error) {
    console.error(`[❌ Storage ERROR: GET /api/storage/view/${s3Key}`, error);

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
      {
        message: "INTERNAL SERVER ERROR",
      },
      {
        status: 500,
      },
    );
  }
}
