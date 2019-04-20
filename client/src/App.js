import React from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Breadcrumbs from '@trendmicro/react-breadcrumbs';
import { Button, ButtonGroup } from '@trendmicro/react-buttons';
import Dropdown, { MenuItem } from '@trendmicro/react-dropdown';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import SPSearchUsersPage from './components/pages/SPSearchUsersPage';
// import DashBoard from './components/pages/Dashboard';
import ensureArray from 'ensure-array';
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
        selected: 'send-matching-request',
        expanded: false
    };

    onSelect = (selected) => {
        this.setState({ selected: selected });
    };
    onToggle = (expanded) => {
        this.setState({ expanded: expanded });
    };

    pageTitle = {
        'send-matching-request': 'Send Matching Request',
        'matching-statuses': ['Matching Statuses'],
        'notifications': ['Notifications']
    };

    renderBreadcrumbs() {
        const { selected } = this.state;
        const list = ensureArray(this.pageTitle[selected]);

        return (
            <Breadcrumbs>
                {list.map((item, index) => (
                    <Breadcrumbs.Item
                        active={index === list.length - 1}
                        key={`${selected}_${index}`}
                    >
                        {item}
                    </Breadcrumbs.Item>
                ))}
            </Breadcrumbs>
        );
    }

    navigate = (pathname) => () => {
        this.setState({ selected: pathname });
    };

    render() {
        const { expanded, selected } = this.state;

        return (
          <Router>
              <Route render={({ location, history }) => (
                  <React.Fragment>
                      <SideNav
                          onSelect={(selected) => {
                              const to = '/' + selected;
                              if (location.pathname !== to) {
                                  history.push(to);
                              }
                          }}
                      >
                          <SideNav.Toggle />
                          <SideNav.Nav defaultSelected="search-users">
                              <NavItem eventKey="search-users">
                                  <NavIcon>
                                      <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                                  </NavIcon>
                                  <NavText>
                                      Search Users
                                  </NavText>
                              </NavItem>
                              <NavItem eventKey="devices">
                                  <NavIcon>
                                      <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} />
                                  </NavIcon>
                                  <NavText>
                                      Devices
                                  </NavText>
                              </NavItem>
                          </SideNav.Nav>
                      </SideNav>
                      <main>
                      <Route path="/search-users" exact component={props => <SPSearchUsersPage />} />
                          <Route path="/sign-in" exact component={props => <SignIn />} />
                          <Route path="/sign-up" component={props => <SignUp />} />

                      </main>
                  </React.Fragment>
              )}
              />
          </Router>
        );
    }
}

export default App;
