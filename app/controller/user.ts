import { Controller } from 'egg';

export default class UserController extends Controller {
  /**
   * 注册
   */
  async register() {
    const { ctx } = this;


    const { name, phone, password, code } = ctx.request.body;
    const params = { name, phone, password, code };
    console.log('params', params);
    await ctx.service.user.register(params);

  }
}
