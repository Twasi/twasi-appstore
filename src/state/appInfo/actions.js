import types from './types';

const updateLoaded = isLoaded => ({
  type: types.UPDATE_LOADED,
  isLoaded
});

const updateConnected = isConnected => ({
  type: types.UPDATE_CONNECTED,
  isConnected
});

const updateVersion = version => ({
  type: types.UPDATE_SERVERVERSION,
  version
});

const updateUserStatus = userStatus => ({
  type: types.UPDATE_USER_STATUS,
  userStatus
});

const updateTheme = theme => ({
  type: types.UPDATE_THEME,
  theme
});

export default {
  updateLoaded,
  updateConnected,
  updateVersion,
  updateUserStatus,
  updateTheme
};
