import React, { Component } from 'react';
import { Tree, Icon, Layout, Menu, Button, Tooltip } from "antd";
import { connect } from "dva";

@connect(({ menuTeams, foldersTeam, loading }) => ({
  menuTeams,
  foldersTeam,
  teamLoading: loading.effects['menuTeams/fetch'],
}))
class TeamNav extends Component {

  componentDidMount() {
    const {
      dispatch
    } = this.props;

    dispatch({
      type: 'menuTeams/fetch',
    });
  }

  handleTeamClick(team) {
    const { dispatch } = this.props;
    dispatch({
      type: 'menuTeams/saveCurrentWithDefaultFolder',
      payload: team.id,
    });
  };

  getShortName = (name) => {
    if (!name) {
      return '';
    }
    return name.substring(0, 1);
  };

  render() {
    return (
      <div className="team-nav">
        <span className="team-nav-title">TEAM</span>
        <ul>
          {
            !this.props.teamLoading &&
            this.props.menuTeams.menuTeams.map(team =>
              <li key={team.id}>
                <Tooltip title={team.name} placement="right">
                  <Button
                    type={this.props.menuTeams.currentTeam && this.props.menuTeams.currentTeam.id === team.id ? 'primary' : 'default'}
                    shape="circle"
                    size="large"
                    onClick={() => this.handleTeamClick(team)}
                  >{this.getShortName(team.name)}</Button>
                </Tooltip>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default TeamNav;
