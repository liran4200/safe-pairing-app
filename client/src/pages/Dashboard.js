import React from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Breadcrumbs from '@trendmicro/react-breadcrumbs';
import { Button, ButtonGroup } from '@trendmicro/react-buttons';
import Dropdown, { MenuItem } from '@trendmicro/react-dropdown';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import SPSearchUsersPage from './SPSearchUsersPage';
import SPMatchingStatusPage from './SPMatchingStatusPage';
import SPNotificationsPage from './SPNotificationsPage';
import styled from 'styled-components';

const Main = styled.main`
    position: relative;
    overflow: hidden;
    transition: all .15s;
    padding: 0 20px;
    margin-left: ${props => (props.expanded ? 240 : 64)}px;
`;

export default class extends React.PureComponent {
    state = {
        selected: 'dashboard',
        expanded: false
    };

    onSelect = (selected) => {
        this.setState({ selected: selected });
    };
    onToggle = (expanded) => {
        this.setState({ expanded: expanded });
    };

    render() {
        const { expanded, selected } = this.state;

        return (

          <Router>
              <Route render={({ location, history }) => (
                  <React.Fragment>
                    <div
                      style={{
                        marginLeft: expanded ? 240 : 64,
                        padding: '15px 20px 0 20px'
                      }}
                      >
                        <SideNav
                            onSelect={(selected) => {
                                const to = '/' + selected;
                                if (location.pathname !== to) {
                                    history.push(to);
                                }
                            }}
                            onToggle={this.onToggle}
                        >
                            <SideNav.Toggle />
                            <SideNav.Nav defaultSelected="dashboard">
                                <NavItem eventKey="dashboard">
                                    <NavIcon>
                                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Home
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="status">
                                    <NavIcon>
                                        <i className="fa fa-history" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Matching Statuses
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="notifications">
                                    <NavIcon>
                                        <i className="fa fa-rss" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Notifications
                                    </NavText>
                                </NavItem>
                            </SideNav.Nav>
                        </SideNav>
                        <main>
                          <Route path="/dashboard" exact component={props => <SPSearchUsersPage />} />
                          <Route path="/status" exact component={props => <SPMatchingStatusPage />} />
                          <Route path="/notifications" exact component={props => <SPNotificationsPage />} />
                        </main>
                    </div>
                  </React.Fragment>
                )}
              />
          </Router>
        );
    }
}
