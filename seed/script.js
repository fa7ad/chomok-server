const nodeFetch = require('node-fetch')
const fetch = require('fetch-cookie')(nodeFetch)

fetch('http://localhost:3003/api/login', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ username: 'prgmlord', password: 'Prgml0rd' })
})
  .then(r => r.json())
  .then(_ =>
    fetch('http://localhost:3003/api/zones', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Banani',
        division: 'Dhaka'
      })
    })
  )
  .then(r => r.json())
  .then(_ =>
    fetch('http://localhost:3003/api/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Partnerman',
        phone: '01823456789',
        username: 'partnerman',
        password: 'verySecur4',
        email: 'demo@partner.com',
        business: {
          name: 'Some Cafe',
          address: 'some street, some area, dhaka',
          phone: '0266666666'
        }
      })
    })
  )
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
