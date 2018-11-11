import React from 'react'

import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import UnityRichTextComponent from './'

configure({adapter: new Adapter()})

describe('UnityRichTextComponent', () => {
  it('is truthy', () => {
    expect(UnityRichTextComponent).toBeTruthy()
  })

  it('should render a single span element', () => {
    const wrapper = shallow(<UnityRichTextComponent>{'We are <b>not</b> amused.'}</UnityRichTextComponent>)
    expect(wrapper.find('span')).toHaveLength(1)
  })

  it('should contain nested spans', () => {
    const wrapper = mount(<UnityRichTextComponent>{'<size=30>Some <color=#ff0000ff>RICH</color> text</size>'}</UnityRichTextComponent>)
    expect(wrapper.find('span').children().find('span')).toHaveLength(1)
  })
})
