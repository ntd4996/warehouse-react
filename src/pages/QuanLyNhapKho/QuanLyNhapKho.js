import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Link } from 'react-router-dom';
import {
  Card, Input, Row, Col, Button, Table, Tag, Icon
} from 'antd';
const Search = Input.Search;
const token = localStorage.getItem('token');

class QuanLyNhapKho extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataTable: []
    };
  }

  componentDidMount() {
    this.request('http://localhost:3000/api/purchase-orders?query={"orderType":"out"}&sort={"createdAt":-1}', {
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
            return <Tag color="orange"><Icon type="clock-circle" /></Tag>;
          }
          if (status === 'rejected') {
            return <Tag color="red"><Icon type="close-circle" /></Tag>;
          }
          if (status === 'accepted') {
            return <Tag color="green"><Icon type="check-circle" /></Tag>;
          }
        }
      },
      {
        align: 'center',
        width: '11%',
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
        width: '9%',
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
              <h2>Quản Lý Nhập Kho</h2>
            </Col>
            <Col span={12}>
              {/* <Search
                placeholder="Nhập từ khóa muốn tìm kiếm..."
                prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                enterButton={<Button type="primary" icon="plus" size="large" />}
                size="large"
              /> */}
            </Col>
            <Col span={6} style={{ textAlign: 'center' }}>
              <Button type="primary" icon="plus" size="large">
                Nhập Kho
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

export default QuanLyNhapKho;
