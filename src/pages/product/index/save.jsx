import React, { Component } from 'react'
import MUtil                from 'util/mm.jsx'
import Product              from 'api/Product.jsx'
import PageTitle            from 'components/page-title/index.jsx';
import CategroySelector     from 'pages/product/index/categroy-selector.jsx';
import FileUploader         from  'util/file-upload/index.jsx'
import RichEditor           from 'util/rich-editor/index.jsx'
import './save.scss';

const _mm           = new MUtil();
const _product      = new Product();

export default class ProductSave extends Component {
  constructor (props) {
    super(props)
    // console.log('save',this.props.match.params.pid)
    // console.log('save',this.props)
    this.state = {
      id         : this.props.match.params.pid,
      categoryId : 0,
      parentId   : 0,
      subImages  : [],
      name       : '',
      subtitle   : '',
      price      : '',
      detail     : '',
      stock      : '',
      status     : 1 //商品状态1为在售
    }
  }
  componentDidMount() {
    this.loadproduct()
  }
  loadproduct () {
    if(this.state.id){
      _product.getProduct(this.state.id).then((res) => {
          let images = res.subImages.split(',');
          res.subImages = images.map((imgUri) => {
              return {
                  uri: imgUri,
                  url: res.imageHost + imgUri
              }
          });
          res.defaultDetail = res.detail;
          this.setState(res);
      }, (errMsg) => {
          _mm.errorTips(errMsg);
      });
    }
  }
  // 简单字段的改变，比如商品名称，描述，价格，库存
  onValChange (e) {
    let name = e.target.name;
    let val  = e.target.value;
    this.setState({
      [name]: val
    })
  }
  // 品类选择器的变化
  onChangeId(categoryId,parentCategoryId) {
    this.setState({
      categoryId  : categoryId,
      parentCategoryId    : parentCategoryId
  });
  }
  // 上传图片成功
  onUploadSuc(res) {
    console.log(res)
    let subImgs = this.state.subImages
    subImgs.push(res)
    this.setState({
      subImages: subImgs
    })
  }
  // 上传图片失败
  onUploadErr(err) {
    _mm.errorTips(err.message || '上传图片失败')
  }
  // 删除图片
  onImageDelete (e) {
    let index       = parseInt(e.target.getAttribute('index')),
        subImages   = this.state.subImages;
    subImages.splice(index, 1);
    this.setState({
        subImages : subImages
    });
  }
  // 富文本编辑器 
  onDetailValueChange (value) {
    this.setState({
      detail: value
    });
  }
  // 
  getSubImagesString () {
    return this.state.subImages.map((img,index) => img.uri).join(',')
  }
  // 提交表单
  submit (e) {
    let product = {
      name        : this.state.name,
      subtitle    : this.state.subtitle,
      categoryId   : parseInt(this.state.categoryId),
      subImages   : this.getSubImagesString(),
      detail      : this.state.detail,
      price       : parseFloat(this.state.price),
      stock       : parseInt(this.state.stock),
      status      : this.state.status
    },
    productCheckResult = _product.checkProduct(product);
    if(this.state.id){
        product.id = this.state.id;
    }
    // 表单验证成功
    if(productCheckResult.status){
        _product.saveProduct(product).then((res) => {
            _mm.successTips(res);
            this.props.history.push('/product/index');
        }, (errMsg) => {
            _mm.errorTips(errMsg);
        });
    }
    // 表单验证失败
    else{
        _mm.errorTips(productCheckResult.msg);
    }
  }

  render() {
    return (
      <div id='page-wrapper'>
        <PageTitle title={this.state.id ? '编辑商品' : '添加商品'}/>
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">商品名称</label>
            <div className="col-md-5">
              <input type="text" className="form-control" 
                name="name"
                value={this.state.name}                
                onChange = {e => this.onValChange(e)}
                placeholder="请输入商品名称" />
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-5">
              <input type="text" className="form-control"
                name="subtitle"
                value={this.state.subtitle}
                onChange = {e => this.onValChange(e)}
                placeholder="请输入商品描述" />
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-2 control-label">所属分类</label>
            <CategroySelector 
              categoryId={this.state.categoryId}
              parentCategoryId={this.state.parentCategoryId}
              onIdChange={(categoryId,parentCategoryId) => this.onChangeId(categoryId,parentCategoryId)} />
          </div>

          <div className="form-group">
            <label className="col-md-2 control-label">商品价格</label>
            <div className="col-md-3">
              <div className="input-group">
                <input type="number" className="form-control" 
                  name="price"
                  value={this.state.price}                  
                  onChange = {e => this.onValChange(e)}
                  placeholder="价格" />
                <span className="input-group-addon">元</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-2 control-label">商品库存</label>
            <div className="col-md-3">
              <div className="input-group">
                <input type="number" className="form-control" 
                  name="stock"
                  value={this.state.stock}                                    
                  onChange = {e => this.onValChange(e)}
                  placeholder="库存" />
                <span className="input-group-addon">件</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-2 control-label">商品照片</label>
            <div className="col-md-10">
              {
                this.state.subImages.length ? this.state.subImages.map((img, index) => {
                  return (
                    <div className='img-con'  key={index}>
                      <img className="img" src={img.url}/>
                      <i className="fa fa-close" index={index} onClick={e => this.onImageDelete(e)}></i>                     
                    </div>
                  )
                }) : (<div>请上传图片</div>)
              }
            </div>
            <div className="col-md-offset-2 col-md-10 file-upload-con">
              <FileUploader 
                onUploadSuc={res => this.onUploadSuc(res)}
                onUploadErr={err => this.onUploadErr(err)}
                />
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-5">
              <RichEditor  
                detail={this.state.detail}
                defaultDetail={this.state.defaultDetail}
                onValueChange={val => this.onDetailValueChange(val)}/>
            </div>
          </div>

          <div className="form-group">
            <div className="col-md-offset-2 col-md-10">
              <button type="submit" className="btn btn-primary"
               onClick={(e) => {this.submit(e)}}>提交</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
