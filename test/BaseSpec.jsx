import React from 'react';
import { renderIntoDocument } from 'react-dom/test-utils';

describe('Base test suite', () => {
  it('Render test', () => {
    renderIntoDocument(<div>test</div>);
  });
});
