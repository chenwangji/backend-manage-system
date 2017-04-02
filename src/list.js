import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { Table, Input, Popconfirm,Button } from 'antd';


class List extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
        title: 'id',
        dataIndex: 'id'
    }, {
      title: 'name',
      dataIndex: 'name',
      width: '20%'
    }, {
      title: 'email',
      dataIndex: 'email',
    }, {
      title: 'city',
      dataIndex: 'city',
       width: '20%'
    }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record, index) => {

        return (
          <div className="editable-row-operations">
            <Button type='danger' size='small' style={ {marginRight: 10} } ghost  onClick={ this.delete.bind(this, text, record, index) }>删除</Button>
            <Button type='primary' size='small' ghost  onClick={ this.edit.bind(this, text, record, index) }>编辑</Button>          
          </div>
        );
      },
    }];

    this.state = {
      list: []

    };
  }

    componentWillMount() {
    // 请求数据
    axios.get('http://localhost:2000/peopleList')
        .then(
            res => {
                // console.log(res);
                this.setState({
                    list: res.data
                })
            },
            err => console.log(err)
        )
    } 
 
  render() {
    const { list } = this.state;
    const columns = this.columns;
    return (
      <div>
        <Table bordered dataSource={list} columns={columns} />
      </div>
    );
  }

  delete = ( text, record, index) => {
    // text 为undefined
    // index为分页列表的下标，因为antd-desigin的分页之后下标重新开始， 所以删除的永远是第一个分页的数据，不能用
    // record为点击的那条数据对象
    // console.log(record)
    // console.log(text)

    // 寻找该条数据的实际下标
    let itemIndex = 0;
    for (let i = 0; i < this.state.list.length; i++) {
      if (this.state.list[i].id === record.id) {
        itemIndex = i;
      }
    }

    if (confirm(`确认将${ record.name }移除吗？`)) {
        axios.delete("http://localhost:2000/peopleList/" + record.id)
            .then(
                res => {
                    console.log(res.data); // 删除成功的话返回一个空数组
                    if (res.data) {
                        this.state.list.splice(itemIndex, 1);
                        this.setState({
                            list: this.state.list
                        })
                    }
                },
                err => console.log(new Error(err))
            )            
    }  
  }

  edit = ( text, record, index) => {
     // 寻找该条数据的实际下标
      let itemIndex = 0;
      for (let i = 0; i < this.state.list.length; i++) {
        if (this.state.list[i].id === record.id) {
          itemIndex = i;
        }
      }

      this.props.history.push('edit/' + this.state.list[itemIndex].id);
  }



}



export default List;