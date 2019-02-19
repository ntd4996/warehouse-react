import React, { Component } from 'react';
import {
  Card,
  Icon,
  Tooltip,
  Button,
  Pagination,
  Tag
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TreeTableRootCollapse from '@/components/TreeTable/TreeTableRootCollapse';
import EmailSearch from './components/SearchForm/EmailSearch';
import moment from 'moment';
import { connect } from 'dva';
import styles from './EmailList.less';
import SubHeader from "../../components/SubHeader/SubHeader";
const pageSizes = ['10', '25', '50', '100'];
import router from "umi/router";
import { toSearchParam } from "../../utils/emailProcessing.utils";
const columns = [
  {
    key: 'priority',
    name: 'Priority',
    style: {width: '103px'},
    render: (row) => {
      return(
        <div>
          <span className='email-priority'>
          <Tooltip title={row.priority}>
            <Icon type='star' theme={row.priority === 'NORMAL' ? '' : 'filled'} className={styles['priority' + row.priority]}/>
          </Tooltip>
        </span>
          {
            (row.attachments && row.attachments.length > 0) &&
            <span className='email-attachment'>
                <Icon type="paper-clip"/>
              </span>
          }
        </div>
      );
    }
  },
  {
    key: 'subject',
    name: 'Subject',
    showTreeLine: true,
    style: {minWidth: '220px'},
    render: (row) => {
      return(
        <span className='email-list-subject-content'>
          <span>{row.subject}</span>
        </span>
      );
    }
  },
  {
    key: 'assigneeName',
    name: 'Assignee',
    style: {width: '100px'},
  },
  {
    key: 'from',
    name: 'From',
    style: {width: '220px'},
  },
  {
    key: 'createdAt',
    name: 'Send date',
    style: {width: '200px', textAlign: 'center'},
    render: function (row) {
      return moment(row.createdAt).format('YYYY/MM/DD h:mm:ss A');
    }
  },
  {
    key: 'status',
    name: 'Status',
    style: {width: '100px'},
    render: function (row) {
      return (
        <Tag color={row.status.color} key={row.status.id}>{row.status.name}</Tag>
      )
    }
  },
  {
    key: 'action',
    name: 'Setting',
    style: {width: '70px', textAlign: 'center'},
    render: function () {
      return (
        <div style={{ display: 'block', textAlign: 'center'}} >
          <Tooltip title='Setting'>
            <Button icon='setting' shape='circle' type='dashed' size='small'/>
          </Tooltip>
        </div>
      )
    }
  }
];
const headerInfo = {
  name: 'Email list',
  breadcrumb: [
    {
      name: 'Home'
    },
    {
      name: 'Email list'
    }
  ]
};
@connect(({ user, menuTeams, foldersTeam, emails, loading }) => ({
  emails,
  menuTeams,
  foldersTeam,
  fetchLoading: loading.effects['emails/fetch'],
  teamLoading: loading.effects['menuTeams/fetch'],
  currentUser: user.currentUser,
}))
class EmailList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCloseAll: false
    };
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const teamId = match.params['teamId'];
    const folderId = match.params['folderId'];

    if (!this.props.menuTeams.currentTeam.id && !this.props.foldersTeam.currentFolder) {

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

    this.setState({
      teamId,
      folderId
    });
  }

  toggleSearchForm = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'emails/saveSearchStatus',
      isShowSearchForm: !this.props.emails.isShowSearchForm,
    });
  };
  onShowSizeChange = (current, pageSize) => {
    const pageParam = "&page=" + (current - 1) + "&size=" + pageSize;
    const param = toSearchParam(this.props.emails.searchData) + pageParam;
    const { dispatch } = this.props;
    dispatch({
      type: 'emails/fetch',
      payload: param,
    });
  };
  onChangePaging = (pageNumber, pageSize) => {
    const pageParam = "&page=" + (pageNumber - 1);
    const param = toSearchParam(this.props.emails.searchData) + pageParam;
    const { dispatch } = this.props;
    dispatch({
      type: 'emails/fetch',
      payload: param,
    });
  };
  rowClick = (row) => {
    if (this.props.history) {
      this.props.history.push('/mail/team/'+ this.state.teamId +'/folder/' + this.state.folderId + '/detail/' + row.id);
    }
  };
  toggleTreeTable = () => {
    if (this.state.isCloseAll) {
      this.treeTable.closeAll();
    } else {
      this.treeTable.openAll();
    }
    this.setState({isCloseAll: !this.state.isCloseAll});
  };
  render() {

    const items = this.props.emails.items || [];
    const pageInfo = this.props.emails.pageInfo || {};
    return (
      <React.Fragment>
        <SubHeader pageInfo={headerInfo} />
        <div className="page-content-wrap">
          <div className={styles.pageHeader}>
              <Tooltip title={this.state.isCloseAll ? 'Collapse all' : 'Expand all'}>
                <Button
                  onClick={this.toggleTreeTable}
                  shape='circle'
                  className={this.state.isCloseAll ? styles.btnExp : styles.btnCol}
                  type={this.state.isCloseAll ? 'primary' : 'dashed'}
                >
                  <span className={this.state.isCloseAll ? styles.btnCollapseTreeActive : styles.btnCollapseTree } />
                </Button>
              </Tooltip>
            </div>
            <div className='header-action-wrap'>
              <Tooltip title='Search'>
                <Button
                  onClick={this.toggleSearchForm}
                  shape='circle'
                  type={this.props.emails.isShowSearchForm ? 'primary' : 'dashed'}
                  title='Search'
                  icon='search'
                />
              </Tooltip>
            </div>
          </div>
          {
            this.props.emails.isShowSearchForm &&
            <EmailSearch />
          }
          <Card bordered={false}>
            <div className={styles.tableList}>
              <div className={styles.tableListContent}>
                <TreeTableRootCollapse
                  items={items}
                  columns={columns}
                  closeAll={true}
                  rowClick={this.rowClick}
                  loading={this.props.fetchLoading || this.props.teamLoading}
                  ref={instance => { this.treeTable = instance; }}
                />
              </div>
              <div className='pagination-wrap'>
                <Pagination
                  defaultCurrent={1}
                  pageSizeOptions={pageSizes}
                  showSizeChanger
                  current={pageInfo.pageNumber + 1}
                  onShowSizeChange={this.onShowSizeChange}
                  onChange={this.onChangePaging}
                  total={pageInfo.totalElements} />
              </div>
            </div>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default EmailList;
