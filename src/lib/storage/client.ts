/**
 * Uploads File To The Backend
 *
 * @param file File to upload
 * @param isPublic File Visibility (Public: Accessible From All Users, Private: Accessible From Only The File Owner)
 * @returns Image URI
 */
export const handleUploadFile = async (
  file: File,
  isPublic: boolean,
  maxSize: number = 1024 * 1024 * 10,
): Promise<
  | { ok: boolean; message: string }
  | { ok: boolean; message: string; url: string }
> => {
  // const file = fileInputRef.current?.files?.[0];
  if (file) {
    if (file.size > maxSize) {
      return {
        ok: false,
        message: "File size exceeds the maximum limit.",
      };
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("public", isPublic.toString());

    const response = await fetch("/api/storage/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      return {
        ok: false,
        message: "Failed to upload file.",
      };
    }

    const data = (await response.json()) as { message: string; url: string };
    return {
      ok: true,
      message: data.message,
      url: data.url,
    };
  }
  return {
    ok: false,
    message: "No file selected.",
  };
};
