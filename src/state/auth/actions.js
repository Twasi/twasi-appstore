import types from './types';

const updateJwt = jwt => ({
  type: types.UPDATE_JWT,
  jwt
});

const updateUser = user => ({
  type: types.UPDATE_USER,
  user
});

const updateUserData = data => ({
  type: types.UPDATE_USER_DATA,
  data
});

const isLoading = loading => ({
  type: types.UPDATE_IS_LOADING,
  loading
});

const isAuthenticated = authenticated => ({
  type: types.UPDATE_IS_AUTHENTICATED,
  authenticated
});

const updateIsUserUpdating = isUserUpdating => ({
  type: types.UPDATE_IS_USER_UPDATING,
  isUserUpdating
});

const updateIsSetUp = isSetUp => ({
  type: types.UPDATE_IS_SET_UP,
  isSetUp
});

const updateActionSuccessAuth = isActionSuccessAuth => ({
  type: types.UPDATE_ACTIONSUCCESSAUTH,
  isActionSuccessAuth
});

export default {
  updateJwt,
  updateUser,
  isLoading,
  isAuthenticated,
  updateUserData,
  updateIsUserUpdating,
  updateIsSetUp,
  updateActionSuccessAuth
};
