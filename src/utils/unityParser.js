import convert from 'xml-js'
import colorToHex from './colors'

export default class UnityRichTextParser {
  parse(text) {
    const convertColorSize = text.replace(/[^<]*(color|size)=[^>]*/g, (e) => {
      const data = e.split('=')
      return `${data[0]} value="${data[0] === 'color' ? colorToHex(data[1]) : data[1]}"`
    })
    const textToParse = `<unityText>${convertColorSize}</unityText>`
    const result = convert.xml2js(textToParse, {compact: false, spaces: 4})
    const {elements: {0: {elements}}} = result
    return elements
  }
}
