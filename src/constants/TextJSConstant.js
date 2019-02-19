export const TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1IiwiaWF0IjoxNTUwMDQ3Mjk3LCJleHAiOjE1NTA2NTIwOTd9.Su2gCph-T5QcePxtXbirFxzCm_Rf3e7gMbB7b-K7dDIW2LD26D3vGeARZvSVRAOa3WRK8XY5g51Uer-lTC0F9Q";
export const REPLY_TITLE = 'Re: There are many variations of passages of Lorem Ipsum available';
export const REPLY_SELECT_TEMPLATE = [{
    value: 'zhejiang',
    label: 'Zhejiang'
  }, {
    value: 'jiangsu',
    label: 'Jiangsu'
  }];

export const data1 = <h1>test</h1>;
export const data2 = <h1>test1</h1>;
export const REPLY_SELECT_SIGNATURE = [{
    value: '1',
    label: 'signature 1'
  }, {
    value: '2',
    label: 'signature 2'
  }];

export const UPLOADFILE_PROPS = {
  //action: '//jsonplaceholder.typicode.com/posts/',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
  defaultFileList: [{
    uid: '1',
    name: 'xxx.png',
    status: 'done',
    response: 'Server Error 500', // custom error message to show
    url: 'http://www.baidu.com/xxx.png',
  }, {
    uid: '2',
    name: 'yyy.png',
    status: 'done',
    url: 'http://www.baidu.com/yyy.png',
  }, {
    uid: '3',
    name: 'zzz.png',
    status: 'done',
    response: 'Server Error 500', // custom error message to show
    url: 'http://www.baidu.com/zzz.png',
  }],
};

export const REPLY_SELECT_CHECKER = [{
  value: 'zhejiang',
  label: 'A'
}, {
  value: 'jiangsu',
  label: 'B'
}];