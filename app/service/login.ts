import { Service } from 'egg';

export default class Login extends Service {
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
    const { ctx } = this;
    const { code, name, phone, password } = data;
    const r_code = await ctx.service.redis.get(phone);
    if (Number(code) === Number(r_code)) {
      return await this.database.create({ name, phone, password });
    }
  }
}
interface IRegisterData {
  code: string;
  name: string;
  phone: string;
  password: string;
}
