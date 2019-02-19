import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  InputNumber,
  Modal,
  message,
  Divider,
  Tooltip,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './SettingTeam.less';
import { tableData } from './table-data-nested';

const FormItem = Form.Item;

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="Add new Team"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="Name">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: 'Please input new team！', min: 5 }],
        })(<Input placeholder="new team" />)}
      </FormItem>
    </Modal>
  );
});

/* eslint react/no-multi-comp:0 */
@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
class SettingTeam extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
    tableData: {list: tableData},
  };


  columns = [
    {
      title: 'No',
      dataIndex: 'name',
      width: '8%'
    },
    {
      title: 'Name',
      dataIndex: 'title',
      width: '15%'
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      width: '45%'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '15%',
      render: function (row) {
        var color = '';
        if (row === 'Enabled') {
          color = '#108ee9';
        } else {
          color = '#f50';
        }
        return (
          <label className={'ant-tag-has-color ant-tag custom-status'} style={{ backgroundColor: color }}>{row}</label>
        )
      }
    },
    {
      title: 'Action',
      width: '15%',
      render: (text, record) => (
        <Fragment>
          <Tooltip title="Edit">
            <Icon style={{ color: 'black' }} type="edit" theme="filled" />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="Delete">
            <Icon type="close" style={{ color: 'red' }} />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="Member management">
            <Icon type="team" theme="outlined" style={{ color: '#1890ff' }} />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="Folder Setting">
            <Icon type="folder" theme="filled" />
          </Tooltip>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }


  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  render() {
    const {
      rule: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues, tableData } = this.state;
    console.log('fda ' + tableData);
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div>
            <div style={{ position: 'absolute', top: '14px', right: '20px' }}>
              <Button  icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                Add Team
              </Button>
            </div>
            <StandardTable
              style={{ marginTop: '35px' }}
              selectedRows={selectedRows}
              //loading={loading}
              data={tableData}
              columns={this.columns}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderWrapper>
    );
  }
}

export default SettingTeam;
