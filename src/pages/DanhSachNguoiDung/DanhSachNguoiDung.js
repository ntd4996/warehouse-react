import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getListUser, createUser, deleteUser } from '@/services/user';
import { getListWarehouses } from '@/services/warehouse';
import {
  Card, Input, Row, Col, Button, Table, Modal, message, Form, Select
} from 'antd';
import { roleList } from '../../constants/roleList';
import EditNguoiDung from './EditNguoiDung';

class DanhSachNguoiDung extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataTable: [],
      visibleDelete: false,
      record: {},
      visibleCrate: false,
      khohang: [],
      visibleEdit: false,
      recordEdit: {
        created_at: '2019-02-21T19:48:00.160Z',
        email: 'dat@123.vn',
        id: '5c6f0070fbacf8cc26108856',
        is_active: true,
        name: 'dat',
        role: 'user',
        updated_at: '2019-02-21T19:48:00.160Z',
        username: 'dat',
        warehouse: {
          created_at: '2018-12-03T03:36:55.957Z',
          id: '5c04a4d712fdcb2034ff81ad',
          name: 'Hải Phòng',
          updated_at: '2018-12-19T07:27:22.430Z'
        }
      },
      loading: false,
      pagination: {
        total: 1,
        current: 1,
        pageSize: 10
      }
    };
  }

  showModalEdit = (record) => {
    this.setState({
      visibleEdit: !this.state.visibleEdit,
      recordEdit: record
    });
    // this.forceUpdate();
  };

  closeModalEdit = (record) => {
    this.setState({
      visibleEdit: !this.state.visibleEdit,
      loading: true
    });
    getListUser('?filter={"populate":"warehouseId"}')
      .then((data) => {
        if (data) {
          this.setState({
            dataTable: data.items,
            pagination: {
              total: data.count,
              current: 1,
              pageSize: 10
            },
            loading: false
          });
          // this.forceUpdate();
        }
      });
  };

  showModal = (record) => {
    this.setState({
      visibleDelete: true,
      record: record.id
    });
    // this.forceUpdate();
  };

  showModalCreate = () => {
    getListWarehouses()
      .then((data) => {
        if (data) {
          this.setState({
            khohang: data.items
          });
        }
      });
    this.setState({
      visibleCrate: true
    });
    // this.forceUpdate();
  };

  handleOk = () => {
    deleteUser(this.state.record)
      .then(() => {
        this.setState({ loading: true });
        getListUser('?filter={"populate":"warehouseId"}')
          .then((data) => {
            if (data) {
              this.setState({
                visibleDelete: false,
                dataTable: data.items,
                pagination: {
                  total: data.count,
                  current: 1,
                  pageSize: 10
                },
                loading: false
              });
              message.success('Xoá người dùng thành công');
              // this.forceUpdate();
            }
          });
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        createUser(values)
          .then(() => {
            this.handleCancelCreate();
            this.setState({ loading: true });
            getListUser('?filter={"populate":"warehouseId"}')
              .then((data) => {
                if (data) {
                  this.setState({
                    dataTable: data.items,
                    pagination: {
                      total: data.count,
                      current: 1,
                      pageSize: 10
                    },
                    loading: false
                  });
                  message.success('Thêm người dùng thành công');
                }
              });
          });
      }
    });
  };

  handleCancel = () => {
    this.setState({
      visibleDelete: false
    });
  };

  handleCancelCreate = () => {
    this.setState({
      visibleCrate: false
    });
    this.props.form.resetFields();
  };

  componentDidMount() {
    this.setState({ loading: true });
    getListUser('?filter={"populate":"warehouseId"}')
      .then((data) => {
        if (data.items) {
          this.setState({
            dataTable: data.items,
            pagination: {
              total: data.count,
              current: 1,
              pageSize: 10
            },
            loading: false
          });
        }
      });
  };

  handleTableChange = (pagination) => {
    this.setState({ loading: true });
    getListUser('?filter={"populate":"warehouseId"}&page=' + pagination.current)
      .then((data) => {
        if (data.items) {
          this.setState({
            dataTable: data.items,
            pagination: {
              total: data.count,
              current: pagination.current,
              pageSize: 10
            },
            loading: false
          });
        }
      });
    console.log(pagination);
  };

  render() {
    const columns = [
      {
        title: 'ID',
        align: 'center',
        dataIndex: 'id',
        key: 'id',
        width: '15%'
      },
      {
        align: 'center',
        title: 'Họ Tên',
        dataIndex: 'name',
        key: 'name'
      },
      {
        align: 'center',
        title: 'Quyền',
        dataIndex: 'role',
        key: 'role',
        render: (role) => ((roleList[role]) ? roleList[role] : '')
      },
      {
        align: 'center',
        title: 'Kho Hàng',
        dataIndex: 'warehouse.name',
        key: 'warehouse'
      },
      {
        align: 'center',
        title: 'Ngày Tham Gia',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (outputDate) => {
          const date = new Date(outputDate);
          return (
            date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
          );
        }
      },
      {
        align: 'center',
        title: '',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button
              type="primary"
              shape="circle"
              icon="edit"
              size="small"
              style={{ marginRight: '5px' }}
              onClick={() => this.showModalEdit(record)}

            />
            <Button
              type="danger"
              shape="circle"
              icon="delete"
              // onClick={() => console.log('a')}
              size="small"
              onClick={() => this.showModal(record)}
            />
          </span>
        )
      }
    ];
    const kho = this.state.khohang;
    const optionItems = kho.map((item) => <Select.Option key={item.id}>{item.name}</Select.Option>
    );
    console.log(this.state);
    const { getFieldDecorator } = this.props.form;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row>
            <Col span={6}>
              <h2>Quản Lý Người Dùng</h2>
            </Col>
            <Col span={12}/>
            <Col span={6} style={{ textAlign: 'center' }}>
              <Button type="primary" size="large" onClick={this.showModalCreate}>
                Thêm Người Dùng
              </Button>
            </Col>
          </Row>
          <br/>
          <Row>
            <Table
              columns={columns}
              align="center"
              dataSource={this.state.dataTable}
              pagination={this.state.pagination}
              onChange={this.handleTableChange}
              loading={this.state.loading}
            />
          </Row>
        </Card>
        <Modal
          title="Xác Nhận Xóa"
          visible={this.state.visibleDelete}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Bạn có chắc chắn muốn xóa người dùng này?</p>
        </Modal>
        <Modal
          title="Thêm Người Dùng Mới"
          visible={this.state.visibleCrate}
          onOk={this.handleSubmit}
          onCancel={this.handleCancelCreate}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('name', {
                initialValue: '',
                rules: [{
                  required: true,
                  message: 'Họ tên không được để trống!'
                }]
              })(
                <Input placeholder="Họ Tên" size="large"/>
              )}
            </Form.Item>
            <Form.Item style={{ marginTop: '25px' }}>
              {getFieldDecorator('username', {
                initialValue: '',
                rules: [{
                  required: true,
                  message: 'Tài khoản không được để trống!'
                }]
              })(
                <Input placeholder="Tài Khoản" size="large"/>
              )}
            </Form.Item>
            <Form.Item style={{ marginTop: '25px' }}>

              {getFieldDecorator('email', {
                initialValue: '',

                rules: [{
                  type: 'email',
                  message: 'Không đúng định dạng email!'
                }, {
                  required: true,
                  message: 'Email không được để trống!'
                }]
              })(
                <Input placeholder="Email" size="large"/>
              )}
            </Form.Item>
            <Form.Item style={{ marginTop: '25px' }}>

              {getFieldDecorator('password', {
                initialValue: '',

                rules: [{
                  required: true,
                  message: 'Mật khẩu không được để trống!'
                }]
              })(
                <Input size="large" type="password" placeholder="Password"/>
              )}
            </Form.Item>
            <Form.Item style={{ marginTop: '25px' }}>

              {getFieldDecorator('role', {
                initialValue: '',

                rules: [{
                  required: true,
                  message: 'Quyền không được để trống!'
                }]
              })(
                <Select
                  size="large"
                  placeholder="Quyền"
                >
                  <Select.Option key="admin">Quản Trị Viên</Select.Option>
                  <Select.Option key="technical">Quản Lý Kỹ Thuật</Select.Option>
                  <Select.Option key="stocker">Quản Lý Kho</Select.Option>
                  <Select.Option key="repair">Quản Lý Sửa Chữa</Select.Option>
                  <Select.Option key="user">Người Dùng Thường</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item style={{ marginTop: '25px' }}>
              {getFieldDecorator('warehouseId', {
                rules: [{
                  required: true,
                  message: 'Kho hàng không được để trống!'
                }]
              })(
                <Select
                  size="large"
                  placeholder="Kho Hàng"
                >
                  {optionItems}
                </Select>
              )}

            </Form.Item>
          </Form>
        </Modal>
        <EditNguoiDung
          showModalEdit={this.showModalEdit}
          visibleEdit={this.state.visibleEdit}
          recordEdit={this.state.recordEdit}
          closeModalEdit={this.closeModalEdit}
        />
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(DanhSachNguoiDung);
