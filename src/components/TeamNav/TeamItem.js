import React from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import styles from './TeamItem.less';

export default function TeamItem(props) {
  const { name, id, handleTeamClick, onClickTeam } = props;

  const shortName = name.charAt(0);
  let className = '';
  if (props.isActive) {
    className += ' menu-active';
  }
  return (
    <div className={styles.teamItem}>
      <Tooltip placement="right" title={name}>
        <a onClick={() => handleTeamClick(id, name)} className={onClickTeam ? 'click-true' : className }>{shortName}</a>
      </Tooltip>
    </div>
  );
}

TeamItem.propTypes = {
  name: PropTypes.string.isRequired,
  onClickTeam: PropTypes.bool.isRequired
}
