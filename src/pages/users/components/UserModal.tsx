import { Modal, Form, Input, DatePicker } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import { UserModalType } from '../types/usersType';

export default function UserModal(props: UserModalType) {
  const { visible, handleCancel, handleOk, record } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(record);
  }, [record]);

  return (
    <Modal
      visible={visible}
      title="Basic Modal"
      keyboard
      maskClosable
      forceRender
      onCancel={() => {
        handleCancel();
        form.resetFields();
      }}
      onOk={() => {
        handleOk(form.getFieldsValue(true));
      }}
    >
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} form={form}>
        <Form.Item label="名字" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="邮箱" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="状态" name="status">
          <Input />
        </Form.Item>
        <Form.Item label="创建时间" name="create_time">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
