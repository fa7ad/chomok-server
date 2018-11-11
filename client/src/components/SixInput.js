import React from 'react'
import PropTypes from 'prop-types'
import { Radio, Input } from 'antd'
import styled from 'react-emotion'
import { repeat, merge, update } from 'ramda'

const RadioGroup = styled(Radio.Group)`
  > * {
    display: block;
    padding: 0 10px;
  }
`

class SixInput extends React.PureComponent {
  state = {
    values: repeat(null, 6),
    win: undefined
  }

  onChange = key => e => {
    const val = e.target.value
    this.setState(p => {
      const values = update(key, val, p.values)
      this.props.onChange(merge(p, { values }))
      return { values }
    })
  }

  onActivate = e => {
    this.setState(p => {
      const win = e.target.value
      this.props.onChange(merge(p, { win }))
      return { win }
    })
  }

  render () {
    return (
      <RadioGroup onChange={this.onActivate}>
        {Array.from({ length: 6 }, (_, i) => (
          <Radio key={i} value={i}>
            <Input
              onChange={this.onChange(i)}
              placeholder={this.props.label + ' ' + i}
            />
          </Radio>
        ))}
      </RadioGroup>
    )
  }

  static propTypes = {
    onChange: PropTypes.func,
    label: PropTypes.string
  }
}

export default SixInput
