import React from 'react';
import { FormattedMessage } from 'react-intl';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Row, Col } from 'react-grid-system';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';

class SongrequestSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      issue: '',
    };
  }

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleSubmitIssue = (issue) => {
    window.TSRI.report(issue)
  };

  handleIssueChange = (event) => {
    if(event.target.value.length <= 1000) {
      this.setState({
        issue: event.target.value
      });
    }
  };

  render() {
    const { classes, onClose, ...other } = this.props;
    return (
      <Dialog
        onClose={this.handleClose}
        scroll="body"
        {...other}
      >
        <DialogContent>
          <Typography component={"div"}>
            <h4 className="pageContainerTitle">
              Problem mit der Wiedergabe melden
            </h4>
            <small>
              Falls es Probleme mit der Wiedergabe der Songrequests gibt, kannst du hier dein Problem melden.<br/><br/>
              Bitte versuche, bevor du ein Problem meldest, deinen Spotify Account neu zu verbinden. Du kannst deinen Spotify Account unter den Songrequest Einstellungen (Zahnrad) neu verbinden.
            </small>
          </Typography>
          <Card style={{ marginTop: '25px' }} className="pluginCard">
            <CardContent style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <TextField
                InputLabelProps={{ shrink: true }}
                id="issue"
                label="Beschreibung des Problems"
                helperText="Bitte beschreibe dein Problem so genau wie es geht."
                fullWidth
                multiline
                rows="3"
                autoFocus
                value={this.state.issue}
                onChange={this.handleIssueChange}
                margin="normal"
                variant="outlined"
              />
            </CardContent>
          </Card>
          <Button
            disabled={!this.state.issue.trim()}
            fullWidth
            style={{ marginTop: '15px' }}
            variant="contained"
            color="primary"
            onClick={() => {
                this.handleSubmitIssue(this.state.issue)
            }}>
            Problem melden
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

export default SongrequestSettings;
