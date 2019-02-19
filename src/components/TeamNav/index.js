import React from 'react';
import PropTypes from 'prop-types';
import TeamItem from './TeamItem';
import styles from './index.less';

const TeamNav = React.memo(props => {
  const { teamData, handleTeamClick, onClickTeam } = props;
  const teams = teamData.map(team =>
    <TeamItem name={team.name} id={team.id} key={team.id} handleTeamClick={handleTeamClick} onClickTeam={onClickTeam} />
  );
  return (
    <div className={styles.teamNav}>
      {teams}
    </div>
  );
});

TeamNav.propTypes = {
  teamData: PropTypes.array,
  handleTeamClick: PropTypes.func.isRequired
}

export default TeamNav;
