import { Service } from 'egg';

/**
 * User Service
 */
export default class User extends Service {
  private database: any;
  constructor(ctx: any) {
    super(ctx);
    this.database = ctx.model.Users;
  }
  /**
   * 用户注册
   * @param {object} data 注册信息
   * @memberof User
   */
  async register(data: IRegisterData) {
    // const { ctx } = this;
    const { code, name, phone, password } = data;
    console.log('oauth', code, name, phone, password);
    // 暂时不用验证码
    // const r_code = await ctx.service.redis.get(phone);
    if (Number(code)) {
      return await this.database.create({ name, phone, password });
    }
  }
}

interface IRegisterData {
  code: string;  // 验证码
  name: string;	 // 名称
  phone: string;	// 手机号
  password: string;	// 密码
}
