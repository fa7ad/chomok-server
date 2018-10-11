import React from 'react'
import { navigate, Link, Location, Redirect } from '@reach/router'

// UI components
import { Menu, Dropdown, Icon } from 'antd'
import BurgerMenu from 'react-burger-menu/lib/menus/slide'

// Custom components
import Logo from './components/Logo'
import UserIcon from './components/UserIcon'
import Router from './components/TransitionRouter'

// Routes wrapped with react-loadable
import { Home, Offer, Admin, Login, NotFound } from './asyncRoutes'

// Resources
import logoImg from './img/logo.png'

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
      Login
    </Menu.Item>,
    <Menu.Item key='1' onClick={this.navigate('/admin')}>
      Settings
    </Menu.Item>,
    <Menu.Item key='2' onClick={this.logout}>
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
    { key: 'logout', name: 'LOGOUT', icon: 'logout' }
  ]

  render () {
    return (
      <>
        <Location>{this.getBurgerMenu}</Location>
        <Location>{this.getLogoAndUser}</Location>
        <Router id='page'>
          <Home path='/' />
          <Offer path='/offer/:zone' />
          <Redirect from='/admin' path='/admin' to='/admin/home' noThrow />
          <Admin path='/admin/:page' pages={this.adminPages}>
            {this.adminPage}
          </Admin>
          <Login path='/login' />
          <NotFound default />
        </Router>
      </>
    )
  }

  getLoginState = () => {
    fetch('/api/loggedIn', { credentials: 'include' })
      .then(r => r.json())
      .then(loggedIn => {
        const menuItems = loggedIn.ok
          ? this.menu.slice(1)
          : this.menu.slice(0, 1)
        if (loggedIn.ok && loggedIn.type !== 'admin') menuItems.splice(0, 1)
        this.setState({ loggedIn, menuItems })
      })
      .catch(e => {
        console.error(e)
        this.setState({ loggedIn: false, menuItems: this.menu.slice(0, 1) })
      })
  }

  componentDidMount () {
    this.getLoginState()
    setTimeout(this.getLoginState, 900)
  }

  getLogoAndUser = ({ location }) => {
    if (/login|admin/.test(location.href)) return null
    return (
      <>
        <Logo src={logoImg} alt='Chomok Logo' onClick={this.navigate('/')} />
        <Dropdown
          overlay={<Menu children={this.state.menuItems} />}
          trigger={['click']}>
          <UserIcon type='user' onMouseOver={this.getLoginState} />
        </Dropdown>
      </>
    )
  }

  getBurgerMenu = ({ location }) =>
    !/admin/.test(location.href) ? (
      <BurgerMenu outerContainerId='root' pageWrapId='page'>
        <Link to='/'>Home</Link>
        <Link to='/about'>About Us</Link>
        <Link to='/contact'>Contact Us</Link>
      </BurgerMenu>
    ) : null

  adminPage = page => {
    if (!this.state.loggedIn) {
      navigate('/login')
      return null
    }

    switch (page) {
      case 'home':
        return <Icon type='home' />
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
      case 'logout':
        fetch('/api/logout', { credentials: 'include' })
          .then(r => r.json())
          .then(({ ok }) => {
            if (ok) navigate('/')
          })
          .catch(e => console.error(e))
        return 'Logging you out...'
      default:
        return <h1>Invalid route xD</h1>
    }
  }
}

export default App
