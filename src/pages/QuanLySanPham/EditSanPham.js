import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Link, Redirect } from 'react-router-dom';
import {
  Card, Input, Row, Col, Button, Table, Tag, Icon, Modal, message, Form, Select
} from 'antd';
const token = localStorage.getItem('token');

class EditSanPham extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataTable: [],
      visibleDelete: false,
      record: {name:'',id:''},
      visibleCrate: false,
      visibleEdit: false,
      sanpham:[],
      khohang:[],
    };
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
        this.request('http://localhost:3000/api/product/' + this.props.record.id, {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: 'Bearer ' + token
          },
          body: JSON.stringify(values)
        }).then((data) => {
          message.success('Sửa sản phẩm thành công');
          this.props.closeModalEdit();
          this.props.form.resetFields();

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
  render() {
    const { getFieldDecorator } = this.props.form;
    const record = this.props.record;
    const kho = this.state.khohang;
    const optionItems = kho.map((kho) =>
                <Select.Option key={kho.id}>{kho.name}</Select.Option>
            );
    return (
      <Modal
        title="Thêm Sản Phẩm Mới"
        visible={this.props.visible}
        onOk={this.handleSubmit}
        onCancel={this.props.showModalEdit}
      >
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('code', {
              initialValue: record.code,
              rules: [{ required: true, message: 'Mã Vật Tư không được để trống!' }],
            })(
              <Input placeholder="Mã Vật Tư" size="large" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('name', {
              initialValue: record.name,
              rules: [{ required: true, message: 'Tên Vật Tư không được để trống!' }],
            })(
              <Input placeholder="Tên Vật Tư" size="large" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('unit', {
              initialValue: record.unit,
            })(
              <Input placeholder="Đơn Vị" size="large" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('kind', {
              initialValue: record.kind,
            })(
              <Input placeholder="Loại" size="large" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('description', {
              initialValue: record.description,
            })(
              <Input placeholder="Ghi Chú" size="large" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('manufacturer', {
              initialValue: record.manufacturer,
            })(
              <Input placeholder="Nhà Sản Xuất" size="large" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('machinePart', {
              initialValue: record.machinePart,
            })(
              <Input placeholder="Thiết Bị Sử Dụng" size="large" />
            )}
          </Form.Item>
          <Form.Item >
              {getFieldDecorator('warehouseId', {
              initialValue: record.warehouseId,
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

export default Form.create()(EditSanPham);
