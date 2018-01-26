import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavLink from '../NavLink';

configure({ adapter: new Adapter() });

const testUrl = '/test-url';

test('NavLink snapshot match', () => {
  const component = renderer.create(
    <BrowserRouter>
      <NavLink to={testUrl} />
    </BrowserRouter>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Feature values', () => {
  // Render a checkbox with label in the document
  const element = shallow(
    <BrowserRouter>
      <NavLink to={testUrl} />
    </BrowserRouter>,
  );
  const liTag = element.find(NavLink);
  expect(liTag.length).toEqual(1);
});