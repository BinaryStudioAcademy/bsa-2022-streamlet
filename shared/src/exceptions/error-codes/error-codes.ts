export const errorCodes = {
  auth: {
    signIn: {
      UNVERIFIED: 'AUTH_SIGN_IN_UNVERIFIED',
    },
    restorePassword: {
      INCORRECT_TOKEN: 'AUTH_RESTORE_PASS_INCORRECT_TOKEN',
    },
  },
} as const;
