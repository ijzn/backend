import React, { Component } from 'react'
import FileUpload from './react-fileupload.jsx'

export default class FileUploader extends Component {
  render() {
    const options = {
      baseUrl         : '/manage/product/upload.do',
      fileFieldName   : 'upload_file',
      dataType        : 'json',
      // 选择后立即上传
      chooseAndUpload : true,
      uploadSuccess   : (res) => {
        this.props.onUploadSuc(res.data)
      },
      uploadError     : (err) => {
        this.props.onUploadErr(err || '上传图片出错啦')
      }
    }
    return (
      <FileUpload options={options}>
        <button ref="chooseAndUpload">choose</button>
        {/* <button ref="uploadBtn">upload</button> */}
      </FileUpload>
    )
  }
}

