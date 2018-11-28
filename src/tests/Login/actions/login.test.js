import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  AUTHENTICATED,
  AUTHENTICATION_IN_PROGRESS,
  AUTHENTICATION_FAILED,
} from '../../../redux/actions/types';
import { loginAction } from '../../../redux/actions/auth/authActions';
import users from '../../__mocks__/users';

jest.mock('react-notify-toast');
const mockStore = configureStore([thunk]);

describe('Test suite for login action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should handle login', async () => {
    const data = {
      username: 'testuser',
      password: '12345678',
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: {},
        },
      });
    });

    const expectedActions = [
      { type: AUTHENTICATION_IN_PROGRESS, loading: true },
      { type: AUTHENTICATED, payload: users, loading: false },
    ];

    const store = mockStore({});

    return store.dispatch(loginAction(data)).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
      expect(store.getActions()[0].loading).toEqual(expectedActions[0].loading);
      expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
    });
  });

  it('should handle invalid password', async () => {
    const data = {
      username: 'testuser',
      password: '1234567',
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: {
          detail: 'Passwords did not match.',
        },
      });
    });

    const expectedActions = [
      {
        type: AUTHENTICATION_IN_PROGRESS,
        loading: true,
      },
      {
        type: AUTHENTICATION_FAILED,
        payload: { errorMessage: 'Passwords did not match.' },
        loading: false,
      }];

    const store = mockStore();
    return store
      .dispatch(loginAction(data))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
