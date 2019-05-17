import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { Route } from 'react-router-dom';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import SPSearchUsersPage from './SPSearchUsersPage';
import SPMatchingStatusPage from './SPMatchingStatusPage';
import SPNotificationsPage from './SPNotificationsPage';
import styled from 'styled-components';
import { ToastContainer, toast } from 'mdbreact';
import socketIOClient from "socket.io-client";
import { getNotifications } from '../serverCalls/NotificationAPI.js'
import { getUserById, getCurrentUser } from '../serverCalls/UsersAPI.js'
import HeaderBar from '../components/HeaderBar/HeaderBar'

const Main = styled.main`
    position: relative;
    overflow: hidden;
    transition: all .15s;
    padding: 0 20px;
    margin-left: ${props => (props.expanded ? 240 : 64)}px;
`;

export default class extends React.Component {
    state = {
        selected: 'searching',
        expanded: false,
        userNameNotified: '',
        updatedStatus: '',
        currentUser: {}
    };

    onSelect = (selected) => {
        this.setState({ selected: selected });
    };
    onToggle = (expanded) => {
        this.setState({ expanded: expanded });
    };

    async componentDidMount() {
      const token = localStorage.getItem('token');
      console.log(token);
      const currentUser =  await getCurrentUser(token);
      console.log('dasboard current user:\n', currentUser);
      this.setState({currentUser});

      const socket = socketIOClient("http://localhost:4444");
      socket.emit('subscribe', currentUser._id);
      socket.on('updateStatus', async data => {
        const user = await getUserById(data.otherUserId, localStorage.getItem('token'));
        this.setState({
          userNameNotified: user.firstName + " " + user.lastName,
          updatedStatus: data.matchingRequestStatus
        });
        //raise an alert
        this.notify('updateStatus');
      });
      socket.on('notify', async data => {
        const user = await getUserById(data.otherUserId._id, localStorage.getItem('token'));
        this.setState({
          userNameNotified: user.firstName + " " + user.lastName,
          updatedStatus: ''
        });

        //raise an alert
        this.notify('notify');
      });
    }

     notify = (type) => {
      switch (type) {
        case 'notify':
          toast.success(`${this.state.userNameNotified} sent you a matching request, you can manage it through the notifications page`, {
            autoClose: 7000
          });
          break;
        case 'updateStatus':
          toast.success(`${this.state.userNameNotified} just updated the status of your matching request to - "${this.state.updatedStatus}"`, {
            autoClose: 7000
          });
          break;
      }
    }

    render() {
        const { expanded, selected } = this.state;

        return (
                  <React.Fragment>
                    <HeaderBar></HeaderBar>
                    <div
                      style={{
                        marginLeft: expanded ? 240 : 64,
                        padding: '15px 20px 0 20px',
                      }}
                      >
                        <ToastContainer
                          hideProgressBar={true}
                          newestOnTop={true}
                          autoClose={5000}
                        />
                        <SideNav
                            onSelect={(selected) => {
                                const to = '/dashboard/' + selected;
                                if (this.props.location.pathname !== to) {
                                    this.props.history.push(to);
                                }
                            }}
                            onToggle={this.onToggle}
                        >
                            <SideNav.Toggle />
                            <SideNav.Nav defaultSelected="dashboard">
                                <NavItem eventKey="searching">
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
                                        <i className="fa fa-bell" style={{ fontSize: '1.75em' }} />
                                    </NavIcon>
                                    <NavText>
                                        Notifications
                                    </NavText>
                                </NavItem>
                            </SideNav.Nav>
                        </SideNav>
                        <main>
                          <Route path="/dashboard/searching" exact component={props => <SPSearchUsersPage currentUser={this.state.currentUser}/>} />
                          <Route path="/dashboard/status" exact component={props => <SPMatchingStatusPage currentUser={this.state.currentUser}/>} />
                          <Route path="/dashboard/notifications" exact component={props => <SPNotificationsPage currentUser={this.state.currentUser}/>} />
                        </main>
                    </div>
                  </React.Fragment>
        );
    }
}
