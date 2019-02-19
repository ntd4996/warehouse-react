import React, { Component } from 'react';
import { Card, Icon, Tooltip, Form, Input, Button, DatePicker } from 'antd';
const FormItem = Form.Item;
import { connect } from 'dva';
import styles from './EmailSearch.less';
import { toSearchParam } from "../../../../utils/emailProcessing.utils";
const { RangePicker } = DatePicker;

@connect(({ emails, foldersTeam, loading }) => ({
  emails,
  foldersTeam,
  loading: loading.effects['emails/fetch'],
}))
class EmailSearch extends Component {
  constructor(props) {
    super(props);
  }

  submitSearchForm = (e) => {
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      const fromDateToDate = fieldsValue['fromDateToDate'];
      let fromDate, toDate;
      if (fromDateToDate) {
        fromDate = fromDateToDate[0].format('YYYY-MM-DD');
        toDate = fromDateToDate[1].format('YYYY-MM-DD');
      }
      const {from, to, subject, keywords} = fieldsValue;
      const folderId = this.props.foldersTeam.currentFolder;
      const searchData = {from, to, subject, keywords, fromDate, toDate, folderId};
      const { dispatch } = this.props;
      dispatch({
        type: 'emails/fetch',
        payload: toSearchParam(searchData),
      });
      dispatch({
        type: 'emails/saveSearchData',
        searchData,
      });
    })
  };

  clearSearchForm = () => {
    this.props.form.resetFields();
    const { dispatch } = this.props;
    dispatch({
      type: 'emails/fetch',
      payload: 'folderId=' + this.props.foldersTeam.currentFolder,
    });
    dispatch({
      type: 'emails/saveSearchData',
      searchData: {folderId: this.props.foldersTeam.currentFolder},
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
      colon: false
    };

    const buttonItemLayout = {
      wrapperCol: { span: 14, offset: 5 },
    };
    const searchData = this.props.emails.searchData;
    return (
      <Card bordered={false}>
        <Form layout='horizontal' onSubmit={this.submitSearchForm} className={styles.searchForm}>
          <FormItem
            label="From"
            {...formItemLayout}
          >
            {getFieldDecorator('from', {initialValue: searchData.from})(
              <Input
                name="form"
                autoComplete="on"
                className={styles.searchInput}
              />
            )}
          </FormItem>
          <FormItem
            label="To"
            {...formItemLayout}
          >
            {getFieldDecorator('to', {initialValue: searchData.to})(
              <Input
                className={styles.searchInput}
              />
            )}
          </FormItem>

          <FormItem
            label="Subject"
            {...formItemLayout}
          >
            {getFieldDecorator('subject', {initialValue: searchData.subject})(
              <Input
                className={styles.searchInput}
              />
            )}
          </FormItem>

          <FormItem
            label="Keywords"
            {...formItemLayout}
          >
            {getFieldDecorator('keywords', {initialValue: searchData.keywords})(
              <Input
                className={styles.searchInput}
              />
            )}
          </FormItem>

          <FormItem
            label="Duration"
            {...formItemLayout}
          >
            {getFieldDecorator('fromDateToDate')(
              <RangePicker
                className={styles.searchInput}
                style={{width: '100%'}}
              />
            )}
          </FormItem>
          <FormItem {...buttonItemLayout}>
            <Button type="primary" onClick={this.submitSearchForm}>Search</Button>
            <Button type="default" onClick={this.clearSearchForm} style={{marginLeft: '10px'}}>Clear filter</Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}
export default Form.create()(EmailSearch);
