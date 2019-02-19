import React, { Component } from 'react';
import {
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  Icon,
  Input,
  Modal,
  Row,
  Tooltip,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Spin } from 'antd';
import styles from './EmailDetail.less';
import 'react-tagsinput/react-tagsinput.css';
import 'react-quill/dist/quill.snow.css';
import { connect } from "dva";
import EmailReply from "./components/EmailReply";
import EmailComments from "./components/EmailComments";
import SubHeader from "../../components/SubHeader/SubHeader";

const confirm = Modal.confirm;

const comments = [
  {
    id: 1,
    user: {
      id: 1,
      fullName: 'William John',
      shortName: 'J'
    },
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. ',
    createdAt: '10/12/2018 09:15 AM'
  },
  {
    id: 2,
    user: {
      id: 1,
      fullName: 'William John',
      shortName: 'J'
    },
    content: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    createdAt: '10/12/2018 09:15 AM'
  }
];

const headerInfo = {
  name: 'Email detail',
  breadcrumb: [
    {
      name: 'Home',
    },
    {
      name: 'Email list'
    },
    {
      name: 'Email detail'
    }
  ]
};

@connect(({ emailDetail, menuTeams, foldersTeam, loading }) => ({
  menuTeams,
  foldersTeam,
  emailDetail,
  emailLoading: loading.effects['emailDetail/fetch'],
}))
class EmailDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingModalVisible: false,
    };
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'emailDetail/fetch',
      emailId: match.params['id']
    });

    if (!this.props.menuTeams.currentTeam.id && !this.props.foldersTeam.currentFolder) {
      const teamId = match.params['teamId'];
      const folderId = match.params['folderId'];

      dispatch({
        type: 'emails/saveSearchData',
        searchData: {folderId},
      });

      dispatch({
        type: 'menuTeams/saveCurrent',
        payload: teamId,
      });

      dispatch({
        type: 'foldersTeam/saveCurrentWithoutTeam',
        payload: folderId,
      });
    }
  }

  showSettingModal = () => {
    this.setState({
      settingModalVisible: true,
    });
  };

  handleSettingOk = (e) => {
    this.setState({
      settingModalVisible: false,
    });
  };

  handleSettingCancel = (e) => {
    this.setState({
      settingModalVisible: false,
    });
  };

  showDeleteConfirm = () => {
    confirm({
      title: 'Do you want to delete this email?',
      content: 'Click the OK button to delete this email, click the Cancel button to cancel',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  };

  showReplyForm = (e) => {
    if(this.state.isActiveReply) {
      this.setState({
        isActiveReply: false
      });
    } else {
      this.setState({
        isActiveReply: true
      });
    }
  };

  render() {
    let emailDetail;
    if (this.props.emailDetail) {
      emailDetail = this.props.emailDetail.email;
    }

    const {
      emailLoading,
    } = this.props;

    const mailInvolveInfoDetail = (
      <Card style={{width: '400px', padding: '20px'}}>
        <Row>
          <Col span={4}>From</Col>
          <Col span={20}>{emailDetail.from}</Col>
        </Row>
        <Row>
          <Col span={4}>To</Col>
          <Col span={20}>{emailDetail.to}</Col>
        </Row>
        <Row>
          <Col span={4}>CC</Col>
          <Col span={20}>{emailDetail.cc}</Col>
        </Row>
        <Row>
          <Col span={4}>BCC</Col>
          <Col span={20}>{emailDetail.bcc}</Col>
        </Row>
      </Card>
    );

    return (
      <React.Fragment>
        <SubHeader pageInfo={headerInfo} />
        <Spin spinning={emailLoading}>
          <div className="page-content-wrap">
            <div className={styles.container}>
              <div className={styles.mailDetailHeaderWrap}>
                <div className={styles.mailDetailHeader}>
                  <div className={styles.mailPriority}>
                    <Tooltip placement='bottom' title={emailDetail.priority}>
                      <Icon type='star' theme='filled' className={styles['priority' + (emailDetail.priority || 'NORMAL')]} />
                    </Tooltip>
                  </div>
                  <div className={styles.mailSubject}>
                    <h3>{emailDetail.subject}</h3>
                  </div>
                  <div className={styles.headerAction}>
                    <ul>
                      <li>
                        <Tooltip placement='bottom' title='Reply'>
                          <Button type="primary" shape="circle" icon="rollback" onClick={this.showReplyForm} />
                        </Tooltip>
                      </li>
                      <li>
                        <Tooltip placement='bottom' title='Setting'>
                          <Button type="primary" shape="circle" icon="setting" onClick={this.showSettingModal} />
                        </Tooltip>
                      </li>
                      <li>
                        <Tooltip placement='bottom' title='Comment'>
                          <Badge count={comments.length}>
                            <Button type="primary" shape="circle" icon="message" href='#mailComment' />
                          </Badge>
                        </Tooltip>
                      </li>
                      <li>
                        <Tooltip placement='bottom' title='Delete'>
                          <Button type="danger" shape="circle" icon="delete" onClick={this.showDeleteConfirm} />
                        </Tooltip>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={styles.mailInvolveInfo}>
                  <div className={styles.mailAddressWrap}>
                    <span className={styles.mailFrom}>{emailDetail.from}</span>
                    <span className={styles.toLabel}>to</span>
                    <span className={styles.mailTo}>{emailDetail.to}</span>
                    <Dropdown overlay={mailInvolveInfoDetail} trigger={['click']}>
                      <span className={styles.btnShowMore}>
                        <Tooltip placement='bottom' title='More info'>
                          <Icon type="caret-down" theme="filled" />
                        </Tooltip>
                      </span>
                    </Dropdown>
                  </div>
                </div>

                <div className={styles.mailInfoWrap}>
                  <div className={[styles.mailInfoItem, styles.mailFolder].join(' ')}>
                    <Tooltip placement='bottom' title='Folder'>
                      <Icon type="folder" theme="filled" />
                      <span className={styles.mailInfoValue}>{emailDetail.folder ? emailDetail.folder.name : 'Root'}</span>
                    </Tooltip>
                  </div>
                  <div className={[styles.mailInfoItem, styles.mailStatus].join(' ')}>
                    <Tooltip placement='bottom' title='Status'>
                      <span className={styles.statusDot} style={{background: emailDetail.status ? emailDetail.status.color : '#333'}} />
                      <span className={styles.mailInfoValue}>{emailDetail.status ? emailDetail.status.name : 'No status'}</span>
                    </Tooltip>
                  </div>
                  <div className={[styles.mailInfoItem, styles.mailAssignee].join(' ')}>
                    <Tooltip placement='bottom' title='Assignee'>
                      <Icon type="user" />
                      <span className={styles.mailInfoValue}>{emailDetail.assignee ? emailDetail.assignee.username : 'No one'}</span>
                    </Tooltip>
                  </div>
                </div>
              </div>

              <div className={(this.state.isActiveReply ? styles.mailContentWrapNoneDisplay : styles.mailContentWrap)}>
                <div className={styles.mailContent}>
                  {emailDetail.content}
                </div>
              </div>

              <div className={(this.state.isActiveReply ? styles.mailAttachmentWrapNoneDisplay : styles.mailAttachmentWrap)}>
                <div className={styles.mailAttachment}>
                  <div className={styles.mailAttachmentTitle}>
                    <Icon type="file" theme="filled" />
                    <span>Attachments ({emailDetail.attachments ? emailDetail.attachments.length : 0})</span>
                  </div>
                  {
                    (emailDetail.attachments && emailDetail.attachments.length > 0) &&
                    <div className={styles.mailAttachmentList}>
                      <ul>
                        {
                          emailDetail.attachments.map(
                            (att) => {
                              return (
                                <li key={att.id}>
                                  <Icon type="paper-clip" />
                                  <span>{att.path}</span>
                                </li>
                              );
                            })
                        }
                      </ul>
                    </div>
                  }
                </div>
              </div>

              <div className={(this.state.isActiveReply ? styles.mailActionWrapNoneDisplay : styles.mailActionWrap)}>
                <div className={styles.mailAction}>
                  <Button icon="rollback" onClick={this.showReplyForm}>Reply</Button>
                  <Button icon="arrow-right">Forward</Button>
                </div>
              </div>

              <div className={(this.state.isActiveReply ? styles.commentWrapNoneDisplay : styles.commentWrap)} id='mailComment'>
                <EmailComments comments={comments}/>
              </div>

              <div className={(this.state.isActiveReply ? styles.replyBody : styles.replyBodyNoneDisplay)}>
                <EmailReply emailDetail={emailDetail} />
              </div>

              <Modal
                title="Setting"
                visible={this.state.settingModalVisible}
                onOk={this.handleSettingOk}
                onCancel={this.handleSettingCancel}
              >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Modal>
            </div>
          </div>
        </Spin>
      </React.Fragment>
    );
  }
}

export default EmailDetail;
