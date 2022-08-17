import express from 'express';
import { UserBaseResponseDto } from '../types';

export type ExtendedRequest = express.Request & {
  user?: UserBaseResponseDto;
};

export type ExtendedAuthenticatedRequest = express.Request & {
  user: UserBaseResponseDto;
};
