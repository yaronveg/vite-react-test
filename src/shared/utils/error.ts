export const getErrorMessage = (error: unknown) => {
  return error instanceof ErrorEvent ? error.message : String(error);
};
