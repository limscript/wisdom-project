import { Service } from 'egg';
import * as Core from "@alicloud/pop-core";

/**
 * Test Service
 */
export default class Untils extends Service {
  /**
   * sayHi to you
   * @param PhoneNumbers - your phone
   */
  public sendSms(PhoneNumbers: string) {
    const { ctx, app } = this;
    const { accessKeyId, accessKeySecret, endpoint, apiVersion, sendSms } = app.config.aliyun;
    const { RegionId, SignName, TemplateCode } = sendSms;

    const client = new Core({
      accessKeyId,
      accessKeySecret,
      endpoint,
      apiVersion,
    })

    // 生成验证码
    const sendCode = ctx.helper.smsCode();

    const params = {
      RegionId,
      PhoneNumbers,
      SignName,
      TemplateCode,
      TemplateParam: JSON.stringify({ code: sendCode }),
    }

    // 请求方式 POST
    const requestOption = {
      method: 'POST',
    };

    return new Promise(async (resolve, _reject) => {
      // 调用方法完成短信发送
      await client.request('SendSms', params, requestOption).then(async (result: any) => {
        // 把生成的验证码存到redis中
        await ctx.service.redis.set(PhoneNumbers, sendCode, 60);
        return resolve(result);
      }).catch((ex: any) => {
        resolve(ex.data);
      });
    });
  }
}
