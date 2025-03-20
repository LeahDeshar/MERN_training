export class APIError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = "APIError";
  }
}

export function handleAPIError(error: any) {
  if (error instanceof APIError) {
    return Response.json(
      { error: error.message },
      { status: error.statusCode }
    );
  }
  return Response.json({ error: "Internal Server Error" }, { status: 500 });
}
