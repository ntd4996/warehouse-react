import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Link, Redirect } from 'react-router-dom';
import {
  Card, Input, Row, Col, Button, Table, Tag, Icon, Modal, message, Form, Select, Tabs, Divider
} from 'antd';
const token = localStorage.getItem('token');
const TabPane = Tabs.TabPane;

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Tags',
  key: 'tags',
  dataIndex: 'tags',
  render: tags => (
    <span>
      {tags.map(tag => {
        let color = tag.length > 5 ? 'geekblue' : 'green';
        if (tag === 'loser') {
          color = 'volcano';
        }
        return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
      })}
    </span>
  ),
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="">Invite {record.name}</a>
      <Divider type="vertical" />
      <a href="">Delete</a>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  tags: ['nice', 'developer'],
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
  tags: ['loser'],
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher'],
}];
class ThemDonXuat extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      user: {},
    };
    this.param = this.props.match.params.detailId;

  }

  componentDidMount() {
    this.request('http://localhost:3001/api/purchase-orders/' + this.param, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + token
      }
    }).then((data) => {
      this.setState({
        data: data,
      }, () => {
        this.request('http://localhost:3001/api/users/' + data.assignees.user.id, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: 'Bearer ' + token
          }
        }).then((data) => {
          this.setState({
            user: data
          });
        });
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
    const user = this.state.user
    const dataGet = this.state.data
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row>
            <Col span={1}>
              <Link to={'/warehouse/export'}>
                <Button shape="circle" icon="arrow-left" />
              </Link>
            </Col>
            <Col span={6}>
              <h2>Chi Tiết Đơn</h2>
            </Col>
            <Col span={12}>
            </Col>
            <Col span={6} style={{ textAlign: 'center' }}>
            </Col>
          </Row>
          <br />
          <Tabs defaultActiveKey="1" >
            <TabPane tab="Thông tin đơn" key="1">
              <Row>
                <Form onSubmit={this.handleSubmit} className="login-form" >
                  <Form.Item
                    {...formItemLayout}
                    label="Mã Đơn"
                    style={{ borderBottom: '0.5px solid #CCCCCC' }}
                  >
                    {dataGet.id}
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    style={{ borderBottom: '0.5px solid #CCCCCC' }}
                    label="Tổng Tiền"
                  >
                    {dataGet.subtotal} ₫
                  </Form.Item>

                  <Form.Item
                    {...formItemLayout}
                    style={{ borderBottom: '0.5px solid #CCCCCC' }}
                    label="Khu Vực"
                  >
                    {dataGet.location}
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    style={{ borderBottom: '0.5px solid #CCCCCC' }}
                    label="Vị Trí"
                  >
                    {dataGet.areas}
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    style={{ borderBottom: '0.5px solid #CCCCCC' }}
                    label="Đơn Vị Quản Lý"
                  >
                    {dataGet.managerDepartment}
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    style={{ borderBottom: '0.5px solid #CCCCCC' }}
                    label="Thời Gian Tạo Đơn"
                  >
                    {new Date(dataGet.createdAt).getDate()}-{new Date(dataGet.createdAt).getMonth() + 1}-{new Date(dataGet.createdAt).getFullYear()} {new Date(dataGet.createdAt).getHours()}:{new Date(dataGet.createdAt).getMinutes()}:{new Date(dataGet.createdAt).getSeconds()}
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    style={{ borderBottom: '0.5px solid #CCCCCC' }}
                    label="Ngày Xuất Kho"
                  >
                    {new Date(dataGet.outputDate).getDate()}-{new Date(dataGet.outputDate).getMonth() + 1}-{new Date(dataGet.outputDate).getFullYear()}
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    style={{ borderBottom: '0.5px solid #CCCCCC' }}
                    label="Người Tạo Đơn"
                  >
                    {user.name} ({user.username})
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    style={{ borderBottom: '0.5px solid #CCCCCC' }}
                    label="Chỉnh Sửa Lần Cuối"
                  >
                    {new Date(dataGet.updatedAt).getDate()}-{new Date(dataGet.updatedAt).getMonth() + 1}-{new Date(dataGet.updatedAt).getFullYear()} {new Date(dataGet.updatedAt).getHours()}:{new Date(dataGet.updatedAt).getMinutes()}:{new Date(dataGet.updatedAt).getSeconds()}
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    style={{ borderBottom: '0.5px solid #CCCCCC' }}
                    label="Trạng Thái"
                  >
                    <Table columns={columns} dataSource={data} />
                  </Form.Item>
                </Form>

              </Row>
            </TabPane>
            <TabPane tab="Danh sách vật tư" key="2">Content of Tab Pane 2</TabPane>
          </Tabs>

        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(ThemDonXuat);