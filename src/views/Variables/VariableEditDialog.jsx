import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FormattedMessage, injectIntl } from 'react-intl';

import { variablesSelectors, variablesOperations } from '../../state/variables';

class Variable extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      variableName: "",
      variableOutput: "",
      openNotification: false,
      notification: ""
    };
  }

  componentDidMount() {
    const { variableObject } = this.props;
    this.setState({
      variableName: variableObject.name,
      variableOutput: variableObject.output
    });
  }

  handleOpenNotification = variableName => {
    this.setState({
      openNotification: true,
      modalOpen: false,
      notification: 'Die Variable "' + variableName + '" wurde erfolgreich bearbeitet.'
    });
    setTimeout(function() {
        this.props.updateVariables()
    }.bind(this), 100)
  };

  handleCloseNotification = () => {
    this.setState({ openNotification: false });
  };

  handleVariableNameChange = (event) => {
    var name = event.target.value
    if(event.target.value.length <= 50) {
      name = event.target.value.replace(/[^a-z0-9]/gi,'');
      this.setState({
        variableName: name
      });
    }
  };

  handleVariableOutputChange = (event) => {
    if(event.target.value.length <= 1000) {
      this.setState({
        variableOutput: event.target.value
      });
    }
  };

  handleEditVariable = (id, name, content) => {
    this.props.editVariable(id, name, content);
    this.props.onClose(this.props.selectedValue);
  };

  render() {
    const { variableObject, ...other } = this.props;
    if (this.props.isActionSuccess) {
      this.props.updateVariables()
    }
    return (
      <Dialog
        {...other}
        scroll="body"
      >
        <DialogContent>
          <Typography component={'div'}>
            <h4 className="pageContainerTitle">
              Variable {variableObject.name} bearbeiten
            </h4>
            <small>
              <FormattedMessage id="variables.new_variable.subheadline" />
            </small>
          </Typography>
          <br /><br />
          <Card className="pluginCard">
            <CardContent style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <TextField
                InputLabelProps={{ shrink: true }}
                id="outlined-textarea"
                label={<FormattedMessage id="variables.new_variable.variable" />}
                fullWidth
                value={this.state.variableName}
                onChange={this.handleVariableNameChange}
                helperText="Das ist deine Variable. Du kannst Variablen in jeden deiner Befehle einbinden."
                margin="normal"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      $
                    </InputAdornment>
                  )
                }}
              />
            </CardContent>
          </Card>
          <Card className="pluginCard" style={{ marginTop: '15px' }}>
            <CardContent style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <TextField
                InputLabelProps={{ shrink: true }}
                id="outlined-textarea"
                label={<FormattedMessage id="variables.new_variable.output" />}
                fullWidth
                value={this.state.variableOutput}
                onChange={this.handleVariableOutputChange}
                multiline
                rows="3"
                helperText={this.props.intl.formatMessage({ id: "variables.new_variable.output.helpertext" }) + " " + this.state.variableOutput.length + "/1000"}
                margin="normal"
                variant="outlined"
              />
            </CardContent>
          </Card>
          <Button
            disabled={!this.state.variableName.trim() || !this.state.variableOutput.trim()}
            fullWidth
            style={{ marginTop: '15px' }}
            variant="contained"
            color="primary"
            onClick={() => {
                this.handleEditVariable(variableObject.id, this.state.variableName, this.state.variableOutput);
                this.handleOpenNotification(this.state.variableName)
            }}>
            <FormattedMessage id="variables.new_variable.savevariable" />
          </Button>
        </DialogContent>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openNotification}
          autoHideDuration={5000}
          onClose={this.handleCloseNotification}
          message={this.state.notification}
        />
      </Dialog>
    );
  }
}

Variable.propTypes = {
  editVariable: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoaded: variablesSelectors.isLoaded(state),
  isActionSuccess: variablesSelectors.isActionSuccess(state),
  disabled: variablesSelectors.isDisabled(state)
});

const mapDispatchToProps = dispatch => ({
  updateVariables: () => dispatch(variablesOperations.loadVariables()),
  editVariable: (id, name, output) => dispatch(variablesOperations.editVariable(id, name, output)),
  verifyData: () => dispatch(variablesOperations.verifyData()),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Variable));
