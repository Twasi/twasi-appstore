import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fab from '@material-ui/core/Fab';

import './_style.css';

import SoonerLater from '../common/resources/SoonerLater.png';
import ResidentSleeper from '../common/resources/ResidentSleeper.png';

import { supportSelectors, supportOperations } from '../../state/support';
import SupportTicketModal from './SupportTicketModal';
import SupportTicket from './SupportTicket';

function TabContainer(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

class Support extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      tabValue: 0,
      selectedTicket: window.location.hash.substr(1)
    };
  }

  handleTabChange = (event, tabValue) => {
    this.setState({ tabValue });
  };

  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  };

  componentDidMount() {
    const { loadMyTickets } = this.props;
    loadMyTickets(1);
  }

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  renderSupportTickets(open) {
    return this.props.myTickets.filter(t => open ? t.state !== 'CLOSED' : t.state === 'CLOSED').map(ticket => (
      <SupportTicket
        key={ticket.id}
        ticket={ticket}
        isAdminContext={this.props.isAdmin}
        reply={this.props.reply}
        open={ticket.id === this.state.selectedTicket}
        setOpen={id => {
          if (id === '') {
            window.location.hash = '';
          } else {
            window.location.hash = id;
          }
          this.setState({ selectedTicket: id });
        }}
      />
    ));
  }

  renderPagination() {
    const { pagination, loadMyTickets } = this.props;
    return (
      <Paper style={{ textAlign: 'center' }} className="pageContainer">
      {_.times(pagination.pages, i =>
        <Fab
          onClick={() => {loadMyTickets(i+1)}}
          style={{ marginLeft: '5px', marginRight: '5px' }}
          size="small"
          disabled={i+1 === pagination.page}
          color={i+1 === pagination.page ? "default" : "primary"}
        >
        {i+1}
        </Fab>
      )}
      </Paper>
    );
  }

  renderSupportTicketsEmpty(open) {
    if (open) {
      return (
        <div>
          <Typography component={'div'} style={{ textAlign: 'center', marginTop: '150px', marginBottom: '150px' }}>
            <img
              style={{ position: 'relative', height: '80px' }}
              src={SoonerLater}
              alt="SoonerLater"
            />
            <h3 className="pageContainerTitle">
              <FormattedMessage id="support.open.no_tickets.title" />
            </h3>
            <small>
              <FormattedMessage id="support.open.no_tickets.subtitle" />
            </small>
            <br /><br />
            <Button onClick={() => this.setState({ modalOpen: true })} variant="contained" color="primary">
              <FormattedMessage id="support.create_new_ticket" />
            </Button>
          </Typography>
        </div>
      );
    } else {
      return (
        <div>
          <Typography style={{ textAlign: 'center', marginTop: '150px', marginBottom: '150px' }}>
            <img
              style={{ position: 'relative', height: '100px' }}
              src={ResidentSleeper}
              alt="ResidentSleeper"
            />
            <h3 className="pageContainerTitle">
              <FormattedMessage id="support.closed.no_tickets.title" />
            </h3>
            <small>
              <FormattedMessage id="support.closed.no_tickets.subtitle" />
            </small>
          </Typography>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link style={{ color: '#d0d0d0' }} to="/" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          {this.state.selectedTicket === '' && <Typography color="textPrimary"><FormattedMessage id="sidebar.support" /></Typography>}
          {this.state.selectedTicket !== '' && <Typography color="textPrimary"><Link style={{ color: '#d0d0d0' }} to="/support" onClick={() => this.setState({ selectedTicket: '' })}><FormattedMessage id="sidebar.support" /></Link></Typography>}
          {this.state.selectedTicket !== '' && <Typography color="textPrimary">Ticket #{this.state.selectedTicket}</Typography>}
        </Breadcrumbs>
        <Paper className="pageContainer">
          <Typography component={'div'}>
            <h4 className="pageContainerTitle">
              <FormattedMessage id="support.headline" />
              <span style={{ float: 'right' }}>
                <Button variant="contained" color="primary" style={{ marginRight: '16px' }} onClick={() => {this.props.loadMyTickets(this.props.pagination.page)}}>
                  <Icon style={{ marginRight: '5px' }}>cached</Icon>
                  <FormattedMessage id="common.refresh" />
                </Button>
                <Button onClick={() => this.setState({ modalOpen: true })} variant="contained" color="primary">
                  <FormattedMessage id="support.create_new_ticket" />
                </Button>
                <SupportTicketModal
                  open={this.state.modalOpen}
                  onClose={this.handleClose}
                  {...this.props}
                />
              </span>
            </h4>
            <small>
              <FormattedMessage id="support.subheadline" />
            </small>
          </Typography>
        </Paper>
        <Tabs
          style={{ marginTop: '23px', borderRadius: '3px 3px 0px 0px' }}
          value={this.state.tabValue}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label={<FormattedMessage id="support.open.tab_title" />} />
          <Tab label={<FormattedMessage id="support.closed.tab_title" />} />
        </Tabs>
        <Paper className="pageContainer" style={{ marginTop: '0px', paddingTop: '1px', borderRadius: "0px 0px 4px 4px" }}>
          {this.state.tabValue === 0 &&
          <TabContainer>
            {this.renderSupportTickets(true).length === 0 ? this.renderSupportTicketsEmpty(true) : this.renderSupportTickets(true)}
            {this.renderPagination()}
          </TabContainer>}
          {this.state.tabValue === 1 &&
          <TabContainer>
            {this.renderSupportTickets(false).length === 0 ? this.renderSupportTicketsEmpty(false) : this.renderSupportTickets(false)}
            {this.renderPagination()}
          </TabContainer>}
        </Paper>
      </div>
    );
  }
}

Support.propTypes = {
  userName: PropTypes.string,
  avatar: PropTypes.string,
  myTicket: PropTypes.arrayOf(PropTypes.shape({})),
  reply: PropTypes.func
};

Support.defaultProps = {
  userName: 'Unknown',
  avatar: 'Unknown'
};

const mapStateToProps = state => ({
  myTickets: supportSelectors.getMyTickets(state),
  pagination: supportSelectors.getPagination(state),
  isAdmin: supportSelectors.isAdmin(state)
});

const mapDispatchToProps = dispatch => ({
  loadMyTickets: (page) => dispatch(supportOperations.loadMyTickets(page)),
  createTicket: (category, topic, message) => dispatch(supportOperations.createTicket(category, topic, message)),
  reply: (id, close, isAdminContext, message) => dispatch(supportOperations.replyToTicket(id, close, isAdminContext, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Support);
