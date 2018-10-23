import React from 'react'
import moment from 'moment'
import { css } from 'react-emotion'
import { navigate } from '@reach/router'
import { List, Button, Tag, Modal } from 'antd'

const list = css`
  text-align: left;
`

const showUser = item => e => {
  Modal.info({
    title: 'Partner',
    content: (
      <>
        <div>
          <Tag>Name</Tag> <span>{item.name}</span>
        </div>
        <div>
          <Tag>Phone</Tag> <span>{item.phone}</span>
        </div>
        <div>
          <Tag>Username</Tag> <span>{item.username}</span>
        </div>
        <div>
          <Tag>Email</Tag> <span>{item.email}</span>
        </div>
        <div>
          <Tag>Date registered</Tag>
          <span>{moment(item.dateReg, 'YYYYMMDD').format('DD-MM-YYYY')}</span>
        </div>
      </>
    )
  })
}

class AdminUsers extends React.PureComponent {
  state = {
    users: [],
    loading: true
  }

  render () {
    return (
      <List
        loading={this.state.loading}
        itemLayout='horizontal'
        dataSource={this.state.users}
        renderItem={this.listMapper}
      />
    )
  }

  async componentDidMount () {
    try {
      const r = await fetch('/api/users/user', { credentials: 'include' })

      if (r.status === 401) navigate('/login')

      const { ok, data: users } = await r.json()
      if (!ok) throw new Error('Something went wrong')

      this.setState({ users, loading: false })
    } catch (err) {
      console.error(err)
    }
  }

  listMapper = (item, idx) => {
    const meta = {
      title: (
        <Tag color='blue'>
          <b>Name:</b> {item.name}
        </Tag>
      ),
      description: (
        <Tag color='red'>
          <b>Phone:</b> {item.phone}
        </Tag>
      ),
      className: list
    }

    return (
      <List.Item
        actions={[
          <Button onClick={showUser(item)} type='primary'>
            View
          </Button>
        ]}>
        <List.Item.Meta {...meta} />
      </List.Item>
    )
  }
}

export default AdminUsers
