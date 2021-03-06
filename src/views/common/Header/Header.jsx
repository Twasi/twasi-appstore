import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/styles';

import './_style.css';
import { authSelectors } from '../../../state/auth';
import { appInfoSelectors } from '../../../state/appInfo';
import { themesSelectors, themesOperations } from '../../../state/themes';
import { StatusIcon } from '../../Status';
import { AccountSwitchIcon } from '../../AccountSwitch';
import { ThemeSwitchIcon } from '../../ThemeSwitch';
import { LanguageSwitchIcon } from '../../LanguageSwitch';
//import { FeedbackIcon } from '../../Feedback';
import Rank from '../Rank';
import Logo from '../Logo/Logo';

import {
  getAvatarStyle,
  getLogoStyle,
  getRankStyle,
  getLogoDescriptionStyle
} from './_style';

class Header extends Component {
  render() {
    const { userName, avatar, banner, selectedBannerAsHeaderValue, isSetUp, theme, isActionSuccess, updateInstalledThemes, logocolor, isActionSuccessAuth } = this.props;
    if(isActionSuccess || isActionSuccessAuth) {
      updateInstalledThemes();
    }
    return (
    <header>
      <div className="bannerHeaderTopBar" />
      {isSetUp && <div className="bannerHeader" style={{ opacity: banner && selectedBannerAsHeaderValue ? '0.4' : '1', backgroundImage: banner && selectedBannerAsHeaderValue ? `url(${banner})` : null }} />}
      <Grid container spacing={4}>
        <Grid item xs={4}>
          {isSetUp &&
          <div style={getLogoStyle()}>
            <span>
              {avatar && <img src={avatar} alt="Avatar" className="avatarStyle" style={getAvatarStyle()} />}
              <div style={getLogoDescriptionStyle()}>
                <span>
                  <Typography color="inherit" className="userNameStyle">{userName}</Typography>
                  <Typography color="inherit"><small className="rankNameStyle" style={getRankStyle()}><Rank /></small></Typography>
                </span>
              </div>
            </span>
          </div>
          }
        </Grid>
        <Grid style={{ paddingTop: '10px' }} item xs={4}>
          <div style={getLogoStyle()}>
            <span className="text_logo_wrapper" style={{ marginLeft: 'auto', marginRight: 'auto', width: '150px' }}>
              <div className="text_logo">
                <Logo color={logocolor === "" ? theme.palette.primary.main : logocolor} />
              </div>
            </span>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ paddingTop: '5px' }}>
            {isSetUp &&<AccountSwitchIcon />}
            <ThemeSwitchIcon />
            <LanguageSwitchIcon />
            {isSetUp &&<StatusIcon />}
          </div>
        </Grid>
      </Grid>
    </header>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string,
  avatar: PropTypes.string,
  banner: PropTypes.string
};

Header.defaultProps = {
  userName: 'Unknown',
  avatar: 'Unknown',
  banner: 'Unknown'
};

const mapStateToProps = state => ({
  isSetUp: authSelectors.isSetUp(state),
  isAuthenticated: authSelectors.isAuthenticated(state),
  userName: authSelectors.getUser(state).displayName,
  rank: authSelectors.getUser(state).rank,
  avatar: authSelectors.getUserAvatar(state),
  banner: authSelectors.getUserBanner(state),
  selectedBannerAsHeaderValue: appInfoSelectors.getBannerAsHeader(state),
  themes: themesSelectors.getThemes(state),
  isActionSuccess: themesSelectors.isActionSuccess(state),
  isActionSuccessAuth: authSelectors.isActionSuccessAuth(state),
});

const mapDispatchToProps = dispatch => ({
  updateInstalledThemes: () => dispatch(themesOperations.loadInstalledThemes())
});

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(Header));
