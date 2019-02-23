import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Link } from 'react-router-dom';
import {
  Card, Input, Row, Col, Button, Table, Tag
} from 'antd';
const Search = Input.Search;
const token = localStorage.getItem('token');
const data = [
  {
    key: '1',
    name: '1232132131231213',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
];

class QuanLyXuatKho extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataTable: []
    };
  }

  componentDidMount() {
    this.request('http://localhost:3001/api/purchase-orders?orderType=out', {
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
  }

  request = (url, option) => {
    const newOption = option;
    return fetch(url, option)
      .then((response) => {
        // DELETE and 204 do not return data by default
        // using .json will report an error.
        if (newOption.method === 'DELETE' || response.status === 204) {
          console.log(response.text());
          return response.text();
        }
        // console.log(response);
        return response.json();
      })
      .then((data) => data);
  };

  render() {
    const columns = [
      {
        title: 'Mã Đơn',
        align: 'center',
        dataIndex: 'id',
        width: '15%',
        key: 'id',
        render: (text, record) => (
          <Link to={'/warehouse/detail/' + text}>{text}</Link>
        )
      },
      {
        align: 'center',
        title: 'Vị Trí',
        width: '15%',
        dataIndex: 'location',
        key: 'location'
      },
      {
        align: 'center',
        title: 'Khu Vực',
        width: '15%',
        dataIndex: 'areas',
        key: 'areas'
      },
      {
        align: 'center',
        title: 'Đơn Vị Quản Lý',
        width: '15%',
        dataIndex: 'managerDepartment',
        key: 'managerDepartment'
      },
      {
        align: 'center',
        title: 'Tổng Tiền',
        width: '10%',
        dataIndex: 'subtotal',
        key: 'subtotal'
      },
      {
        align: 'center',
        title: 'Trạng Thái',
        width: '10%',
        key: 'status',
        dataIndex: 'status',
        render: (status) => {
          if (status === 'pending') {
            return <Tag color="orange">{status}</Tag>;
          }
        }
      },
      {
        align: 'center',
        width: '10%',
        title: 'Ngày Xuất Kho',
        dataIndex: 'outputDate',
        key: 'outputDate',
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
        width: '10%',
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
            />
          </span>
        )
      }
    ];

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row>
            <Col span={6}>
              <h2>Quản Lý Xuất Kho</h2>
            </Col>
            <Col span={12}>
              <Search
                placeholder="Nhập từ khóa muốn tìm kiếm..."
                onSearch={(value) => console.log(value)}
                enterButton
                size="large"
              />
            </Col>
            <Col span={6} style={{ textAlign: 'center' }}>
              <Button type="primary" icon="plus" size="large">
                Xuất Kho
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
      </PageHeaderWrapper>
    );
  }
}

export default QuanLyXuatKho;
