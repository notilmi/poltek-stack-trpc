export class HTTPException extends Error {
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
  status: number;
}
