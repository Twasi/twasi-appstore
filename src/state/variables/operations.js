import actions from './actions';
import selectors from './selectors';

import { getGraph } from '../../services/graphqlService';

const {
  updateVariables,
  updateAddVariable,
  updateEditVariable,
  updateRemoveVariable,
  updateDisabled,
  updateLoading,
  updateActionSuccess
} = actions;

const loadVariables = () => dispatch => {
  dispatch(updateLoading(true));
  dispatch(getGraph('allVariables{id,name,output}', 'customvariables')).then(data => {
    if (data == null) {
      dispatch(updateDisabled(true));
      return;
    }
    dispatch(updateVariables(data.allVariables));
    dispatch(updateLoading(false));
  });
};

const addVariable = (name, output) => dispatch => {
    dispatch(updateActionSuccess(false));
    dispatch(getGraph(`addVariable(name: ${JSON.stringify(name)}, output: ${JSON.stringify(output)})`, 'customvariables')).then(
    data => {
      dispatch(updateAddVariable(data.customvariables));
      dispatch(updateActionSuccess(true));
    }).finally(() => {
      dispatch(updateActionSuccess(false));
    });
};

const editVariable = (id, name, output) => dispatch => {
    dispatch(updateActionSuccess(false));
    dispatch(getGraph(`editVariable(id: "${id}", name: ${JSON.stringify(name)}, output: ${JSON.stringify(output)})`, 'customvariables')).then(
    data => {
      dispatch(updateEditVariable(data.customvariables));
      dispatch(updateActionSuccess(true));
    }).finally(() => {
      dispatch(updateActionSuccess(false));
    });
};

const removeVariable = (id) => dispatch => {
    dispatch(updateActionSuccess(false));
    dispatch(getGraph(`removeVariable(id: "${id}")`, 'customvariables')).then(
    data => {
      dispatch(updateRemoveVariable(data.customvariables));
      dispatch(updateActionSuccess(true));
    }).finally(() => {
      dispatch(updateActionSuccess(false));
    });
};

const verifyData = () => (dispatch, getState) => {
  const state = getState();

  const isLoaded = selectors.isLoaded(state);

  if (!isLoaded) {
    dispatch(loadVariables());
  }
};

export default {
  loadVariables,
  addVariable,
  editVariable,
  removeVariable,
  verifyData,
  updateLoading,
  updateActionSuccess
};
