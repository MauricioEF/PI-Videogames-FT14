import React from 'react';
import { configure, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { MemoryRouter } from 'react-router-dom'
import  App  from './App';
import Nav from './components/Nav';

configure({adapter: new Adapter()});

describe('App', () => {
  let store;
  const middlewares = []
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore([]);
  });

  describe('El componente Nav debe renderizar en todas las rutas.', () => {
    it('Debería renderizarse en la ruta "/"', () => {
      const wrapper = shallow(<App/>)
        expect(wrapper.find(Nav)).toHaveLength(1);
    });
    it('No debería renderizarse en la ruta "/start"',()=>{
      const wrapper = shallow(<MemoryRouter initialEntries={[ '/start' ]}><App/></MemoryRouter>);
      expect(wrapper.find(Nav)).toHaveLength(0);
    })
  });
});
