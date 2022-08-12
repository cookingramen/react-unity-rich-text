import convert from 'xml-js'
import colorToHex from './colors'

export default class UnityRichTextParser {
  constructor() {
    this.currentId = 0
  }

  addKeyToElements(elements) {
    return elements.map((element) => {
      if (element.type !== undefined && element.type !== 'element') return element
      element.key = this.currentId
      this.currentId++
      element.elements = [...this.addKeyToElements(element.elements)]
      return element
    })
  }

  parse(text) {
    let result = [
      {
        type: 'text',
        text: text
      }
    ]
    try {
      const convertColorSize = text
        .replace(/[^<]*(color|size|link|align)=[^>]*/g, (e) => {
          const data = e.replaceAll('"', '').split('=')
          switch (data[0]) {
            case 'color':
              return `${data[0]} value="${colorToHex(data[1])}"`
            case 'size':
              return `${data[0]} value="${data[1]}"`
            case 'link':
              return `a target="_blank" href="${data[1]}"`
            case 'align':
              return `${data[0]} value="${data[1]}"`
          }
        })
        .replace('</link>', '</a>')
        .replace(/(\n)/g, '<br />')

      const textToParse = `<unityText>${convertColorSize}</unityText>`
      result = convert.xml2js(textToParse, {compact: false, spaces: 4})

      const {elements: {0: {elements}}} = result
      return this.addKeyToElements(elements)
    } catch (e) {
      return result
    }
  }
}
