import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Row, Col } from 'react-grid-system';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';

import Rank from '../common/Rank';

import twitterlogo from '../common/resources/twitter.svg';
import facebooklogo from '../common/resources/facebook.svg';
import googlelogo from '../common/resources/google.svg';
//import spotifylogo from '../common/resources/spotify.svg';
import soundcloudlogo from '../common/resources/soundcloud.svg';
import telegramlogo from '../common/resources/telegram.svg';

import team_badge from '../common/resources/team_badge.svg';
import beta_badge from '../common/resources/beta_badge.svg';
import gc17_badge from '../common/resources/gamescom_badge_blue.svg';
import gc18_badge from '../common/resources/gamescom_badge_blue18.svg';

import { authSelectors, authOperations } from '../../state/auth';
//import { spotifySelectors, spotifyOperations } from '../../state/integrations/spotify';
import { twitchSelectors, twitchOperations } from '../../state/integrations/twitch';
import './_style.css';

import NotFunctionalAlert from '../NotFunctionalAlert/NotFunctionalAlert';

class Profile extends Component {

  state = {
    profileActive: false
  };

  componentDidMount() {
    //const { updateSpotifyAccount, updateSpotifyAuthUri } = this.props;
    const { updateTwitchAccount, updateTwitchAuthUri } = this.props;
    //updateSpotifyAccount();
    //updateSpotifyAuthUri();
    updateTwitchAccount();
    updateTwitchAuthUri();
  }

  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  }

  handleAuthentication = (uri) => {
    window.location = encodeURI(uri);
  }

  handleProfileActive = (event) => {
    this.setState({
      profileActive: event.target.checked
    });
  }

  render() {
    const { updateUser, twitch, updateTwitchDisconnect, updateTwitchAccount, user, jwt } = this.props;
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.profile" /></Typography>
        </Breadcrumbs>
        <NotFunctionalAlert/>
        <Row>
          <Col sm={6}>
            <Paper className="pageContainer">
              <Typography component={"div"}>
                <h4 className="pageContainerTitle">
                  <FormattedMessage id="profile.your_data" />
                  <span style={{ float: 'right' }}>
                    <Button variant="contained" color="primary" onClick={updateUser} disabled={user.isUserUpdating}>
                      <Icon style={{ marginRight: '5px' }}>cached</Icon>
                      <FormattedMessage id="common.refresh" />
                      {user.isUserUpdating && (
                        <CircularProgress
                          color="primary"
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: -12,
                            marginLeft: -12
                          }}
                          size={24}
                        />
                      )}
                    </Button>
                  </span>
                </h4>
                <small>
                  <FormattedMessage id="profile.your_data_subline" />
                </small>
              </Typography>
              <Card style={{ marginTop: '25px' }} className="pluginCard">
                <CardContent className="pluginCardContent">
                  <Table>
                    <TableBody className="anim">
                      <TableRow>
                        <TableCell>
                          <FormattedMessage id="profile.your_data_twitchname" />
                        </TableCell>
                        <TableCell>
                          {user.displayName}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <FormattedMessage id="profile.your_data_twitchid" />
                        </TableCell>
                        <TableCell>
                          {user.twitchid}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <FormattedMessage id="profile.your_data_rank" />
                        </TableCell>
                        <TableCell>
                          <Rank />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ borderBottom: '0px' }}>
                          <FormattedMessage id="profile.your_data_delete" />
                        </TableCell>
                        <TableCell style={{ borderBottom: '0px' }}>
                          <Button variant="contained" size="small" color="secondary">
                            <FormattedMessage id="profile.your_data_deletelink" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </Paper>
            <Paper className="pageContainer">
              <Typography component={"div"}>
                <h4 className="pageContainerTitle">
                  <FormattedMessage id="profile.public_profile" />
                </h4>
                <small>
                  <FormattedMessage id="profile.public_profile.subtitle" />
                </small>
              </Typography>
              <Card style={{ marginTop: '25px' }} className="pluginCard">
                <CardContent className="pluginCardContent anim">
                  <Typography component={"div"}>
                    <TextField
                      label={<FormattedMessage id="profile.public_profile.your_profile" />}
                      fullWidth
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true
                      }}
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="send-support-message"
                              onClick={e => {
                                navigator.clipboard.writeText(`${window.location.origin + "/profile/" + user.name}`);
                                e.stopPropagation();
                              }}
                            >
                              <Icon>
                                link
                              </Icon>
                            </IconButton>
                          </InputAdornment>
                        ),
                        startAdornment: (
                          <InputAdornment position="start">
                            <RouterLink to={"/profile/" + user.name}>
                              {window.location.origin + "/profile/" + user.name}
                            </RouterLink>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Typography>
                </CardContent>
              </Card>
              <Card style={{ marginTop: '25px' }} className="pluginCard">
                <CardContent className="pluginCardContent anim">
                  <Row>
                    <Col style={{ textAlign: 'left' }} sm={6}>
                      <Typography style={{ padding: '7px' }}>
                        <b><FormattedMessage id="profile.public_profile.activate_public" /></b>
                      </Typography>
                    </Col>
                    <Col style={{ textAlign: 'right' }} sm={6}>
                      <Switch checked={this.state.profileActive} color="primary" onChange={this.handleProfileActive} />
                    </Col>
                  </Row>
                  <Divider />
                  <Row>
                    <Col style={{ textAlign: 'left' }} sm={6}>
                      <Typography style={{ padding: '7px' }}>
                        <small><FormattedMessage id="profile.public_profile.activate_leaderboard" /></small>
                      </Typography>
                    </Col>
                    <Col style={{ textAlign: 'right' }} sm={6}>
                      <Switch disabled={!this.state.profileActive} color="primary" />
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ textAlign: 'left' }} sm={6}>
                      <Typography style={{ padding: '7px' }}>
                        <small><FormattedMessage id="profile.public_profile.activate_commands" /></small>
                      </Typography>
                    </Col>
                    <Col style={{ textAlign: 'right' }} sm={6}>
                      <Switch disabled={!this.state.profileActive} color="primary" />
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ textAlign: 'left' }} sm={6}>
                      <Typography style={{ padding: '7px' }}>
                        <small><FormattedMessage id="profile.public_profile.activate_quotes" /></small>
                      </Typography>
                    </Col>
                    <Col style={{ textAlign: 'right' }} sm={6}>
                      <Switch disabled={!this.state.profileActive} color="primary" />
                    </Col>
                  </Row>
                </CardContent>
              </Card>
            </Paper>
          </Col>
          <Col sm={6}>
            <Paper className="pageContainer">
              <Typography component={"div"}>
                <h4 className="pageContainerTitle">
                  <FormattedMessage id="profile.own_bot.title" />
                </h4>
                <small>
                  <FormattedMessage id="profile.own_bot.subtitle" />
                </small>
              </Typography>
              <Card style={{ marginTop: '25px' }} className="pluginCard">
                <CardContent className="pluginCardContent">
                  <Grid container spacing={0}>
                    <Grid item md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Typography>
                        {twitch.twitch === null ? "Twasibot" : twitch.twitch.userName}
                      </Typography>
                    </Grid>
                    <Grid item md={6} style={{ textAlign: 'center' }}>
                      {twitch.twitch === null &&
                        <Button
                          onClick={() => { this.handleAuthentication(twitch.twitchUri + "?environment=" + window.location + "&jwt=" + jwt) }}
                          variant="contained"
                          color="primary"
                          disabled>
                          <FormattedMessage id="profile.own_bot.connect" />
                        </Button>}
                      {twitch.twitch !== null &&
                        <Button
                          onClick={() => {
                            updateTwitchDisconnect();
                            setTimeout(function() {
                                updateTwitchAccount();
                            }, 500)
                          }}
                          variant="contained"
                          color="secondary">
                          <FormattedMessage id="profile.own_bot.disconnect" />
                        </Button>}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Paper>
            <Paper className="pageContainer">
              <Typography component={"div"}>
                <h4 className="pageContainerTitle">
                  <FormattedMessage id="profile.social" />
                </h4>
                <small>
                  <FormattedMessage id="profile.social_subline" />
                </small>
              </Typography>
              <div className="anim">
                <Row style={{ marginTop: '25px' }}>
                  <Col sm={6}>
                    <Button disabled fullWidth variant="contained" style={{ boxShadow: 'none' }}>
                      <span
                        style={{
                          position: 'absolute',
                          left: '0',
                          width: '32px',
                          height: '32px',
                          backgroundColor: '#1da1f2'
                        }}
                      >
                        <img
                          className="socialIcon"
                          src={twitterlogo}
                          alt="twitter-logo"
                        />
                      </span>
                      <small>
                        Twitter
                      </small>
                    </Button>
                  </Col>
                  <Col sm={6}>
                    <div style={{ marginTop: '3px' }}>
                      <small>
                        <FormattedMessage id="profile.social_notconnected" />
                      </small>
                    </div>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col sm={6}>
                    <Button disabled fullWidth variant="contained" color="default" style={{ boxShadow: 'none' }}>
                      <small>
                        Telegram
                      </small>
                      <span
                        style={{
                          position: 'absolute',
                          left: '0',
                          width: '32px',
                          height: '32px',
                          backgroundColor: '#0088cc'
                        }}
                      >
                        <img
                          className="socialIcon"
                          src={telegramlogo}
                          alt="telegram-logo"
                        />
                      </span>
                    </Button>
                  </Col>
                  <Col sm={6}>
                    <div style={{ marginTop: '3px' }}>
                      <small>
                        <FormattedMessage id="profile.social_notconnected" />
                      </small>
                    </div>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col sm={6}>
                    <Button disabled fullWidth variant="contained" style={{ boxShadow: 'none' }}>
                      <small>
                        Facebook
                      </small>
                      <span
                        style={{
                          position: 'absolute',
                          left: '0',
                          width: '32px',
                          height: '32px',
                          backgroundColor: '#3b5998'
                        }}
                      >
                        <img
                          className="socialIcon"
                          src={facebooklogo}
                          alt="facebook-logo"
                        />
                      </span>
                    </Button>
                  </Col>
                  <Col sm={6}>
                    <div style={{ marginTop: '3px' }}>
                      <small>
                        <FormattedMessage id="profile.social_notconnected" />
                      </small>
                    </div>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col sm={6}>
                    <Button disabled fullWidth variant="contained" style={{ boxShadow: 'none' }}>
                      <small>
                        Google
                      </small>
                      <span
                        style={{
                          position: 'absolute',
                          left: '0',
                          width: '32px',
                          height: '32px',
                          backgroundColor: '#db3236'
                        }}
                      >
                        <img
                          className="socialIcon"
                          src={googlelogo}
                          alt="google-logo"
                        />
                      </span>
                    </Button>
                  </Col>
                  <Col sm={6}>
                    <div style={{ marginTop: '3px' }}>
                      <small>
                        <FormattedMessage id="profile.social_notconnected" />
                      </small>
                    </div>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col sm={6}>
                    <Button disabled fullWidth variant="contained" style={{ boxShadow: 'none' }}>
                      <small>
                        Soundcloud
                      </small>
                      <span
                        style={{
                          position: 'absolute',
                          left: '0',
                          width: '32px',
                          height: '32px',
                          backgroundColor: '#ff8800'
                        }}
                      >
                        <img
                          className="socialIcon"
                          src={soundcloudlogo}
                          alt="soundcloud-logo"
                        />
                      </span>
                    </Button>
                  </Col>
                  <Col sm={6}>
                    <div style={{ marginTop: '3px' }}>
                      <small>
                        <FormattedMessage id="profile.social_notconnected" />
                      </small>
                    </div>
                  </Col>
                </Row>
                {/*
                <br />
                <Row>
                  <Col sm={6}>
                    <Button
                      onClick={() => { this.handleAuthentication(spotify.spotifyUri + "?environment=" + window.location + "&jwt=" + jwt) }}
                      fullWidth
                      disabled={spotify.spotify !== null}
                      variant="contained"
                      style={{ boxShadow: 'none' }}>
                      <small>
                        {spotify.spotify === null ? "Spotify" : spotify.spotify.userName}
                      </small>
                      <span
                        style={{
                          position: 'absolute',
                          left: '0',
                          width: '32px',
                          height: '32px',
                          textAlign: 'center',
                          backgroundColor: '#1db954'
                        }}
                      >
                        <img
                          className="socialIcon"
                          src={spotifylogo}
                          alt="spotify-logo"
                        />
                      </span>
                    </Button>
                  </Col>
                  <Col sm={6}>
                    {spotify.spotify === null &&
                      <div style={{ float: 'left', marginTop: '3px' }}>
                          <small>
                            <FormattedMessage id="profile.social_notconnected" />
                          </small>
                      </div>
                    } {spotify.spotify !== null &&
                      <div style={{ float: 'left' }}>
                        <Button color="primary" size="small">
                          <FormattedMessage id="profile.social_permissions" />
                        </Button>
                        <Button
                          onClick={() => {
                            updateSpotifyDisconnect();
                            setTimeout(function() {
                                updateSpotifyAccount();
                            }, 500)
                          }}
                          color="secondary"
                          size="small">
                          <FormattedMessage id="profile.social_disconnect" />
                        </Button>
                      </div>
                    }
                  </Col>
                </Row>
                */}
              </div>
            </Paper>
            <Paper className="pageContainer">
              <Typography component={"div"}>
                <h4 className="pageContainerTitle">
                  <FormattedMessage id="profile.badges" />
                  <span style={{ float: 'right' }}>
                    <Button disabled variant="contained" color="primary">
                      <FormattedMessage id="common.save" />
                    </Button>
                  </span>
                </h4>
                <small>
                  <FormattedMessage id="profile.badges_subline" />
                </small>
              </Typography>
              <Card style={{ marginTop: '25px' }} className="pluginCard">
                <CardContent className="pluginCardContent anim">
                  <Tooltip title="Twasi Team" placement="top">
                    <Fab size="medium" className="badgeButton">
                      <img
                        src={team_badge}
                        alt="Badge"
                        className="profileBadge"
                      />
                    </Fab>
                  </Tooltip>
                  <Tooltip title="Twasi Beta" placement="top">
                    <Fab size="medium" className="badgeButton">
                      <img
                        src={beta_badge}
                        alt="Badge"
                        className="profileBadge"
                      />
                    </Fab>
                  </Tooltip>
                  <Tooltip title="Gamescom 2017" placement="top">
                    <Fab size="medium" className="badgeButton">
                      <img
                        src={gc17_badge}
                        alt="Badge"
                        className="profileBadge"
                      />
                    </Fab>
                  </Tooltip>
                  <Tooltip title="Gamescom 2018" placement="top">
                    <Fab size="medium" className="badgeButton">
                      <img
                        src={gc18_badge}
                        alt="Badge"
                        className="profileBadge"
                      />
                    </Fab>
                  </Tooltip>
                </CardContent>
              </Card>
            </Paper>
          </Col>
        </Row>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    displayName: PropTypes.string,
    twitchid: PropTypes.string,
    rank: PropTypes.string
  })
};

