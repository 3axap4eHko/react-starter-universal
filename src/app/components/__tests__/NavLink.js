import React from 'react';
import renderer from 'react-test-renderer';
import Steersman from 'react-steersman/Steersman';
import createMemoryHistory from 'react-steersman/createMemoryHistory';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavLink } from '../NavLink';

configure({ adapter: new Adapter() });

const testUrl = '/test-url';

const classesMock = new Proxy({}, {
  get(target, name) {
    return name;
  }
});

test('NavLink snapshot match', () => {
  const component = renderer.create(
    <Steersman history={createMemoryHistory()}>
      <NavLink to={testUrl} classes={classesMock} />
    </Steersman>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Feature values', () => {
  // Render a checkbox with label in the document
  const element = shallow(
    <Steersman history={createMemoryHistory()}>
      <NavLink to={testUrl} classes={classesMock} />
    </Steersman>,
  );
  const liTag = element.find(NavLink);
  expect(liTag.length).toEqual(1);
});