import React from 'react'
import Loadable from 'react-loadable'
import loading from './components/Loading'

export const Home = Loadable.Map({
  loading,
  loader: {
    Home: () => import('./pages/Home'),
    navItems: () => fetch('/api/zones').then(r => r.json())
  },
  render (loaded, props) {
    const Home = loaded.Home.default
    const navItems = loaded.navItems.data
    return <Home {...props} navItems={navItems} />
  }
})

// Admin-only routes
export const Admin = Loadable({
  loading,
  loader: _ => import('./pages/Admin')
})

Admin.Offers = Loadable({
  loading,
  loader: _ => import('./pages/_admin/Offers')
})
Admin.AddOffer = Loadable({
  loading,
  loader: _ => import('./pages/_admin/AddOffer')
})
Admin.Zones = Loadable({
  loading,
  loader: _ => import('./pages/_admin/Zones')
})
Admin.AddZone = Loadable({
  loading,
  loader: _ => import('./pages/_admin/AddZone')
})
Admin.Partners = Loadable({
  loading,
  loader: _ => import('./pages/_admin/Partners')
})
Admin.AddPartner = Loadable({
  loading,
  loader: _ => import('./pages/_admin/AddPartner')
})
Admin.Admins = Loadable({
  loading,
  loader: _ => import('./pages/_admin/Admins')
})
Admin.AddAdmin = Loadable({
  loading,
  loader: _ => import('./pages/_admin/AddAdmin')
})

export const Partner = Loadable({
  loading,
  loader: _ => import('./pages/Partner')
})
Partner.Offers = Loadable({
  loading,
  loader: _ => import('./pages/_partner/Offers')
})
Partner.Scan = Loadable({
  loading,
  loader: _ => import('./pages/_partner/Scan')
})

export const Offer = Loadable({
  loading,
  loader: _ => import('./pages/Offer')
})

export const NotFound = Loadable({
  loading,
  loader: _ => import('./pages/NotFound')
})

export const Login = Loadable({
  loading,
  loader: _ => import('./pages/Login')
})

export const Register = Loadable({
  loading,
  loader: _ => import('./pages/Register')
})
