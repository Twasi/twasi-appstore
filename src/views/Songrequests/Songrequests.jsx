import React from 'react';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import {FormattedMessage} from 'react-intl';
import Slider from '@material-ui/core/Slider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import GivePLZ from '../common/resources/giveplz.png';
import Notlikethis from '../common/resources/Notlikethis.png';

import SongrequestSettingsDialog from './SongrequestSettingsDialog';
import ReportPlaybackIssue from './ReportPlaybackIssue';
import {isValidBrowser} from './browserCheck.js';
import {authSelectors} from '../../state/auth';

import spotifylogo from '../common/resources/spotify.png';
import youtubelogo from '../common/resources/youtube.png';
import gachiHYPER from '../common/resources/gachiHYPER.gif';

import './_style.css';

var songqueue = [];
var songhistory = [];

function getPlayerPosition() {
  let box = document.getElementById('songrequestsCoverImage').getBoundingClientRect();
  let player = document.getElementById('sr-mini-player');
  let playerInfo = document.getElementById('mini-player-infos');
  var topDistance = box.top+window.scrollY
  player.style.position = 'absolute'
  player.style.top = topDistance+"px"
  player.style.left = box.left+"px"
  playerInfo.style.display = 'none'
}

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={0}>{children}</Box>
        </Typography>
    );
}

function getDuration(duration) {
    let sec = duration / 1000;
    let min = sec / 60;
    sec = sec % 60;
    if (sec < 10) sec = "0" + Math.floor(sec);
    else sec = Math.floor(sec);
    return Math.floor(min) + ":" + sec;
}

var songrequestSettings = "";

class Songrequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiConnection: false,
            openSongrequestSettings: false,
            openReportPlaybackIssue: false,
            song: {
                url: '',
                provider: 1,
                requester: '',
                timestamp: Date.now(),
                duration: '00:00',
                name: 'Kein Song in der Songliste',
                artists: '',
                media: ''
            },
            time: 0, // timeline
            volume: 0,
            changeTimelineSlider: false,
            changeVolumeSlider: false,
            playback: false,
            enableSpotifyAuth: false,
            tabValue: 0,
            sync: {
                status: 'disconnected',
                timestamp: Date.now()
            }
        };

        this.handleNewSong = (song) => {
            // called when new song data is available
            if (song !== null) {
                this.setState({
                    song: {
                        url: song.url,
                        provider: song.provider,
                        requester: song.requester ? song.requester.displayName : 'unknown',
                        timestamp: song.timeStamp,
                        duration: song.duration,
                        name: song.name,
                        artist: song.formattedArtists,
                        media: song.covers[0],
                        formattedMaxPos: song.formattedMaxPos
                    }
                });
            } else {
                this.setState({
                    song: {
                        url: '',
                        provider: 1,
                        requester: '',
                        timestamp: Date.now(),
                        duration: 0,
                        name: 'Kein Song in der Songliste',
                        artists: '',
                        media: Notlikethis,
                        formattedMaxPos: '0:00'
                    }
                })
            }
        };
    }

    componentDidMount() {
        window.TSRI.init(this.props.jwt, window.env.WEBSOCKET_URL, window.TSRI.local.manager.eventDistributor.TSRIEvents);

        const handle = ob => {
            window.TSRI.local.manager.eventDistributor.fire("showMiniPlayer", ob.pathname !== "/songrequests");
        };

        if (!window.TSRI.local.manager.unlisten)
            window.TSRI.local.manager.unlisten = this.props.history.listen(handle);

        const on = (event, handler) => window.TSRI.local.manager.eventDistributor.onChange(event, handler, "panel");
        on("spotifyAuth", enableSpotifyAuth => {
            this.setState({enableSpotifyAuth: enableSpotifyAuth});
        });
        on("playState", playback => {
            this.setState({playback})
        });
        on("position", ({pos, formattedPos}) => {
          if(!this.state.changeTimelineSlider) {
            this.setState({pos, formattedPos})
          }
        });
        on("song", this.handleNewSong);
        on("queue", ({queue, history}) => {
            const saveQueue = [...queue];
            saveQueue.shift();
            songqueue = saveQueue;
            songhistory = history;
        });
        on("settings", settings => {
            songrequestSettings = settings;
            this.setState({volume: settings.volume * 100});
        });
        on("status", status => {
            this.setState({ apiConnection: status.api })
        });
    }

    componentDidUpdate() {
      getPlayerPosition()
    }

    handleClickBreadCrumb = (event, value) => {
        const {history} = this.props;
        history.push(value);
        this.setState({});
    };

    handleVolumeChange = (event, volume) => {
        this.setState({volume});
        this.setState({changeVolumeSlider: true});
    };

    handleVolumeSet = (event, volume) => {
        this.setState({volume});
        this.setState({changeVolumeSlider: false});
        window.TSRI.playback.setVolume(volume / 100)
    };

    handleTimelineChange = (event, pos) => {
        this.setState({pos: pos/100})
        this.setState({changeTimelineSlider: true});
    };

    handleTimelineSet = (event, pos) => {
        this.setState({pos: pos/100})
        this.setState({changeTimelineSlider: false});
        window.TSRI.playback.seek(pos / 100)
    };

    handleChangePlayback = () => {
        this.setState({playback: !this.state.playback})
        if (!this.state.playback) {
            window.TSRI.playback.play()
        } else {
            window.TSRI.playback.pause()
        }
    };

    handleSkipPlayback = () => {
        window.TSRI.playback.next()
    };

    handleRevokePlayback = () => {
        window.TSRI.playback.back()
    };

    handleCloseSongrequestSettings = () => {
        this.setState({openSongrequestSettings: false});
    };

    handleCloseReportPlaybackIssue = () => {
        this.setState({openReportPlaybackIssue: false});
    };

    handleTabChange = (event, tabValue) => {
        this.setState({
            tabValue,
        });
    };

    decodeHtml = (html) => {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    renderUnsupportedBrowser() {
        return (
            <Paper className="pageContainer" style={{paddingTop: '1px', borderRadius: '0px 0px 4px 4px'}}>
                <Typography component={'div'} style={{textAlign: 'center', marginTop: '150px', marginBottom: '150px'}}>
                    <img
                        style={{position: 'relative', height: '150px'}}
                        src={GivePLZ}
                        alt="GivePLZ"
                    />
                    <h3 className="pageContainerTitle">
                        <FormattedMessage id="songrequest.browsersupport.title"/>
                    </h3>
                    <small>
                        <FormattedMessage id="songrequest.browsersupport.subtitle"/>
                    </small>
                </Typography>
            </Paper>
        );
    }

    renderApiConnectionLost() {
        return (
            <Paper className="pageContainer" style={{paddingTop: '1px', borderRadius: '0px 0px 4px 4px'}}>
                <Typography component={'div'} style={{textAlign: 'center', marginTop: '150px', marginBottom: '150px'}}>
                    <img
                        style={{position: 'relative', height: '150px'}}
                        src={GivePLZ}
                        alt="GivePLZ"
                    />
                    <h3 className="pageContainerTitle">
                        Die Verbindung zur API wurde unterbrochen
                    </h3>
                    <small>
                        Prüfe deinen Internetverbindung oder warte auf eine erneute Verbindung.
                    </small>
                </Typography>
            </Paper>
        );
    }

    renderSongqueue() {
        return songqueue.map(song => (
            <TableRow>
                <TableCell></TableCell>
                <TableCell>{song.name}</TableCell>
                <TableCell>{song.artists[0]}</TableCell>
                <TableCell>{song.formattedMaxPos}</TableCell>
                <TableCell>
                    <Chip
                        color="primary"
                        avatar={
                          <Avatar style={{width: '24px', height: '24px'}} alt="ticket_owner_avatar">
                            <Icon>
                              person
                            </Icon>
                          </Avatar>
                          /*
                          <Avatar style={{width: '24px', height: '24px'}} alt="ticket_owner_avatar"
                                  src={song.requester && song.requester.avatar}/>*/
                        }
                        label={song.requester ? song.requester.displayName : 'unknown'}
                        style={{marginRight: '5px'}}
                    />
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  <img
                      src={song.provider === 1 ? spotifylogo : youtubelogo}
                      alt="provider logo"
                      style={{height: '32px', marginTop: '7px'}}
                  />
                </TableCell>
                <TableCell style={{textAlign: 'center'}}>
                    {/*
                    <Tooltip title={<FormattedMessage id="songrequest.table_fav" />} placement="top">
                      <Fab
                        className="noshadow"
                        color="primary"
                        size="small"
                        aria-label="favSong"
                      >
                        <Icon className="actionButtons">star</Icon>
                      </Fab>
                    </Tooltip>{' '}
                    */}
                    <Fab
                        disabled
                        className="noshadow"
                        color="secondary"
                        size="small"
                        aria-label="deleteSong"
                    >
                        <Icon className="actionButtons">delete</Icon>
                    </Fab>
                </TableCell>
            </TableRow>
        ));
    }

    renderSonghistory() {
        return songhistory.map(song => (
            <TableRow>
                <TableCell></TableCell>
                <TableCell>{song.name}</TableCell>
                <TableCell>{song.artists[0]}</TableCell>
                <TableCell>{getDuration(song.duration)}</TableCell>
                <TableCell>
                    <Chip
                        color="primary"
                        avatar={
                          <Avatar style={{width: '24px', height: '24px'}} alt="ticket_owner_avatar">
                            <Icon>
                              person
                            </Icon>
                          </Avatar>
                          /*
                          <Avatar style={{width: '24px', height: '24px'}} alt="ticket_owner_avatar"
                                  src={song.requester && song.requester.avatar}/>*/
                        }
                        label={song.requester ? song.requester.displayName : 'unknown'}
                        style={{marginRight: '5px'}}
                    />
                </TableCell>
                <TableCell>
                  <img
                      src={song.provider === 1 ? spotifylogo : youtubelogo}
                      alt="provider logo"
                      style={{height: '32px', marginTop: '7px'}}
                  />
                </TableCell>
                <TableCell>
                  <Fab
                      disabled
                      className="noshadow"
                      color="secondary"
                      size="small"
                      aria-label="deleteSong"
                  >
                      <Icon className="actionButtons">delete</Icon>
                  </Fab>
                </TableCell>
            </TableRow>
        ));
    }

    render() {
        return (
            <div className="pageContent">
                <Breadcrumbs arial-label="Breadcrumb">
                    <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
                        <FormattedMessage id="sidebar.overview"/>
                    </Link>
                    <Typography color="textPrimary"><FormattedMessage id="sidebar.songrequests"/></Typography>
                </Breadcrumbs>
                {!this.state.apiConnection &&
                  this.renderApiConnectionLost()
                }
                {isValidBrowser() && this.state.enableSpotifyAuth &&
                <Chip style={{ marginTop: '15px', marginBottom: '10px' }} color="primary" label="Du möchtest Spotify Requests aktivieren? Klicke auf das Zahnrad und verbinde deinen Spotify Account." />}
                {isValidBrowser() &&
                <Paper className="pageContainer" style={{padding: '0px', position: 'relative'}}>
                    <div
                        style={{
                            width: '100%',
                            height: '248px',
                            position: 'absolute',
                            backgroundImage: `url(${this.state.song.media})`,
                            backgroundSize: 'contain',
                            opacity: '.1',
                            zIndex: '10'
                        }}
                    >
                    </div>
                    <Grid container spacing={3} style={{padding: '12px 23px', position: 'relative', zIndex: '20'}}>
                        <Grid item>
                            <div id="songrequestsCoverImage" className="songrequestsCoverImage">
                              {this.state.song.provider === 1 &&
                                <img
                                    src={this.state.song.media}
                                    alt="albumcover"
                                    style={{height: '200px', width: '200px'}}
                                />
                              }
                              {this.state.song.provider === 2 &&
                                <img
                                    src={this.state.song.media}
                                    alt="albumcover"
                                    style={{height: '200px', width: '355px'}}
                                />
                              }
                                <span id={"player-position"}/>
                            </div>
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Typography color="textPrimary">
                                <h1 style={{
                                    padding: '0px',
                                    margin: '0px',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden'
                                }}>
                                    {this.state.song.name}
                                </h1>
                                <h3 style={{padding: '0px', margin: '0px'}}>
                                    {this.state.song.artist}
                                </h3>
                                <small style={{position: 'absolute', bottom: '30px'}}>
                                    {window.TSRI.playback && window.TSRI.playback.song ?
                                        <em>
                                            <FormattedMessage id="songrequest.requestby"/>{' '}
                                            <b>{this.state.song.requester}</b><br/>
                                            <FormattedMessage
                                                id="songrequest.request.at"/> {new Date(this.state.song.timestamp).toLocaleString()}<br/>
                                            <FormattedMessage id="songrequest.request.provided_by"/>{' '}
                                            {this.state.song.provider === 1 && <b>Spotify</b>}
                                            {this.state.song.provider === 2 && <b>YouTube</b>}
                                        </em>
                                        :
                                        <em>
                                            <FormattedMessage id="songrequest.request.no_request"/>
                                        </em>}
                                </small>
                            </Typography>
                        </Grid>
                        <span style={{ position: 'absolute', right: '33px', bottom: '23px' }}>
                          <Button onClick={() => {
                            localStorage.clear();
                            window.open(this.state.song.url, '_blank');
                          }}>
                            Zum Song
                          </Button>
                        </span>
                        {/*
                        <span style={{ position: 'absolute', right: '33px', bottom: '23px' }}>
                          <Button style={{ marginLeft: '15px', display: window.TSRI.playback && !window.TSRI.playback.song ? 'none' : '' }} color="secondary" variant="contained">
                            <FormattedMessage id="songrequest.request.block_song" />
                          </Button>
                          <Button style={{ marginLeft: '15px', display: window.TSRI.playback && !window.TSRI.playback.song ? 'none' : '' }} color="secondary" variant="contained">
                            <FormattedMessage id="songrequest.request.block_user" />
                          </Button>
                        </span>
                        */}
                    </Grid>
                    <Grid container spacing={3} className="songrequestsPlayer"
                          style={{padding: '23px 23px 10px 23px', position: 'relative', zIndex: '20'}}>
                        <Grid item>
                            <Fab disabled={window.TSRI.playback && window.TSRI.playback._history.length === 0}
                                 onClick={this.handleRevokePlayback} size="small" color="primary" aria-label="previous"
                                 style={{margin: '0px 5px 0px 5px', boxShadow: 'none'}}>
                                <Icon className="actionButtons">skip_previous</Icon>
                            </Fab>
                            <Fab disabled={window.TSRI.playback && !window.TSRI.playback.song}
                                 onClick={this.handleChangePlayback} size="small"
                                 style={{margin: '0px 5px 0px 5px', boxShadow: 'none'}} color="primary"
                                 aria-label="play">
                                <Icon className="actionButtons">{this.state.playback ? 'stop' : 'play_arrow'}</Icon>
                            </Fab>
                            <Fab
                                disabled={window.TSRI.playback && !window.TSRI.playback.song && window.TSRI.playback.queue.length === 0}
                                onClick={this.handleSkipPlayback} size="small"
                                style={{margin: '0px 5px 0px 5px', boxShadow: 'none'}} color="primary"
                                aria-label="skip">
                                <Icon className="actionButtons">skip_next</Icon>
                            </Fab>
                        </Grid>
                        <Grid item alignItems='center'>
                            <div style={{textAlign: 'right', float: 'right', paddingTop: '5px'}}>
                                <Chip
                                    style={{
                                        verticalAlign: 'middle',
                                        marginRight: '5px',
                                        backgroundColor: 'transparent'
                                    }}
                                    label={<div style={{
                                        padding: '5px 0px 0px 5px',
                                        margin: '12px 0px 11px 0px',
                                        width: '300px'
                                    }}>
                                        <Slider
                                            disabled={window.TSRI.playback && !window.TSRI.playback.song}
                                            value={this.state.pos*100}
                                            onChange={this.handleTimelineChange}
                                            onChangeCommitted={this.handleTimelineSet}
                                            valueLabelDisplay="off"/>
                                    </div>}
                                />
                                <Typography style={{float: 'right', paddingTop: '4px'}} color="textPrimary">
                                    <small>{this.state.formattedPos} / {this.state.song.formattedMaxPos}</small>
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item alignItems='center'>
                            <div style={{textAlign: 'right', float: 'right', paddingTop: '5px'}}>
                                <Chip
                                    style={{backgroundColor: 'transparent'}}
                                    avatar={
                                        <Avatar style={{backgroundColor: 'transparent'}}>
                                            <Icon>
                                                {this.state.volume === 0 && 'volume_off'}
                                                {this.state.volume >= 1 && this.state.volume <= 33 && 'volume_mute'}
                                                {this.state.volume >= 34 && this.state.volume <= 66 && 'volume_down'}
                                                {this.state.volume >= 67 && this.state.volume <= 99 && 'volume_up'}
                                                {this.state.volume === 100 &&
                                                <img alt="volume_max" src={gachiHYPER} height="24px"/>}
                                            </Icon>
                                        </Avatar>
                                    }
                                    label={<div style={{
                                        padding: '5px 0px 0px 5px',
                                        margin: '12px 0px 11px 0px',
                                        width: '100px'
                                    }}>
                                        <Slider
                                            value={this.state.volume}
                                            onChange={this.handleVolumeChange}
                                            onChangeCommitted={this.handleVolumeSet}
                                            aria-labelledby="discrete-slider"
                                            valueLabelDisplay="off"/>
                                    </div>}
                                />
                                {/* Settings */}
                            </div>
                        </Grid>
                        <Grid item style={{position: 'absolute', right: '23px'}}>
                            <Fab style={{marginLeft: '15px'}} size="small" color="primary" aria-label="settings"
                                 onClick={() => this.setState({openSongrequestSettings: true})}>
                                <Icon className="actionButtons">settings</Icon>
                            </Fab>
                        </Grid>
                    </Grid>
                </Paper>}
                {isValidBrowser() &&
                <Typography component={'div'} style={{padding: '0px', marginTop: '30px'}}>
                    <small>
                        Gibt es ein Problem mit der Wiedergabe?{'   '}
                        <Button size="small" color="primary" variant="contained" style={{marginTop: '-4px'}}
                                onClick={() => this.setState({openReportPlaybackIssue: true})}>
                            Problem melden
                        </Button>
                    </small>
                </Typography>}
                {isValidBrowser() &&
                <Paper className="pageContainer" style={{padding: '0px', marginTop: '15px'}}>
                    <Tabs
                        style={{ borderRadius: '4px 4px 0px 0px' }}
                        indicatorColor="primary"
                        textColor="primary"
                        value={this.state.tabValue}
                        onChange={this.handleTabChange}
                    >
                        <Tab label={<FormattedMessage id="songrequest.tab.wishes"/>}/>
                        <Tab label={<FormattedMessage id="songrequest.tab.history"/>}/>
                    </Tabs>
                    <TabPanel value={this.state.tabValue} index={0}>
                        <Table>
                            <TableHead
                                adjustForCheckbox={false}
                                displaySelectAll={false}
                                selectable={false}
                            >
                                <TableRow className="TableRow">
                                    <TableCell>
                                        <FormattedMessage id="songrequest.table_id"/>
                                    </TableCell>
                                    <TableCell>
                                        <FormattedMessage id="songrequest.table_title"/>
                                    </TableCell>
                                    <TableCell>
                                        <FormattedMessage id="songrequest.table_channel"/>
                                    </TableCell>
                                    <TableCell>
                                        <FormattedMessage id="songrequest.table_duration"/>
                                    </TableCell>
                                    <TableCell>
                                        <FormattedMessage id="songrequest.table_requestby"/>
                                    </TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>
                                        <FormattedMessage id="songrequest.table_platform"/>
                                    </TableCell>
                                    <TableCell>
                                        <FormattedMessage id="common.actions"/>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody displayRowCheckbox={false}>
                                {this.renderSongqueue()}
                            </TableBody>
                        </Table>
                    </TabPanel>
                    <TabPanel value={this.state.tabValue} index={1}>
                        <Table>
                            <TableHead
                                adjustForCheckbox={false}
                                displaySelectAll={false}
                                selectable={false}
                            >
                                <TableRow className="TableRow">
                                    <TableCell>
                                        <FormattedMessage id="songrequest.table_id"/>
                                    </TableCell>
                                    <TableCell>
                                        <FormattedMessage id="songrequest.table_title"/>
                                    </TableCell>
                                    <TableCell>
                                        <FormattedMessage id="songrequest.table_channel"/>
                                    </TableCell>
                                    <TableCell>
                                        <FormattedMessage id="songrequest.table_duration"/>
                                    </TableCell>
                                    <TableCell>
                                        <FormattedMessage id="songrequest.table_requestby"/>
                                    </TableCell>
                                    <TableCell>
                                        <FormattedMessage id="songrequest.table_platform"/>
                                    </TableCell>
                                    <TableCell>
                                        <FormattedMessage id="common.actions"/>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody displayRowCheckbox={false}>
                                {this.renderSonghistory()}
                            </TableBody>
                        </Table>
                    </TabPanel>
                </Paper>}
                {this.state.openSongrequestSettings &&
                <SongrequestSettingsDialog
                    open
                    settings={songrequestSettings}
                    enableSpotifyAuth={this.state.enableSpotifyAuth}
                    onClose={this.handleCloseSongrequestSettings}
                />
                }
                {this.state.openReportPlaybackIssue &&
                <ReportPlaybackIssue
                    open
                    onClose={this.handleCloseReportPlaybackIssue}
                />
                }
                {!isValidBrowser() && this.renderUnsupportedBrowser()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    twitchid: authSelectors.getUser(state).twitchid,
    jwt: authSelectors.getJwt(state)
});

export default connect(mapStateToProps)(Songrequests);
