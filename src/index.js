import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

export default class UnityRichTextComponent extends Component {
  static propTypes = {
    children: PropTypes.string
  }

  render() {
    const {children} = this.props
    return (
      <div className={styles.test}>
        {children}
      </div>
    )
  }
}
