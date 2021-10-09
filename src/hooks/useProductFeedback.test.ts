import * as React from 'react';

/**
 * You cannot test a hook in isolation. A hook must be used in the context of a functional component.
 * Therefore, the way to test a hook is to extract the functions from the hook and test them as ordinary
 * functions indepenedently of the hook.
 *
 * See https://blog.logrocket.com/a-quick-guide-to-testing-react-hooks-fa584c415407/ for a description of
 * how to test a hook in practice.
 */

describe('feedback', () => {
  test('expect true to be true', () => {
    expect(true).toBeTruthy();
  });
});
