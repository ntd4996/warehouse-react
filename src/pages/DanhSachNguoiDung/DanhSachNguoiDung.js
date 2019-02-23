import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Link, Redirect } from 'react-router-dom';
import {
  Card, Input, Row, Col, Button, Table, Tag, Icon, Modal, message, Form, Select
} from 'antd';
const token = localStorage.getItem('token');

class DanhSachNguoiDung extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataTable: [],
      visibleDelete: false,
      record: {},
      visibleCrate: false,
      khohang:[],
    };
  }
  showModal = (record) => {
    this.setState({
      visibleDelete: true,
      record: record.id,
    });
    this.forceUpdate();
  }
  showModalCreate = () => {
    this.setState({
      visibleCrate: true,
    });
    this.forceUpdate();
  }
  handleOk = () => {
    this.request('http://localhost:3000/api/users/' + this.state.record, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + token
      }
    }).then(() => {
      this.request('http://localhost:3000/api/users?filter={"populate":"warehouseId"}', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer ' + token
        }
      }).then((data) => {
        this.setState({
          visibleDelete: false,
          dataTable: data.items
        });
        message.success('Xoá người dùng thành công');
        this.forceUpdate();
      });
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleCancel = (e) => {
    this.setState({
      visibleDelete: false,
    });
  }
  handleCancelCreate = (e) => {
    this.setState({
      visibleCrate: false,
    });
    this.props.form.resetFields();

  }
  componentDidMount() {
    this.request('http://localhost:3000/api/users?filter={"populate":"warehouseId"}', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + token
      }
    }).then((data) => {
      this.setState({
        dataTable: data.items
      });
      this.forceUpdate();
    });
    this.request('http://localhost:3000/api/warehouses', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + token
      }
    }).then((data) => {
      this.setState({
        khohang: data.items
      });
      this.forceUpdate();
    });
  }

  request = (url, option) => {
    const newOption = option;
    return fetch(url, option)
      .then((response) => {
        // DELETE and 204 do not return data by default
        // using .json will report an error.
        if (newOption.method === 'DELETE' || response.status === 204) {
          return response;
        }
        // console.log(response);
        return response.json();
      })
      .then((data) => data);
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
        key: 'role'
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
            date.getDate()
            + '/'
            + (date.getMonth() + 1)
            + '/'
            + date.getFullYear()
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
            />
            <Button
              type="danger"
              shape="circle"
              icon="delete"
              onClick={() => console.log('a')}
              size="small"
              onClick={() => this.showModal(record)}
            />
          </span>
        )
      }
    ];
    const kho = this.state.khohang;
    const optionItems = kho.map((kho) =>
                <Select.Option key={kho.id}>{kho.name}</Select.Option>
            );

    const { getFieldDecorator } = this.props.form;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row>
            <Col span={6}>
              <h2>Quản Lý Người Dùng</h2>
            </Col>
            <Col span={12}>
            </Col>
            <Col span={6} style={{ textAlign: 'center' }}>
              <Button type="primary" size="large" onClick={this.showModalCreate}>
                Thêm Người Dùng
              </Button>
            </Col>
          </Row>
          <br />
          <Row>
            <Table
              columns={columns}
              align="center"
              dataSource={this.state.dataTable}
            // onRow={(record) => ({
            //   onClick: () => {
            //     console.log(record);
            //   } // click row
            // })}
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
              {getFieldDecorator('hoten', {
                initialValue: '',
                rules: [{ required: true, message: 'Họ tên không được để trống!' }],
              })(
                <Input placeholder="Họ Tên" size="large" />
              )}
            </Form.Item>
            <Form.Item style={{ marginTop: '25px' }}>
              {getFieldDecorator('taikhoan', {
                initialValue: '',
                rules: [{ required: true, message: 'Tài khoản không được để trống!' }],
              })(
                <Input placeholder="Tài Khoản" size="large" />
              )}
            </Form.Item>
            <Form.Item style={{ marginTop: '25px' }}>

              {getFieldDecorator('email', {
                initialValue: '',

                rules: [{ required: true, message: 'Email không được để trống!' }],
              })(
                <Input placeholder="Email" size="large" />
              )}
            </Form.Item>
            <Form.Item style={{ marginTop: '25px' }}>

              {getFieldDecorator('matkhau', {
                initialValue: '',

                rules: [{ required: true, message: 'Mật khẩu không được để trống!' }],
              })(
                <Input size="large" type="password" placeholder="Password" />
              )}
            </Form.Item>
            <Form.Item style={{ marginTop: '25px' }}>

              {getFieldDecorator('quyen', {
                initialValue: '',

                rules: [{ required: true, message: 'Quyền không được để trống!' }],
              })(
                <Input placeholder="Quyền" size="large" />
              )}
            </Form.Item>
            <Form.Item style={{ marginTop: '25px' }}>
              {getFieldDecorator('khohang', {
                rules: [{ required: true, message: 'Kho hàng không được để trống!' }],
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
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(DanhSachNguoiDung);
