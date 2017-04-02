import React from 'react';
import axios from 'axios';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class Edit extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
            item: {}
        }
    }

    // 请求该用户的原始数据
    componentWillMount() {
        axios.get('http://localhost:2000/peopleList/' + this.props.params.id)
            .then(
                res => {
                    // console.log(res.data);
                    this.setState({
                        item: res.data
                    });

                },
                err => console.log(new Error(err))
            )
    }
  
  render() {

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
            姓名：
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="姓名" value={this.state.item.name} onChange={ (e) => { this.change(e, 'name') } }/>
        </FormItem>
        <FormItem>
            邮箱：
            <Input prefix={<Icon type="contacts" style={{ fontSize: 13 }} />} type="text" placeholder="请输入邮箱" value={ this.state.item.email } onChange={ (e) => { this.change(e, 'email') } }/>
        </FormItem>
        <FormItem>
            城市：
            <Input prefix={<Icon type="compass" style={{ fontSize: 13 }} />} type="text" placeholder="城市" value={ this.state.item.city } onChange={ (e) => { this.change(e, 'city') } }/>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button" onClick={ this.submit }>
            确认修改
          </Button>
        </FormItem>
      </Form>
    );
  }


     // 改变输入框内容
    change = (e, key) => {
        this.state.item[key] = e.target.value;
        this.setState({
            item: this.state.item
        })
    }
    
    submit = () => {
        // 请求接口修改数据
        axios.put('http://localhost:2000/peopleList/' + this.props.params.id, {
           ...this.state.item
        })
             .then(
                res =>{
                    console.log(res.data);
                    if (res.data) {
                        alert('修改成功！');
                        this.props.history.push('/');
                    }
                },
                err => console.log(err)
             )
    }
 

}

export default Edit;
