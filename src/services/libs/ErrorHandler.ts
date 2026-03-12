export function handleApiError(error: any): never {
  if (error.response) {
    const customError = new Error(
      error.response.data?.message ?? "Error del servidor",
    ) as any;
    customError.status = error.response.status;
    customError.statusCode = error.response.status;
    customError.originalMessage = error.response.data?.message;

    if (
      error.response.status === 429 ||
      error.response.data?.message?.includes("Too Many Requests")
    ) {
      customError.isRateLimited = true;
    }
    throw customError;
  }

  if (error.request) {
    const networkError = new Error(
      "No se recibió respuesta del servidor",
    ) as any;
    networkError.isNetworkError = true;
    throw networkError;
  }

  const configError = new Error(
    "Error inesperado al preparar la petición",
  ) as any;
  if (
    error.message?.includes("Too Many Requests") ||
    error.message?.includes("429") ||
    error.message?.includes("ThrottlerException")
  ) {
    configError.isRateLimited = true;
    configError.originalMessage = error.message;
  }
  throw configError;
}
