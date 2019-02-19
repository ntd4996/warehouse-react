import React, { Component } from 'react';
import {
  Form,
  Select,
  Upload,
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  Icon,
  Input,
  Modal,
  Row,
  Tooltip,
  Collapse,
  Cascader
} from 'antd';
import TagsInput from 'react-tagsinput';
import {
  REPLY_TITLE,
  REPLY_SELECT_TEMPLATE,
  REPLY_SELECT_SIGNATURE,
  UPLOADFILE_PROPS,
  REPLY_SELECT_CHECKER
} from "../../../constants/TextJSConstant";
import { IoMdSend } from "react-icons/io";
import ReactQuill, { Quill } from 'react-quill';

import replyStyles from './Reply.less';
import 'react-tagsinput/react-tagsinput.css';
import 'react-quill/dist/quill.snow.css';

const confirm = Modal.confirm;


const comments = [
  {
    id: 1,
    user: {
      id: 1,
      fullName: 'William John',
      shortName: 'J'
    },
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. ',
    createdAt: '10/12/2018 09:15 AM'
  },
  {
    id: 2,
    user: {
      id: 1,
      fullName: 'William John',
      shortName: 'J'
    },
    content: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    createdAt: '10/12/2018 09:15 AM'
  }
];

/***CONST REPLY*********************************************/
const Option = Select.Option;

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 20 }
};

const defaulltData = {
  className: 'react-tagsinput-input tagCss',
  placeholder: '',
  style: {
    width: 200,
    fontSize: 14
  }
}

const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ]
};

const tagProps = {
  className: 'react-tagsinput-tag',
  classNameRemove: 'react-tagsinput-remove',
  style: { backgroundColor: '#ffffff', border: '#ffffff', color: '#666666' }
};

class EmailReply extends Component {

  constructor(props) {
    super(props);
    this.state = {
      settingModalVisible: false,
      isActiveReply: false,
      contentSignatureReply: false,
      ck: "",
      checker: "",
      Option: "",
      tagsCc: [],
      tagsTo: [],
      tagsFrom: [],
      tagsBcc: [],
      content: ""
    };
    this.contentHandleChange = this.contentHandleChange.bind(this)
  }

  /**-------------------------Reply------------------------*/
  contentHandleChange = (content) => {
    this.setState({
      content: content
    });
  };

  tagCcHandleChange = (tagsCc) => {
    this.setState({
      tagsCc: tagsCc
    });
  };

  tagToHandleChange = (tagsTo) => {
    this.setState({
      tagsTo: tagsTo
    });
  };

  tagFromHandleChange = (tagsFrom) => {
    this.setState({
      tagsFrom: tagsFrom
    });
  };

  tagBccHandleChange = (tagsBcc) => {
    this.setState({
      tagsBcc: tagsBcc
    });
  };

  onChange = (value) => {
    console.log(value);
  };

  onSelectSignature = (e) => {
    this.setState({
      ck: e
    });
  };

  onSelectChecker = (e1) => {
    this.setState({
      checker: e1
    });
  };


  /**-------------------------end------------------------*/

  render() {
    if (!this.props.emailDetail) {
      return null;
    }

    return (
      <Card className={replyStyles.cardReply} title={this.props.emailDetail.subject} extra={<span className={replyStyles.antCardExtra}><Cascader options={REPLY_SELECT_TEMPLATE} onChange={this.onChange} placeholder="Select a template..." /></span>}>
        <div>
          <Form>
            <Form.Item label="To" {...formItemLayout}>
              <div className={replyStyles.inputTagBbCcBcc}>
                <TagsInput placeholder="alphabet@gmail.com" className={replyStyles.tagInputContainer} tagProps={tagProps} inputProps={defaulltData} value={this.state.tagsTo} onChange={this.tagToHandleChange} />
              </div>
            </Form.Item>
            <Form.Item label="From" {...formItemLayout}>
              <div className={replyStyles.inputTagBbCcBcc}>
                <TagsInput placeholder="alphabet@gmail.com" className={replyStyles.tagInputContainer} tagProps={tagProps} inputProps={defaulltData} value={this.state.tagsFrom} onChange={this.tagFromHandleChange} />
              </div>
            </Form.Item>
            <Form.Item label="Cc" {...formItemLayout}>
              <div className={replyStyles.inputTagBbCcBcc}>
                <TagsInput className={replyStyles.tagInputContainer} tagProps={tagProps} inputProps={defaulltData} value={this.state.tagsCc} onChange={this.tagCcHandleChange} />
              </div>
            </Form.Item>
            <Form.Item label="Bcc" {...formItemLayout}>
              <div className={replyStyles.inputTagBbCcBcc}>
                <TagsInput className={replyStyles.tagInputContainer} tagProps={tagProps} inputProps={defaulltData} value={this.state.tagsBcc} onChange={this.tagBccHandleChange} />
              </div>
            </Form.Item>
            <Form.Item label="Subject" {...formItemLayout}>
              <Input placeholder={REPLY_TITLE} className={replyStyles.formInputReply} />
            </Form.Item>
            <Form.Item label="Content" {...formItemLayout}>
              <div className={replyStyles.contentContaier}>
                <ReactQuill className={replyStyles.contentQuill} value={this.state.content} onChange={this.contentHandleChange}
                  modules={modules} />
              </div>
            </Form.Item>
            <div className={replyStyles.signatureBlock}>
              <Form.Item label="Signature" {...formItemLayout}>
                <div className={replyStyles.contentSignatureReply}>
                  <Input.TextArea rows={8} placeholder="Enter the content here..." value={this.state.ck} />
                </div>
                <div className={replyStyles.selectSignature}>
                  <Cascader options={REPLY_SELECT_SIGNATURE} onChange={this.onSelectSignature} placeholder="Select signature" />
                </div>
              </Form.Item>

            </div>

            <Form.Item label="Files" {...formItemLayout}>
              <Upload {...UPLOADFILE_PROPS}>
                <Button>
                  <Icon type="upload" /> Upload
                </Button>
              </Upload>
              <div className={replyStyles.footerContentReply}>
                <div className={replyStyles.footerStatusReply}><Icon type="info-circle" style={{ marginRight: 6 }} /> Processing </div>
                <div className={replyStyles.footerCheckerReply}>
                  <Cascader options={REPLY_SELECT_CHECKER} onChange={this.onSelectChecker} placeholder="Select Checker" />
                </div>
              </div>
              <div className={replyStyles.footerButtonReply}>
                <Button type="primary"><IoMdSend style={{ marginRight: 3 }} />Send</Button>
                <Button type="primary" style={{ backgroundColor: '#808080', borderColor: '#808080', marginLeft: 10 }}>Cancel</Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Card>
    );
  }
}

export default EmailReply;