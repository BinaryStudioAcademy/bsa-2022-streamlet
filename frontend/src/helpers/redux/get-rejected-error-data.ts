import { SerializedError } from '@reduxjs/toolkit';
import { SerializedHttpError } from 'helpers/http/http';

type RejectedErrorData = {
  message?: string;
  errorCode?: string;
};

// in some cases you will want to reject with SerializedHttpError (and hence errorCode) using rejectWithValue
// but only if the error is HttpError
// otherwise just throw
// so in reducer, you will have either error of type SerializedError or payload of type SerializedHttpError
// this helper will return the data, taking into account that either of them might be undefined
export const getRejectedErrorData = (
  error: SerializedError,
  rejectedPayload: SerializedHttpError | undefined,
): RejectedErrorData => {
  return {
    errorCode: rejectedPayload?.errorCode,
    message: rejectedPayload?.message || error.message,
  };
};
