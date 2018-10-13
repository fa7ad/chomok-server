import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
import { navigate, Link } from '@reach/router'
import { Layout, Menu, Icon } from 'antd'

import logoImg from '../img/logo.png'

const { Header, Content, Footer: Foot, Sider } = Layout

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

const Footer = styled(Foot)`
  text-align: center;
`

const menu = css`
  text-align: left;
  overflow-y: scroll;
  height: 100vh;
`

const header = css`
  color: #fff;
  padding: 0;
  text-transform: uppercase;
`

const content = css`
  margin: 0 16px;
  min-height: 90vh;
`

class Partner extends React.PureComponent {
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
          <Link to='/'>
            <Logo src={logoImg} alt='Chomok Logo' />
          </Link>
          <Menu
            theme='dark'
            defaultSelectedKeys={[this.props.page]}
            mode='vertical'
            className={menu}>
            {this.props.pages.map(this.mapMenu)}
          </Menu>
        </Sider>
        <Layout>
          <Header className={header}>{this.props.page}</Header>
          <Content className={content}>
            <ContentInner>{renderProp(this.props.page)}</ContentInner>
          </Content>
          <Footer>Chomok ©2018 Created by @fa7ad</Footer>
        </Layout>
      </FullLayout>
    )
  }

  componentDidMount () {
    fetch('/api/loggedIn', { credentials: 'include' })
      .then(r => r.json())
      .then(res => {
        if (!res.ok || res.type !== 'partner') throw new Error('Unauthorized')
      })
      .catch(e => {
        navigate('/login')
      })
  }

  navigate = addr => e => {
    navigate(`/partner${addr}`)
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

export default Partner
