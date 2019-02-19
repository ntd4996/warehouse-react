import React from "react";
import { Breadcrumb, Icon } from "antd";
import Link from 'umi/link';

class SubHeader extends React.Component {
  static propsDefault = {
    pageInfo: {}
  };

  render() {
    return (
      <div className="page-header-wrap">
        <div className="page-header-detail">
          <h3>{this.props.pageInfo.name}</h3>
        </div>
        <Breadcrumb className="page-header-breadcrumb">
          {
            this.props.pageInfo.breadcrumb.map((item, index) => {
              let breadcrumbItem;

              if (item.link) {
                breadcrumbItem = <Link to={item.link}>{item.name}</Link>;
              } else {
                breadcrumbItem = item.name;
              }

              return (
                <Breadcrumb.Item key={index}>
                  {breadcrumbItem}
                </Breadcrumb.Item>
              );
            })
          }
        </Breadcrumb>
      </div>
    );
  }
}

export default SubHeader;
