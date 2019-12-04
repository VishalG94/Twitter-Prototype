import React from 'react'
import {shallow} from '../../enzyme'
import { Field, reduxForm } from 'redux-form'
import Login from '../Login/Login'


describe('List tests', () => {

    it('renders three  components', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find(<Field/>)).to.have.lengthOf(3);
      });

})









