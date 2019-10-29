import types from './types';

const updateCommands = commands => ({
  type: types.UPDATE_COMMANDS,
  commands
});

const updatePagination = pagination => ({
  type: types.UPDATE_PAGINATION,
  pagination
});

const updatePluginCommands = pluginCommands => ({
  type: types.UPDATE_PLUGINCOMMANDS,
  pluginCommands
});

const updateAccessLevels = accessLevels => ({
  type: types.UPDATE_ACCESSLEVELS,
  accessLevels
});

const updateSingleCommand = (id) => ({
  type: types.UPDATE_SINGLECOMMAND,
  id
});

const updateAddCommand = (name, content, cooldown) => ({
  type: types.UPDATE_ADDCOMMAND,
  name,
  content,
  cooldown
});

const updateEditCommand = (id, name, content, cooldown, uses) => ({
  type: types.UPDATE_EDITCOMMAND,
  id,
  name,
  content,
  cooldown,
  uses
});

const updateDelCommand = (id) => ({
  type: types.UPDATE_DELCOMMAND,
  id
});

const updateDisabled = isDisabled => ({
  type: types.UPDATE_DISABLED,
  isDisabled
});

const updateLoading = isLoading => ({
  type: types.UPDATE_LOADING,
  isLoading
});

const updateLoaded = isLoaded => ({
  type: types.UPDATE_LOADED,
  isLoaded
});

const updateActionSuccess = isActionSuccess => ({
  type: types.UPDATE_ACTIONSUCCESS,
  isActionSuccess
});

export default {
  updateAccessLevels,
  updateCommands,
  updatePagination,
  updatePluginCommands,
  updateSingleCommand,
  updateAddCommand,
  updateEditCommand,
  updateDelCommand,
  updateDisabled,
  updateLoading,
  updateLoaded,
  updateActionSuccess
};
