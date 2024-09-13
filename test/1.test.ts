import UpInfo from '../src/index';

describe('UpInfo', () => {
  it('应正确解码 base64 字符串并设置 SOCK API 相关属性', () => {
    console.log('开始测试: 应正确解码 base64 字符串并设置 SOCK API 相关属性');
    
    const ctx = {
      request: {
        method: 'SOCK',
        header: {
          method: "Api7822/ucenter/lovers/login",
          pcid: "3732bf61-e06d-407b-94df-8c947ced96c7",
          mid: "3732bf61-e06d-407b-94df-8c947ced96c7",
          pars: 'SGVsbG8gV29ybGQ=',
          upid: "1",
          v: "24"  // 保持为字符串
        }
      }
    };
    
    console.log('创建的 ctx 对象:', JSON.stringify(ctx, null, 2));
    
    console.log('创建 UpInfo 实例');
    const upInfo = new UpInfo(ctx);
    console.log('UpInfo 实例创建完成');
    
    console.log('UpInfo 实例的属性:');
    console.log('parsn:', upInfo.parsn);
    console.log('v:', upInfo.v);
    console.log('method:', upInfo.method);
    console.log('apiver:', upInfo.apiver);
    console.log('apisys:', upInfo.apisys);
    console.log('apiobj:', upInfo.apiobj);
    console.log('apifun:', upInfo.apifun);

    expect(upInfo.parsn).toBe('SGVsbG8gV29ybGQ=');
    expect(upInfo.v).toBe(24);  // 期望为数字 24
    expect(upInfo.method).toBe('Api7822/ucenter/lovers/login');
    expect(upInfo.apiver).toBe('Api7822');
    expect(upInfo.apisys).toBe('ucenter');
    expect(upInfo.apiobj).toBe('lovers');
    expect(upInfo.apifun).toBe('login');
    
    console.log('测试完成');
  });

  it('应正确处理 HTTP GET 请求并设置相关属性', () => {
    console.log('开始测试: 应正确处理 HTTP GET 请求并设置相关属性');
    
    const ctx = {
      request: {
        method: 'GET',
        path: '/api/v1/users',
        query: {
          bcid: 'test-bcid',
          v: '24',
          getstart: '0',
          pars: JSON.stringify(['param1', 'param2']),
          mid: 'test-mid',
          getnumber: '20',
          cols: JSON.stringify(['col1', 'col2']),
          order: 'col1 asc'
        },
        header: {
          'x-forwarded-for': '192.168.1.1',
          'source': 'web',
          'uname': 'testuser',
          'pwd': 'testpass',
          'sid': 'test-sid'
        }
      },
      params: {
        apiver: 'v1',
        apisys: 'users',
        apiobj: 'profile',
        apifun: 'get'
      }
    };
    
    console.log('创建的 ctx 对象:', JSON.stringify(ctx, null, 2));
    
    console.log('创建 UpInfo 实例');
    const upInfo = new UpInfo(ctx);
    console.log('UpInfo 实例创建完成');
    
    console.log('UpInfo 实例的属性:');
    console.log('method:', upInfo.method);
    console.log('bcid:', upInfo.bcid);
    console.log('v:', upInfo.v);
    console.log('getstart:', upInfo.getstart);
    console.log('pars:', upInfo.pars);
    console.log('mid:', upInfo.mid);
    console.log('getnumber:', upInfo.getnumber);
    console.log('cols:', upInfo.cols);
    console.log('order:', upInfo.order);
    console.log('ip:', upInfo.ip);
    console.log('source:', upInfo.source);
    console.log('uname:', upInfo.uname);
    console.log('pwd:', upInfo.pwd);
    console.log('sid:', upInfo.sid);
    console.log('apiver:', upInfo.apiver);
    console.log('apisys:', upInfo.apisys);
    console.log('apiobj:', upInfo.apiobj);
    console.log('apifun:', upInfo.apifun);

    expect(upInfo.method).toBe('/api/v1/users');
    expect(upInfo.bcid).toBe('test-bcid');
    expect(upInfo.v).toBe(24);
    expect(upInfo.getstart).toBe(0);
    expect(upInfo.pars).toEqual(['param1', 'param2']);
    expect(upInfo.mid).toBe('test-mid');
    expect(upInfo.getnumber).toBe(20);
    expect(upInfo.cols).toEqual(['col1', 'col2']);
    expect(upInfo.order).toBe('col1 asc');
    expect(upInfo.ip).toBe('192.168.1.1');
    expect(upInfo.source).toBe('web');
    expect(upInfo.uname).toBe('testuser');
    expect(upInfo.pwd).toBe('testpass');
    expect(upInfo.sid).toBe('test-sid');
    expect(upInfo.apiver).toBe('v1');
    expect(upInfo.apisys).toBe('users');
    expect(upInfo.apiobj).toBe('profile');
    expect(upInfo.apifun).toBe('get');
    
    console.log('测试完成');
  });

  it('应正确克隆 UpInfo 对象', () => {
    const originalUpInfo = new UpInfo(null);
    originalUpInfo.sid = 'test-sid';
    originalUpInfo.uname = 'test-user';
    originalUpInfo.bcid = 'test-bcid';
    originalUpInfo.v = 25;  // 这个属性不应被克隆

    const clonedUpInfo = originalUpInfo.clone();

    expect(clonedUpInfo.sid).toBe('test-sid');
    expect(clonedUpInfo.uname).toBe('test-user');
    expect(clonedUpInfo.bcid).toBe('test-bcid');
    expect(clonedUpInfo.v).toBe(24);  // 应该是默认值,而不是原始对象的值
  });
});
