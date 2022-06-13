import { Space, Table, Popconfirm, Button } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { connect, ConnectProps, InitialState, Loading } from 'umi';
import UserModal from './components/UserModal';
import { PageProps, connectType, UsersList } from './types/usersType';
import type { ColumnsType } from 'antd/lib/table';

const Users: React.FC<PageProps> = ({ usersList, loading, dispatch }) => {
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState({});
  const columns: ColumnsType<UsersList> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (text: string) => {
        return moment(text).format('YYYY-MM-DD hh:mm:ss');
      },
    },
    {
      title: '修改时间',
      dataIndex: 'update_time',
      key: 'update_time',
      render: (text: string) => {
        return moment(text).format('YYYY-MM-DD hh:mm:ss');
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_: string, record: UsersList) => (
        <Space size="middle">
          <a
            onClick={() => {
              setVisible(true);
              setRecord(record);
            }}
          >
            编辑
          </a>
          <Popconfirm
            title="确定要删除吗？"
            okText="确定"
            cancelText="取消"
            onConfirm={() => {
              dispatch({
                type: 'users/deleteUser',
                payload: record.id,
              });
            }}
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = (value: UsersList) => {
    setVisible(false);
    dispatch({
      type: value.id ? 'users/updateUser' : 'users/addUser',
      payload: value,
    });
  };
  return (
    <div className="list-table">
      <Space>
        <Button
          onClick={() => {
            setVisible(true);
          }}
          type="primary"
        >
          添加
        </Button>
        <Button
          onClick={() => {
            dispatch({
              type: 'users/refresh',
            });
          }}
          type="primary"
        >
          刷新
        </Button>
      </Space>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={usersList}
        loading={loading}
      />
      <UserModal
        visible={visible}
        record={record}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </div>
  );
};

export default connect(({ users, loading }: connectType) => ({
  usersList: users.data,
  loading: loading.models.users,
}))(Users);
