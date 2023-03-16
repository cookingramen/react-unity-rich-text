import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import UnityParser from './utils/unityParser'

import styles from './styles.css'

export default class UnityRichTextComponent extends PureComponent {
  static propTypes = {
    children: PropTypes.string,
    onBold: PropTypes.func,
    onItalic: PropTypes.func,
    onUnderline: PropTypes.func,
    onSize: PropTypes.func,
    onColor: PropTypes.func,
    onCenter: PropTypes.func,
    onLink: PropTypes.func
  }

  static defaultProps = {
    onBold: () => {
      return {fontWeight: 'bold'}
    },
    onItalic: () => {
      return {fontStyle: 'italic !important'}
    },
    onUnderline: () => {
      return {textDecoration: 'underline'}
    },
    onSize: (size) => {
      return {fontSize: `${size}px`}
    },
    onColor: (color) => {
      return {color: color}
    },
    onCenter: (to) => {
      return {to: to}
    },
    onLink: (href, target) => {
      return {href: href, target: target}
    }
  }

  constructor(props) {
    super()
    this.parser = new UnityParser()
  }

  parseElements(elements) {
    if (elements === undefined) return
    if (elements.elements) elements = elements.elements

    return elements.map((element) => {
      if (element.type === 'text') {
        return element.text
      } else if (element.type === 'element') {
        return this.createElementSpan(element)
      }
    })
  }

  createElementSpan(element) {
    const {
      onBold,
      onItalic,
      onUnderline,
      onSize,
      onColor,
      onCenter,
      onLink
    } = this.props
    let style = onItalic()
    switch (element.name) {
      case 'b':
        style = onBold()
        break
      case 'i':
        style = onItalic()
        break
      case 'u':
        style = onUnderline()
        break
      case 'size':
        style = onSize(element.attributes.value)
        break
      case 'color':
        style = onColor(element.attributes.value)
        break
      case 'align':
        style = onCenter(element.attributes.value)
        break
      case 'a':
        style = onLink(element.attributes.href, element.attributes.target)
        break
      case 'br': break
      default:
        console.error('unexpected tag: %s', element.name)
        style = onItalic()
        break
    }
    switch (element.name) {
      case 'br':
        return (
          <br />
        )
      case 'a': {
        return (
          <a className={styles.unityTextSpan}
            key={element.key}
            href={style.href}
            target={style.target}>
            {this.parseElements(element.elements)}
          </a>
        )
      }
      case 'align': {
        return (
          <div align={style.to}>
            {this.parseElements(element.elements)}
          </div>
        )
      }
      default: {
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
    }
  }

  render() {
    const {children} = this.props
    const parsedChildren = this.parser.parse(children)

    return (
      this.parseElements(parsedChildren)
    )
  }
}
