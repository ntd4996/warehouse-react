import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {
  Card,
  Input,
  Row,
  Col,
  Button,
  Table,
  Tag,
  Divider,
  Drawer
} from 'antd';
const Search = Input.Search;

const data = [
  {
    key: '1',
    name: 'John Brown assadnd asdjnasdj asjdnas',
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
const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
      color: 'rgba(0,0,0,0.65)'
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: 'inline-block',
        color: 'rgba(0,0,0,0.85)'
      }}
    >
      {title}
:
    </p>
    {content}
  </div>
);

class QuanLyXuatKho extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  request = (url = "http://localhost/api/me",method, body) => {
    let option = {
      method: method,
        headers: {
      Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
    },
      body: JSON.stringify(body)};
      return fetch(url, option)
        .then(response => {
          // DELETE and 204 do not return data by default
          // using .json will report an error.
          if (newOptions.method === 'DELETE' || response.status === 204) {
            console.log(response.text());
            return response.text();
          }
          console.log(response.json());
          return response.json();
        });
    };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const columns = [
      {
        title: 'Mã Đơn',
        dataIndex: 'name',
        width: '10%',
        key: 'name',
        render: (text, record) => (
          <a onClick={() => this.showDrawer()} >{text}</a>
        )
      },
      {
        title: 'Vị Trí',
        width: '10%',
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: 'Khu Vực',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: 'Đơn Vị Quản Lý',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: 'Tổng Tiền',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: 'Trạng Thái',
        key: 'tags',
        dataIndex: 'tags',
        render: (tags) => (
          <span>
            {tags.map((tag) => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        )
      },
      {
        title: 'Ngày Xuất Kho',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: '',
        key: 'action',
        width: '10%',
        render: (text, record) => (
          <span>
            <Button type="primary" shape="circle" icon="edit" size='small' style={{marginRight:'5px'}}  />
            <Button type="danger" shape="circle" icon="delete" onClick={() => console.log('a')}  size='small'/>
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
              dataSource={data}
              // onRow={(record) => ({
              //   onClick: () => {
              //     console.log(record);
              //   } // click row
              // })}
            />
          </Row>
        </Card>
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p style={{ marginBottom: 24 }}>User Profile</p>
          <p>Personal</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Full Name" content="Lily" />
              {' '}
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Account"
                content="AntDesign@example.com"
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="City" content="HangZhou" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Country" content="China🇨🇳" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Birthday" content="February 2,1900" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Website" content="-" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Message"
                content="Make things as simple as possible but no simpler."
              />
            </Col>
          </Row>
          <Divider />
          <p>Company</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Position" content="Programmer" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Responsibilities" content="Coding" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Department" content="AFX" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Skills"
                content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
              />
            </Col>
          </Row>
          <Divider />
          <p>Contacts</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Email" content="AntDesign@example.com" />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Phone Number"
                content="+86 181 0000 0000"
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Github"
                content={(
                  <a href="http://github.com/ant-design/ant-design/">
                    github.com/ant-design/ant-design/
                  </a>
                )}
              />
            </Col>
          </Row>
        </Drawer>
      </PageHeaderWrapper>
    );
  }
}

export default QuanLyXuatKho;
