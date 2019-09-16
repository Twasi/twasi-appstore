import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import TimersDialog from './TimersDialog';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import NotFunctionalAlert from '../NotFunctionalAlert/NotFunctionalAlert';

const timers = [{ name: '!hosts', output: 'Zeigt die Liste der Kanäle, die deinen Kanal derzeit hosten.', interval: '10' }];

class Timers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  }

  handleClose = () => {
    this.setState({ modalOpen: false });
  }

  renderTimers() {
    return timers.map(timer => (
      <TableRow key={timer.name}>
        <TableCell>
          <b>{timer.name}</b>
        </TableCell>
        <TableCell
          style={{ wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: '200px' }}
        >
          {timer.output}
        </TableCell>
        <TableCell>{timer.interval} Minuten</TableCell>
        <TableCell>
          <Chip
            label="Aktiviert"
            color="primary"
          />
        </TableCell>
        <TableCell>
          <Tooltip title={<FormattedMessage id="common.edit" />} placement="top">
            <Fab
              color="primary"
              className="noshadow"
              size="small"
              aria-label="editTimer"
            >
              <Icon style={{ color: '#ffffff' }}>edit</Icon>
            </Fab>
          </Tooltip>{' '}
          <Tooltip title={<FormattedMessage id="common.delete" />} placement="top">
            <Fab
              color="secondary"
              className="noshadow"
              size="small"
              aria-label="deleteTimer"
            >
              <Icon style={{ color: '#ffffff' }}>delete</Icon>
            </Fab>
          </Tooltip>
        </TableCell>
      </TableRow>
    ));
  }

  render() {
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.timers" /></Typography>
        </Breadcrumbs>
        <NotFunctionalAlert />
        <Paper className="pageContainer" style={{ borderRadius: '4px 4px 0px 0px' }}>
          <Typography component={'div'}>
            <h4 className="pageContainerTitle">
              <FormattedMessage id="timers.title" />
              <span style={{ float: 'right' }}>
                <Button variant="contained" color="primary" style={{ marginRight: 16 }} onClick={this.props.updateCommands}>
                  <Icon style={{ marginRight: '5px' }}>cached</Icon>
                  <FormattedMessage id="common.refresh" />
                </Button>
                <Button onClick={() => this.setState({ modalOpen: true })} variant="contained" color="primary">
                  <FormattedMessage id="timers.new_timer" />
                </Button>
                <TimersDialog
                  open={this.state.modalOpen}
                  onClose={this.handleClose}
                />
              </span>
            </h4>
            <small>
              <FormattedMessage id="timers.subtitle" />
            </small>
          </Typography>
        </Paper>
        <Paper className="pageContainer" style={{ padding: '0px', margin: '0px', borderRadius: '0px 0px 4px 4px' }}>
          <Table>
            <TableHead>
              <TableRow className="TableRow">
                <TableCell><FormattedMessage id="timers.timer" /></TableCell>
                <TableCell><FormattedMessage id="timers.output" /></TableCell>
                <TableCell><FormattedMessage id="timers.interval" /></TableCell>
                <TableCell><FormattedMessage id="timers.status" /></TableCell>
                <TableCell style={{ width: '120px' }}><FormattedMessage id="common.actions" /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.renderTimers()}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default Timers;
