import { SerializedError } from '@reduxjs/toolkit';
import { HttpError } from 'exceptions/exceptions';

export type SerializedHttpError = SerializedError & {
  status: number;
  errorCode?: string;
};
export const serializeHttpError = (error: HttpError): SerializedHttpError => {
  return { message: error.message, status: error.status, errorCode: error.errorCode, name: error.name };
};
