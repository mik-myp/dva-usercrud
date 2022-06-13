// model
import { Effect, Reducer, Subscription } from 'umi';
import { ConnectProps, InitialState, Loading, Dispatch } from 'umi';

export interface UsersList {
  create_time: string;
  email: string;
  id?: number;
  name: string;
  status: number;
  update_time?: string;
}
export interface state {
  data: UsersList[];
  meta: {
    page: number;
    per_page: number;
    total: number;
  };
}
export interface UserModelType {
  namespace: 'users';
  state: state;
  reducers: {
    getList: Reducer;
  };
  effects: {
    getRemote: Effect;
    updateUser: Effect;
    deleteUser: Effect;
    addUser: Effect;
    refresh: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

// index

export interface PageProps extends ConnectProps {
  usersList: InitialState;
  loading: boolean;
  dispatch: Dispatch;
}
export interface connectType {
  users: InitialState;
  loading: Loading;
}

// UserModal
export interface UserModalType {
  visible: boolean;
  record: Object;
  handleCancel: () => void;
  handleOk: (value: any) => void;
}
