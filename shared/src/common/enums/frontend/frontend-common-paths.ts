export const commonFrontendPaths = {
  auth: {
    RESET_PASSWORD_CONFIRM: {
      path: '/reset-password-confirm',
      queryParamNames: {
        token: 'token',
      },
    },
    ACCOUNT_VERIFICATION_CONFIRM: {
      path: '/account-verify-confirm',
      queryParamNames: {
        token: 'token',
      },
    },
  },
} as const;
