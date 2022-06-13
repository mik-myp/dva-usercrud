import { request } from 'umi';
import { message } from 'antd';
interface optionsType {
  method: string;
  params?: any;
  data?: any;
}

const baseUrl = 'http://public-api-v1.aspirantzhang.com';
export const Request = (url: string, options: optionsType, mes?: string) => {
  return request(baseUrl + url, {
    ...options,
    skipErrorHandler: true,
  })
    .then(function (response) {
      message.success(`${mes}成功`);
      return response.data;
    })
    .catch(function (error) {
      message.error(`${mes}失败`);
    });
};
