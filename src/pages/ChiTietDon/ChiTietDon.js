import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

class ChiTietDon extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.match.params.detailId);
  }

  render() {
    return (
      <PageHeaderWrapper>
        <div>ChiTietDon</div>
      </PageHeaderWrapper>
    );
  }
}

export default ChiTietDon;
