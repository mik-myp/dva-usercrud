import { Request } from '../../util/request';

export const getRemoteList = async () => {
  return Request(
    '/users',
    {
      method: 'get',
    },
    '用户数据获取',
  );
};
export const updateUser = async (values: any) => {
  return Request(
    `/users/${values.id}`,
    {
      method: 'put',
      data: values,
    },
    '用户更新',
  );
};
export const deleteUser = async (values: any) => {
  return Request(
    `/users/${values}`,
    {
      method: 'delete',
    },
    '用户删除',
  );
};
export const addUser = async (values: any) => {
  return Request(
    `/users`,
    {
      method: 'post',
      data: values,
    },
    '用户添加',
  );
};
