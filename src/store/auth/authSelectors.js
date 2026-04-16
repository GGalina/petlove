export const selectUser = state => state.auth.user;

export const selectToken = state => state.auth.token;

export const selectIsLoading = state => state.auth.isLoading;

export const selectError = state => state.auth.error;

export const selectIsLoggedIn = state =>
  Boolean(state.auth.token);