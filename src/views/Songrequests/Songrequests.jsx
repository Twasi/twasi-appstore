import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { FormattedMessage } from 'react-intl';
import Slider from '@material-ui/core/Slider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import VolumeIcon from '@material-ui/icons/VolumeUp';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

// import SongrequestConnectionStatus from './SongrequestConnectionStatus';
import songrequestSync from '../../services/songrequestSync';
import { authSelectors } from '../../state/auth';

import spotifylogo from '../common/resources/spotifyIcon.png';

import './_style.css';

class Songrequests extends React.Component {
  handleVolumeChange = (event, volume) => {
    this.setState({ volume });
  };

  handleTimelineChange = (event, time) => {
    this.setState({ time });
  };

  constructor(props) {
    super(props);
    this.state = {
      volume: 50,
      time: 50,
      sync: {
        status: 'disconnected',
        ping: -1
      }
    };
    this.sync = songrequestSync;
  }

  componentDidMount() {
    this.sync.setTwitchId(this.props.twitchid);
    this.sync.connect();

    this.sync.onPing = ping =>
      this.setState({ sync: { ...this.state.sync, ping } });
    this.sync.onStatus = status =>
      this.setState({ sync: { ...this.state.sync, status } });

    this.sync.requestStatus();
  }

  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  }

  render() {
    const { volume, time } = this.state;
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.songrequests" /></Typography>
        </Breadcrumbs>
        <Paper
          style={{
            padding: '0px',
            display: 'flex',
            marginBottom: '23px'
          }}
          className="pageContainer"
        >
          <div style={{ position: 'relative' }} className="songrequestsCoverImage">
            <img
              src="https://images-na.ssl-images-amazon.com/images/I/71M%2BI5aOauL._SY355_.jpg"
              alt="albumcover"
              style={{ height: '150px', width: '150px' }}
            />
          </div>
          <Grid container spacing={0} className="songrequestsPlayer">
            <Grid item xs={6}>
              <Typography>
                <h4 style={{ padding: '0px', margin: '0px' }}>
                  Bohemian Rhapsody{' '}
                  <br />
                  <small>Queen</small>
                  <br />
                  <em style={{ fontSize: '12px', fontWeight: 'normal' }}>
                    <FormattedMessage id="songrequest.requestby" /> <b>John Doe</b>
                  </em>
                </h4>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <div style={{ textAlign: 'right', float: 'right' }}>
                <Chip
                  style={{ verticalAlign: 'middle', marginRight: '5px' }}
                  avatar={
                    <Avatar>
                      <VolumeIcon />
                    </Avatar>
                  }
                  label={<div style={{
                    marginRight: '15px',
                    marginTop: '12px',
                    marginBottom: '11px',
                    paddingTop: '5px',
                    width: '150px' }}>
                    <Slider value={volume} onChange={this.handleVolumeChange} />
                         </div>}
                />
                <Fab size="small" style={{ margin: '0px 5px 0px 5px', boxShadow: 'none' }} mini variant="fab" color="primary" aria-label="previous">
                  <Icon className="actionButtons">skip_previous</Icon>
                </Fab>
                <Fab size="small" style={{ margin: '0px 5px 0px 5px', boxShadow: 'none' }} mini variant="fab" color="primary" aria-label="play">
                  <Icon className="actionButtons">play_arrow</Icon>
                </Fab>
                <Fab size="small" style={{ margin: '0px 5px 0px 5px', boxShadow: 'none' }} mini variant="fab" color="primary" aria-label="skip">
                  <Icon className="actionButtons">skip_next</Icon>
                </Fab>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ marginBottom: '-12px', marginTop: '0px' }}>
                <Slider value={time} onChange={this.handleTimelineChange} />
              </div>
              <span className="leftTime">00:00</span>
              <span className="rightTime">13:37</span>
            </Grid>
          </Grid>
        </Paper>
        <Paper className="pageContainer" style={{ padding: '0px' }}>
          <Table>
            <TableHead
              adjustForCheckbox={false}
              displaySelectAll={false}
              selectable={false}
            >
              <TableRow className="TableRow">
                <TableCell>
                  <FormattedMessage id="songrequest.table_id" />
                </TableCell>
                <TableCell>
                  <FormattedMessage id="songrequest.table_title" />
                </TableCell>
                <TableCell>
                  <FormattedMessage id="songrequest.table_channel" />
                </TableCell>
                <TableCell>
                  <FormattedMessage id="songrequest.table_duration" />
                </TableCell>
                <TableCell>
                  <FormattedMessage id="songrequest.table_requestby" />
                </TableCell>
                <TableCell>
                  <FormattedMessage id="songrequest.table_platform" />
                </TableCell>
                <TableCell>
                  <FormattedMessage id="common.actions" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Queen - Bohemian Rhapsody</TableCell>
                <TableCell>Queen</TableCell>
                <TableCell>13:37</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>
                  <div>
                    <Tooltip title="Spotify" placement="top">
                      <img
                        src={spotifylogo}
                        alt="spotify"
                        style={{ height: '32px', marginTop: '7px' }}
                      />
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell>
                  <Tooltip title="Favorisieren" placement="top">
                    <Fab
                      className="noshadow"
                      color="primary"
                      size="small"
                      aria-label="favSong"
                    >
                      <Icon className="actionButtons">star</Icon>
                    </Fab>
                  </Tooltip>{' '}
                  <Tooltip title={<FormattedMessage id="common.delete" />} placement="top">
                    <Fab
                      className="noshadow"
                      color="secondary"
                      size="small"
                      aria-label="deleteSong"
                    >
                      <Icon className="actionButtons">delete</Icon>
                    </Fab>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  twitchid: authSelectors.getUser(state).twitchid
});

export default connect(mapStateToProps)(Songrequests);