const mapDispatchToProps = dispatch => ({
  updateUser: () => dispatch(authOperations.updateUser()),
  //updateSpotifyAccount: () => dispatch(spotifyOperations.loadSpotifyAccount()),
  //updateSpotifyAuthUri: () => dispatch(spotifyOperations.loadSpotifyAuthUri()),
  //updateSpotifyDisconnect: () => dispatch(spotifyOperations.loadSpotifyDisconnect()),
  updateTwitchAccount: () => dispatch(twitchOperations.loadTwitchAccount()),
  updateTwitchAuthUri: () => dispatch(twitchOperations.loadTwitchAuthUri()),
  updateTwitchDisconnect: () => dispatch(twitchOperations.loadTwitchDisconnect())
});

const mapStateToProps = state => ({
  user: authSelectors.getUser(state),
  isUserUpdating: authSelectors.isUserUpdating(state),
  //spotify: spotifySelectors.getSpotifyAccount(state),
  //spotifyUri: spotifySelectors.getSpotifyAuthUri(state),
  //spotifyDisconnect: spotifySelectors.getSpotifyDisconnect(state),
  twitch: twitchSelectors.getTwitchAccount(state),
  twitchUri: twitchSelectors.getTwitchAuthUri(state),
  twitchDisconnect: twitchSelectors.getTwitchDisconnect(state),
  jwt: authSelectors.getJwt(state)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
