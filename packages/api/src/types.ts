export type AuthedRequestBody<T> = T & {
  userId: string;
};
