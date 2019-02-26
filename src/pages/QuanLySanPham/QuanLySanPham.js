import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Link, Redirect } from 'react-router-dom';
import {
  Card, Input, Row, Col, Button, Table, Tag, Icon, Modal, message, Form, Select
} from 'antd';
import EditSanPham from './EditSanPham';

const token = localStorage.getItem('token');

class QuanLySanPham extends PureComponent {
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
  showModalEdit = (record) => {
    console.log(record)
    this.setState({
      visibleEdit: !this.state.visibleEdit,
      record: record,
    })
    this.props.form.resetFields();


  }
  closeModalEdit = (record) => {
    this.setState({
      visibleEdit: !this.state.visibleEdit,
    })
    this.request('http://localhost:3001/api/products', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + token
      }
    }).then((data) => {
      this.setState({
        sanpham: data.items
      });
      this.forceUpdate();
    });
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
    this.request('http://localhost:3001/api/products/' + this.state.record, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + token
      }
    }).then(() => {
      this.request('http://localhost:3001/api/products', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer ' + token
        }
      }).then((data) => {
        this.setState({
          visibleDelete: false,
          sanpham: data.items
        });
        message.success('Xoá Sản Phẩm thành công');
        this.forceUpdate();
      });
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.request('http://localhost:3001/api/products', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: 'Bearer ' + token
          },
          body: JSON.stringify(values)
        }).then(() => {
          this.setState({
            visibleCrate: false,
          });
          this.props.form.resetFields();
          this.request('http://localhost:3001/api/products', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json; charset=utf-8',
              Authorization: 'Bearer ' + token
            }
          }).then((data) => {
            this.setState({
              visibleCrate: false,
              sanpham: data.items
            });
            message.success('Thêm Sản Phẩm thành công');
            this.forceUpdate();
          });
        });
      }
    });
  }

  handleCancel = (e) => {
    this.setState({
      visibleDelete: false,
    });
    this.props.form.resetFields();

  }
  handleCancelCreate = (e) => {
    this.setState({
      visibleCrate: false,
    });
    this.props.form.resetFields();

  }
  componentDidMount() {
    this.request('http://localhost:3001/api/products?sort={"createdAt":-1}', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + token
      }
    }).then((data) => {
      this.setState({
        sanpham: data.items
      });
      this.forceUpdate();
    });
    this.request('http://localhost:3001/api/warehouses', {
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
        width: '22%'
      },
      {
        align: 'center',
        title: 'Mã Vật Tư',
        dataIndex: 'code',
        key: 'code',
        width: '22%'
      },
      {
        align: 'center',
        title: 'Tên Vật Tư',
        dataIndex: 'name',
        key: 'name',
        width: '22%'
      },
      {
        align: 'center',
        title: 'Nhà Sản Xuất',
        dataIndex: 'manufacturer',
        key: 'manufacturer',
        width: '22%'
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
              <h2>Quản Lý Sản Phẩm</h2>
            </Col>
            <Col span={12}>
            </Col>
            <Col span={6} style={{ textAlign: 'center' }}>
              <Button type="primary" size="large" onClick={this.showModalCreate}>
                Thêm Mới Sản Phẩm
              </Button>
            </Col>
          </Row>
          <br />
          <Row>
            <Table
              columns={columns}
              align="center"
              dataSource={this.state.sanpham}
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
          <p>Bạn có chắc chắn muốn xóa Sản Phẩm này?</p>
        </Modal>
        <Modal
          title="Thêm Sản Phẩm Mới"
          visible={this.state.visibleCrate}
          onOk={this.handleSubmit}
          onCancel={this.handleCancelCreate}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('code', {
                initialValue: '',
                rules: [{ required: true, message: 'Mã Vật Tư không được để trống!' }],
              })(
                <Input placeholder="Mã Vật Tư" size="large" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('name', {
                initialValue: '',
                rules: [{ required: true, message: 'Tên Vật Tư không được để trống!' }],
              })(
                <Input placeholder="Tên Vật Tư" size="large" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('unit', {
                initialValue: '',
              })(
                <Input placeholder="Đơn Vị" size="large" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('kind', {
                initialValue: '',
              })(
                <Input placeholder="Loại" size="large" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('description', {
                initialValue: '',
              })(
                <Input placeholder="Ghi Chú" size="large" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('manufacturer', {
                initialValue: '',
              })(
                <Input placeholder="Nhà Sản Xuất" size="large" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('machinePart', {
                initialValue: '',
              })(
                <Input placeholder="Thiết Bị Sử Dụng" size="large" />
              )}
            </Form.Item>
            <Form.Item >
              {getFieldDecorator('warehouseId', {
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
        <EditSanPham visible={this.state.visibleEdit} record={this.state.record} showModalEdit={this.showModalEdit} closeModalEdit={this.closeModalEdit}/>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(QuanLySanPham);
