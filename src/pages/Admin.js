import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { navigate } from '@reach/router'
import { Layout, Menu, Icon } from 'antd'

import logoImg from '../img/logo.png'

const Logo = styled('img')`
  height: 60px;
  padding: 10px;
  margin: 0 auto;
  cursor: pointer;
`

const FullLayout = styled(Layout)`
  min-height: 100vh;
`

const ContentInner = styled('div')`
  padding: 24px;
  background: #fff;
  min-height: 20vmin;
  margin: 16px 0;
  display: flex;
  justify-content: center;
  > div,
  .ant-form {
    flex-grow: 1;
    flex-basis: 100%;
  }
  .ant-form {
    max-width: 600px;
  }
`

const { Header, Content, Footer, Sider } = Layout

class Admin extends React.PureComponent {
  state = {
    collapsed: false
  }

  onCollapse = collapsed => {
    this.setState({ collapsed })
  }

  render () {
    const renderProp = this.props.render || this.props.children.props.children
    return (
      <FullLayout>
        <Sider
          collapsible
          breakpoint='sm'
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}>
          <Logo
            src={logoImg}
            alt='Chomok Logo'
            onClick={this.navigate('/../')}
          />
          <Menu
            theme='dark'
            defaultSelectedKeys={[this.props.page]}
            mode='vertical'
            style={{
              textAlign: 'left',
              overflowY: 'scroll',
              height: '100vh'
            }}>
            {this.props.pages.map(this.mapMenu)}
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{ color: '#fff', padding: 0, textTransform: 'uppercase' }}>
            {this.props.page}
          </Header>
          <Content style={{ margin: '0 16px', minHeight: '90vh' }}>
            <ContentInner>{renderProp(this.props.page)}</ContentInner>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Chomok ©2018 Created by @fa7ad
          </Footer>
        </Layout>
      </FullLayout>
    )
  }

  componentDidMount () {
    fetch('/api/loggedIn', { credentials: 'include' })
      .then(r => r.json())
      .then(res => {
        if (!res.ok) navigate('/login')
      })
      .catch(e => {
        navigate('/login')
      })
  }

  navigate = addr => e => {
    navigate(`/admin${addr}`)
  }

  mapMenu = it => (
    <Menu.Item key={it.key} onClick={this.navigate('/' + it.key)}>
      <Icon type={it.icon} />
      <span>{it.name}</span>
    </Menu.Item>
  )

  static propTypes = {
    page: PropTypes.string,
    pages: PropTypes.arrayOf(PropTypes.object),
    render: PropTypes.func,
    children: PropTypes.node
  }
}

export default Admin
