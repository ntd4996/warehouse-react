import React, { PureComponent } from 'react';
import styles from './TeamInfo.less';

export default class TeamInfo extends PureComponent {

  render() {
    const { selectedTeam } = this.props;

    return (
      <div className={styles.teamInfo}>
        <span>{selectedTeam.name}</span>
      </div>
    );
  }
}
