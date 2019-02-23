import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Link, Redirect } from 'react-router-dom';
import {
  Card, Input, Row, Col, Button, Table, Tag, Icon, Modal, message, Form, Select
} from 'antd';
const token = localStorage.getItem('token');

class EditKhoHang extends PureComponent {
  constructor(props) {
    super(props);
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
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.request('http://localhost:3000/api/warehouses/' + this.props.record.id, {
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
  render() {
    const { getFieldDecorator } = this.props.form;
    const record = this.props.record;
    return (
      <Modal
        title="Thêm Kho Hàng Mới"
        visible={this.props.visible}
        onOk={this.handleSubmit}
        onCancel={this.props.showModalEdit}
      >
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('name', {
              initialValue: record.name,
              rules: [{ required: true, message: 'Kho hàng không được để trống!' }],
            })(
              <Input placeholder="Kho Hàng" size="large" />
            )}
          </Form.Item>

        </Form>
      </Modal>
    );
  }
}

export default Form.create()(EditKhoHang);
