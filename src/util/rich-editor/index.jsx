import React, { Component } from 'react'
import Simditor from 'simditor'
import 'simditor/styles/simditor.scss';
import './index.scss';

// 通用富文本编辑器，依赖jq
export default class RichEditor extends Component {
  constructor (props) {
    super (props)

  }
  componentDidMount() {
    this.loadeditor()
  }
  // 初始化  富文本编辑器
  loadeditor () {
    let el = this.refs['textarea']
    this.simditor = new Simditor ({
        textarea : $(el),
        defaultValue: this.props.placeholder || '请输入内容',
        upload: {
          url             : '/manage/product/richtext_img_upload.do',
          defaultImage    : '',
          fileKey         : 'upload_file'
        }
    })
    this.bindEditorEvent()
  }
  // 初始化富文本编辑器事件
  bindEditorEvent () {
    this.simditor.on('valuechanged', e => {
        this.props.onValueChange(this.simditor.getValue());
    })
  }
  // 数据回填
  componentWillReceiveProps(nextProps) {
    if(this.props.defaultDetail !== nextProps.defaultDetail){
      this.simditor.setValue(nextProps.defaultDetail);
    }
  }
  
  render() {
    return (
      <div className='rich-editor'>
        <textarea ref='textarea'></textarea>
      </div>
    )
  }
}
