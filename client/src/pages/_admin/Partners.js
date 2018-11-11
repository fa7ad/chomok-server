import React from 'react'
import { remove } from 'ramda'
import { List, Button, Tag, Modal } from 'antd'
import { navigate } from '@reach/router'
import moment from 'moment'

function showPartner (item) {
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
          <Tag>Date registered</Tag>{' '}
          <span>{moment(item.dateReg, 'YYYYMMDD').format('DD-MM-YYYY')}</span>
        </div>
        <hr />
        <h3>Business</h3>
        <div>
          <Tag>Name</Tag> <span>{item.business.name}</span>
        </div>
        <div>
          <Tag>Address</Tag> <span>{item.business.address}</span>
        </div>
        <div>
          <Tag>Phone</Tag> <span>{item.business.phone}</span>
        </div>
      </>
    ),
    onOk () {}
  })
}

class AdminPartners extends React.PureComponent {
  state = {
    partners: [],
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
          dataSource={this.state.partners}
          renderItem={this.listMapper}
        />
      </>
    )
  }

  componentDidMount () {
    fetch('/api/users/partner', { credentials: 'include' })
      .then(r => {
        if (r.status === 401) navigate('/login')
        return r.json()
      })
      .then(({ ok, data: partners }) => {
        if (!ok) throw new Error('Something went wrong')
        this.setState({ partners, loading: false })
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
        <Button onClick={this.deleteItem(item._id, idx)} type='danger'>
          DELETE!
        </Button>
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
      <b>Business:</b> {item.business.name}
    </Tag>
  )

  getItemDesc = item => (
    <Tag color='blue'>
      <b>Name:</b> {item.name}
    </Tag>
  )

  showItem = item => e => showPartner(item)

  deleteItem = (id, idx) => e => {
    fetch('/api/users/' + id, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(({ ok }) => {
        if (ok) {
          this.setState(p => {
            const partners = remove(idx, 1, p.partners)
            return { partners }
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

export default AdminPartners
