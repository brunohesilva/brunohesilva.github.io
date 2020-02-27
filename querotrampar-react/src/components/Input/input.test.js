import React from 'react';
import Input from './Input';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});
test('Verifica input existe', ()=> {
    const wrapper = shallow(<Input />);
    expect(wrapper.find('input').length).toBe(1);
})