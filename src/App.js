import React from 'react'
import { css } from 'react-emotion'
import { navigate, Link, Location, Redirect, redirectTo } from '@reach/router'

// UI components
import { Menu, Dropdown } from 'antd'
import BurgerMenu from 'react-burger-menu/lib/menus/slide'

// Custom components
import Logo from './components/Logo'
import UserIcon from './components/UserIcon'
import Router from './components/TransitionRouter'

// Routes wrapped with react-loadable
import {
  Home,
  Offer,
  OfferType,
  Admin,
  Login,
  Register,
  NotFound,
  Partner,
  ContactUs
} from './asyncRoutes'

const w100 = css`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`

class App extends React.PureComponent {
  logout = e => {
    fetch('/api/logout', { credentials: 'include' })
      .then(r => r.json())
      .then(({ ok }) => {
        setTimeout(this.getLoginState, 1000)
        if (ok) window.location.reload()
      })
      .catch(e => console.error(e))
  }

  navigate = addr => e => {
    navigate(addr)
  }

  menu = [
    <Menu.Item key='0' onClick={this.navigate('/login')}>
      Login / Register
    </Menu.Item>,
    <Menu.Item key='1' onClick={this.navigate('/admin')}>
      Admin Panel
    </Menu.Item>,
    <Menu.Item key='2' onClick={this.navigate('/partner')}>
      Partner Panel
    </Menu.Item>,
    <Menu.Item key='3' onClick={this.logout}>
      Logout
    </Menu.Item>
  ]

  state = {
    loggedIn: false,
    menuItems: this.menu.slice(0, 1)
  }

  adminPages = [
    { key: 'home', name: 'HOME', icon: 'home' },
    { key: 'offers', name: 'OFFERS', icon: 'bars' },
    { key: 'add-offer', name: 'ADD OFFER', icon: 'plus' },
    { key: 'zones', name: 'ZONES', icon: 'environment' },
    { key: 'add-zone', name: 'ADD ZONE', icon: 'plus' },
    { key: 'partners', name: 'PARTNERS', icon: 'team' },
    { key: 'add-partner', name: 'ADD PARTNER', icon: 'usergroup-add' },
    { key: 'admins', name: 'ADMINS', icon: 'user' },
    { key: 'add-admin', name: 'ADD ADMIN', icon: 'user-add' },
    { key: 'users', name: 'USERS', icon: 'team' },
    { key: 'logo', name: 'CHANGE LOGO', icon: 'cloud-upload' },
    { key: 'bg', name: 'BACKGROUND', icon: 'picture' },
    { key: 'logout', name: 'LOGOUT', icon: 'logout' }
  ]

  partnerPages = [
    { key: 'home', name: 'HOME', icon: 'home' },
    { key: 'offers', name: 'OFFERS', icon: 'bars' },
    { key: 'scan', name: 'SCAN', icon: 'scan' },
    { key: 'logout', name: 'LOGOUT', icon: 'logout' }
  ]

  render () {
    return (
      <>
        <Location>{this.getNavContent}</Location>
        <Router id='page'>
          <Home path='/' />
          <OfferType path='/offer/:zone' />
          <Offer path='/offer/:zone/:type' />
          <Redirect from='/admin' path='/admin' to='/admin/home' noThrow />
          <Admin path='/admin/:page' pages={this.adminPages}>
            {this.adminPage}
          </Admin>
          <Redirect
            from='/partner'
            path='/partner'
            to='/partner/home'
            noThrow
          />
          <Partner path='/partner/:page' pages={this.partnerPages}>
            {this.partnerPage}
          </Partner>
          <Login path='/login' />
          <Register path='/register' />
          <ContactUs path='/contact' />
          <NotFound default />
        </Router>
      </>
    )
  }

  getLoginState = () => {
    fetch('/api/loggedIn', { credentials: 'include' })
      .then(r => r.json())
      .then(loggedIn => {
        const menuItems = []
        if (loggedIn.ok) {
          if (loggedIn.type === 'admin') menuItems.push(this.menu[1])
          if (loggedIn.type === 'partner') menuItems.push(this.menu[2])
          menuItems.push(this.menu[3])
        } else {
          menuItems.push(this.menu[0])
        }
        this.setState({ loggedIn, menuItems })
      })
      .catch(e => {
        console.error(e)
        this.setState({ loggedIn: false, menuItems: this.menu.slice(0, 1) })
      })
  }

  componentDidMount () {
    this.getLoginState()
    setTimeout(this.getLoginState, 500)
  }

  getNavContent = ({ location }) => {
    const page = location.pathname.split('/')[1] || 'home'
    const auth = /login|register/.test(page)
    const dash = /admin|partner/.test(page)
    const us = /about/.test(page)
    if (dash) return null
    return (
      <>
        <BurgerMenu outerContainerId='root' pageWrapId='page'>
          <Link to='/'>Home</Link>
          <Link to='/about'>About Us</Link>
          <Link to='/contact'>Contact Us</Link>
        </BurgerMenu>
        <Link to='/'>
          <Logo src='/images/logo.png' alt='Chomok Logo' />
        </Link>
        <Dropdown
          overlay={<Menu>{this.state.menuItems}</Menu>}
          trigger={['click']}>
          <UserIcon
            type='user'
            fill={us ? '#111' : '#fff'}
            onMouseOver={this.getLoginState}
            style={auth ? { display: 'none' } : {}}
          />
        </Dropdown>
      </>
    )
  }

  partnerPage = page => {
    if (!this.state.loggedIn) {
      navigate('/login')
      return null
    }
    switch (page) {
      case 'home':
        return (
          <img
            src='https://i.imgur.com/661H1ET.gif'
            alt="You're dumb"
            className={w100}
          />
        )
      case 'offers':
        return <Partner.Offers />
      case 'scan':
        return <Partner.Scan />
      case 'logout':
        fetch('/api/logout', { credentials: 'include' })
          .then(r => r.json())
          .then(({ ok }) => {
            if (ok) navigate('/')
          })
          .catch(e => console.error(e))
        return redirectTo('/')
      default:
        return <h1>Invalid route xD</h1>
    }
  }

  adminPage = page => {
    if (!this.state.loggedIn) {
      navigate('/login')
      return null
    }

    switch (page) {
      case 'home':
        return (
          <img
            src='https://i.imgur.com/661H1ET.gif'
            alt="You're dumb"
            className={w100}
          />
        )
      case 'offers':
        return <Admin.Offers />
      case 'add-offer':
        return <Admin.AddOffer />
      case 'zones':
        return <Admin.Zones />
      case 'add-zone':
        return <Admin.AddZone />
      case 'partners':
        return <Admin.Partners />
      case 'add-partner':
        return <Admin.AddPartner />
      case 'admins':
        return <Admin.Admins />
      case 'add-admin':
        return <Admin.AddAdmin />
      case 'logo':
        return <Admin.Logo />
      case 'bg':
        return <Admin.Background />
      case 'users':
        return <Admin.Users />
      case 'logout':
        fetch('/api/logout', { credentials: 'include' })
          .then(r => r.json())
          .then(({ ok }) => {
            if (ok) navigate('/')
          })
          .catch(e => console.error(e))
        return redirectTo('/')
      default:
        return <h1>Invalid route xD</h1>
    }
  }
}

export default App
