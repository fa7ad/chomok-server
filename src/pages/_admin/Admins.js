import React from 'react'
import { remove } from 'ramda'
import { List, Button, Tag, Modal } from 'antd'
import { navigate } from '@reach/router'
import moment from 'moment'

function showAdmin (item) {
  Modal.info({
    title: 'Admin',
    content: (
      <>
        <div>
          <Tag color='red'>Name</Tag> <span>{item.name}</span>
        </div>
        <div>
          <Tag color='red'>Phone</Tag> <span>{item.phone}</span>
        </div>
        <div>
          <Tag color='red'>Username</Tag> <span>{item.username}</span>
        </div>
        <div>
          <Tag color='red'>Email</Tag> <span>{item.email}</span>
        </div>
        <div>
          <Tag color='red'>Date registered</Tag>
          <span>{moment(item.dateReg, 'YYYYMMDD').format('DD-MM-YYYY')}</span>
        </div>
      </>
    ),
    onOk () {}
  })
}

class AdminAdmins extends React.PureComponent {
  state = {
    admins: [],
    loading: true
  }

  listStyle = {
    textAlign: 'left'
  }

  render () {
    return (
      <>
        <Modal visible={this.state.showModal}>{this.state.modalContent}</Modal>
        <List
          loading={this.state.loading}
          itemLayout='horizontal'
          dataSource={this.state.admins}
          renderItem={this.listMapper}
        />
      </>
    )
  }

  componentDidMount () {
    fetch('/api/users/admin', { credentials: 'include' })
      .then(r => {
        if (r.status === 401) navigate('/login')
        return r.json()
      })
      .then(({ ok, data: admins }) => {
        if (!ok) throw new Error('Something went wrong')
        this.setState({ admins, loading: false })
      })
      .catch(e => {
        console.error(e)
      })
  }

  listMapper = (item, idx) => (
    <List.Item
      actions={[
        <Button onClick={this.showItem(item)} type='primary'>
          View
        </Button>,
        item._id === '0a0b1a1b' || (
          <Button onClick={this.deleteItem(item._id, idx)} type='danger'>
            DELETE!
          </Button>
        )
      ]}>
      <List.Item.Meta
        title={this.getItemTitle(item)}
        description={this.getItemDesc(item)}
        style={this.listStyle}
      />
    </List.Item>
  )

  getItemTitle = item => (
    <Tag color='red'>
      <b>username:</b> {item.username}
    </Tag>
  )

  getItemDesc = item => (
    <Tag color='blue'>
      <b>Name:</b> {item.name}
    </Tag>
  )

  showItem = item => e => showAdmin(item)

  deleteItem = (id, idx) => e => {
    fetch('/api/users/' + id, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(({ ok }) => {
        if (ok) {
          this.setState(p => {
            const admins = remove(idx, 1, [].concat(p.admins))
            return { admins }
          })
        } else {
          throw new Error('Something went wrong')
        }
      })
      .catch(e => {
        console.error(e)
      })
  }
}

export default AdminAdmins
