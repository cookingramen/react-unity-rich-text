import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import UnityParser from './utils/unityParser'

import styles from './styles.css'

export default class UnityRichTextComponent extends PureComponent {
  static propTypes = {
    children: PropTypes.string
  }

  constructor(props) {
    super()
    this.parser = new UnityParser()
  }

  parseElements(elements) {
    return elements.map((element) => {
      if (element.type === 'text') {
        return element.text
      } else if (element.type === 'element') {
        return this.createElementSpan(element)
      }
    })
  }

  createElementSpan(element) {
    let style = {}
    switch (element.name) {
      case 'b':
        style.fontWeight = `bold`
        break
      case 'i':
        style.fontStyle = `italic`
        break
      case 'size':
        style.fontSize = `${element.attributes.value}px`
        break
      case 'color':
        style.color = element.attributes.value
        break
      default:
        console.error('unexpected tag')
        break
    }

    return (
      <span
        className={styles.unityTextSpan}
        key={element.key}
        style={style}
      >
        {this.parseElements(element.elements)}
      </span>
    )
  }

  render() {
    const {children} = this.props
    const parsedChildren = this.parser.parse(children)

    return (
      this.parseElements(parsedChildren)
    )
  }
}
