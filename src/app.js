import React from 'react';
import { Link } from 'react-router';
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;


class App extends React.Component {

    constructor(props) {
        super(props);
    }
     
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  select = (item) => {
    //   console.log(item.key);
      let path = item.key === '1' ? '/' : 'add';
      this.props.history.push(path);
  }


  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" style={{height: 40}} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={ this.select }>
            <Menu.Item key="1" >
              <Icon type="bars" />
              <span className="nav-text">列表</span>
            </Menu.Item>
            <Menu.Item key="2" >
              <Icon type="user-add" />
              <span className="nav-text">添加用户</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
              style={{fontSize: 20, marginLeft: 10, cursor: 'pointer'}}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 710 }}>
            { this.props.children }
          </Content>
        </Layout>
      </Layout>
    );
  }
}



export default App;
