import { Effect, Reducer, Subscription } from 'umi';
import { getRemoteList, updateUser, deleteUser, addUser } from './service';
import { UserModelType } from './types/usersType';

const UserModel: UserModelType = {
  namespace: 'users',
  state: {
    data: [],
    meta: {
      page: 1,
      per_page: 10,
      total: 0,
    },
  },
  reducers: {
    getList(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
  },
  effects: {
    *getRemote(action, { call, put }) {
      const dataList = yield call(getRemoteList);
      yield put({ type: 'getList', payload: dataList });
    },

    *updateUser({ payload }, { call, put }) {
      yield call(updateUser, payload);
      yield put({ type: 'getRemote' });
    },

    *deleteUser({ payload }, { call, put }) {
      yield call(deleteUser, payload);
      yield put({ type: 'getRemote' });
    },

    *addUser({ payload }, { call, put }) {
      yield call(addUser, payload);
      yield put({ type: 'getRemote' });
    },

    *refresh({ payload }, { call, put }) {
      yield put({ type: 'getRemote' });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/users') {
          dispatch({
            type: 'getRemote',
          });
        }
      });
    },
  },
};
export default UserModel;
