import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Link, Redirect } from 'react-router-dom';
import {
  Card, Input, Row, Col, Button, Table, Tag, Icon, Modal, message, Form, Select
} from 'antd';
const token = localStorage.getItem('token');

class EditNguoiDung extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      khohang: [],
      visibleEdit: false,
      recordEdit:{},
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.request('http://localhost:3000/api/users/' + this.props.recordEdit.id, {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: 'Bearer ' + token
          },
          body: JSON.stringify(values)
        }).then((data) => {
          message.success('Sửa kho hàng thành công');
          this.props.closeModalEdit();
        });


      }
    });
  }
  componentDidMount() {
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
    const kho = this.state.khohang;
    const optionItems = kho.map((kho) =>
      <Select.Option key={kho.id}>{kho.name}</Select.Option>
    );
    const { getFieldDecorator } = this.props.form;
    const recordEdit = this.props.recordEdit;
    return (

      <Modal
        title="Thêm Người Dùng Mới"
        visible={this.props.visibleEdit}
        onOk={this.handleSubmit}
        onCancel={this.props.closeModalEdit}
      >
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('name', {
              initialValue: recordEdit.name,
              rules: [{ required: true, message: 'Họ tên không được để trống!' }],
            })(
              <Input placeholder="Họ Tên" size="large" />
            )}
          </Form.Item>
          <Form.Item style={{ marginTop: '25px' }}>
            {getFieldDecorator('username', {
              initialValue: recordEdit.username,
              rules: [{ required: true, message: 'Tài khoản không được để trống!' }],
            })(
              <Input placeholder="Tài Khoản" size="large" />
            )}
          </Form.Item>
          <Form.Item style={{ marginTop: '25px' }}>

            {getFieldDecorator('email', {
              initialValue: recordEdit.email,

              rules: [{
                type: 'email', message: 'Không đúng định dạng email!',
              }, { required: true, message: 'Email không được để trống!' }],
            })(
              <Input placeholder="Email" size="large" />
            )}
          </Form.Item>
          <Form.Item style={{ marginTop: '25px' }}>

            {getFieldDecorator('password', {
              initialValue: '',

              rules: [{ required: true, message: 'Mật khẩu không được để trống!' }],
            })(
              <Input size="large" type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Form.Item style={{ marginTop: '25px' }}>

            {getFieldDecorator('role', {
              initialValue: recordEdit.role,

              rules: [{ required: true, message: 'Quyền không được để trống!' }],
            })(
              <Select
                size="large"
                placeholder="Quyền"
              >
                <Select.Option key='admin'>Quản Trị Viên</Select.Option>
                <Select.Option key='technical'>Quản Lý Kỹ Thuật</Select.Option>
                <Select.Option key='stocker'>Quản Lý Kho</Select.Option>
                <Select.Option key='repair'>Quản Lý Sửa Chữa</Select.Option>
                <Select.Option key='user'>Người Dùng Thường</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item style={{ marginTop: '25px' }}>
            {getFieldDecorator('warehouseId', {
              initialValue: recordEdit.warehouse.id,

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
    );
  }
}

export default Form.create()(EditNguoiDung);
