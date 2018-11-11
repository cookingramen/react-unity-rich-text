import React, { Component } from 'react'

import UnityRichTextComponent from 'react-unity-rich-text'

export default class App extends Component {
  render () {
    const testMessages = [
      "We are <b>not</b> amused.",
      "We are <i>usually</i> not amused.",
      "We are <size=50>largely</size> unaffected.",
      "We are <color=green>green</color> with envy",
      "<size=30>Some <color=#ff0000ff>RICH</color> text</size>",
      "We are <b>absolutely <i>definitely</i> not</b> amused",
      "We are <b><i>definitely not</i></b> amused",
      "We are <color=#0000ff>colorfully</color> amused"
    ]
    const itens = testMessages.map(message => (
      <tr key={message}>
        <td>{message}</td>
        <td><UnityRichTextComponent>{message}</UnityRichTextComponent></td>
      </tr>
    ))

    return (
      <div className="app">
        <table>
          <thead>
            <tr>
              <th>Original</th>
              <th>Parsed</th>
            </tr>
          </thead>
          <tbody>
            {itens}
          </tbody>
        </table>
      </div>
    )
  }
}
