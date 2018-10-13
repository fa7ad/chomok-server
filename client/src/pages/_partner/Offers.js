import React from 'react'
import moment from 'moment'
import { toUpper } from 'ramda'
import { navigate } from '@reach/router'
import { List, Avatar, Tag } from 'antd'

class PartnerOffers extends React.PureComponent {
  state = {
    offers: [],
    loading: true
  }

  listStyle = {
    textAlign: 'left'
  }

  render () {
    return (
      <List
        loading={this.state.loading}
        itemLayout='horizontal'
        dataSource={this.state.offers}
        renderItem={this.listMapper}
      />
    )
  }

  componentDidMount () {
    fetch('/api/offers', { credentials: 'include' })
      .then(r => {
        if (r.status === 401) navigate('/login')
        return r.json()
      })
      .then(({ ok, data }) => {
        if (!ok) throw new Error('Something went wrong')
        this.setState({ offers: data, loading: false })
      })
      .catch(e => {
        console.error(e)
      })
  }

  listMapper = (item, idx) => (
    <List.Item
      actions={null}
      key={item._id}>
      <List.Item.Meta
        avatar={<Avatar src={item.image} size='large' shape='square' />}
        title={this.getItemTitle(item)}
        description={this.getItemDesc(item)}
        style={this.listStyle}
      />
    </List.Item>
  )

  getItemTitle = item => {
    const date = moment(item.date, 'YYYYMMDD')
    const isToday = date.isSame(moment(), 'day')
    const text = date.format('DD-MM-YYYY')
    return (
      <>
        <Tag color={isToday ? 'cyan' : 'magenta'}>
          <b>Date: </b> {isToday ? 'Today / ' : ''}
          {text}
        </Tag>
        <Tag color='orange'>
          <b>Zone:</b> {toUpper(item.zone.division + ' > ' + item.zone.name)}
        </Tag>
      </>
    )
  }

  getItemDesc = item => (
    <>
      <Tag color='blue'>
        <b>Request:</b> {item.reqBy.length}
      </Tag>
      <Tag color='green'>
        <b>Used:</b> {item.useBy.length}
      </Tag>
      <Tag color='pink'>
        <b>Unused:</b> {item.reqBy.length - item.useBy.length}
      </Tag>
    </>
  )
}

export default PartnerOffers
