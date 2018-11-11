# react-unity-rich-text

> React component to parse and stylize unity rich text

[![NPM](https://img.shields.io/npm/v/react-unity-rich-text.svg)](https://www.npmjs.com/package/react-unity-rich-text) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-unity-rich-text
```

## Usage

```jsx
import React, { Component } from 'react'

import UnityRichTextComponent from 'react-unity-rich-text'

class Example extends Component {
  render () {
    return (
      <UnityRichTextComponent>{"<size=30>Some unity <color=#ff0000ff>RICH</color> text</size>"}<UnityRichTextComponent>
    )
  }
}
```

## License

MIT © [emargollo](https://github.com/emargollo)
