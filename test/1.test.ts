import UpInfo from '../src/index';

describe('UpInfo', () => {
  it('应正确解码 base64 字符串', () => {
    const ctx = {
      request: {
        method: 'SOCK',
         "header": {
          "path": "Api7822/ucenter/lovers/login",
          "pcid": "3732bf61-e06d-407b-94df-8c947ced96c7",
          "mid": "3732bf61-e06d-407b-94df-8c947ced96c7",
          "pars": 'SGVsbG8gV29ybGQ=',
          "upid": "1"
        }
    
      }
    };
    const upInfo = new UpInfo(ctx);

    // @ts-ignore: 访问私有属性进行测试
    expect(upInfo.parsn).toBe('SGVsbG8gV29ybGQ=');
    // @ts-ignore: 访问私有属性进行测试
    expect(upInfo.v).toBe(24);
  });
 
});
