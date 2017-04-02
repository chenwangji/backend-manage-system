import React from 'react';
import axios from 'axios';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {}
        }
    }

  render() {

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
            姓名：
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="姓名" onChange={ (e) => this.change(e, 'name') } value={ this.state.item.name }/>
        </FormItem>
        <FormItem>
            邮箱：
            <Input prefix={<Icon type="contacts" style={{ fontSize: 13 }} />} type="text" placeholder="请输入邮箱" onChange={ (e) => this.change(e, 'email') } value={ this.state.item.email }/>
        </FormItem>
        <FormItem>
            城市：
            <Input prefix={<Icon type="compass" style={{ fontSize: 13 }} />} onChange={ (e) => this.change(e, 'city') } type="text" placeholder="城市"  value={ this.state.item.city }/>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button" onClick={ this.submit }>
            新增用户
          </Button>
        </FormItem>
      </Form>
    );
  }

      submit = () => {


        // 发起post请求
        axios.post('http://localhost:2000/peopleList', {
            ...this.state.item  // 扩展运算符， ...obj 表示obj对象的所有简直映射
        })
            .then(
                res => {
                    // console.log(res.data);
                    if (res.data) {
                        alert('添加成功！');
                        this.props.history.push('/');
                    }
                },
                err => console.log(new Error(err))
            )
    }

    // 改变输入框内容
    change = (e, key) => {
        this.state.item[key] = e.target.value;
        this.setState({
            item: this.state.item
        })
    }
 

}


export default Add;