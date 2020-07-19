import { Context } from 'egg';

export default class UtilsConnector {
  ctx: Context;
  constructor(ctx: Context) {
    this.ctx = ctx;
  }

  async register(data: any) {
    const { ctx } = this;
    return await ctx.service.user.register(data);
  }
}

// interface IMailData {
//   to: string;
//   subject: string;
//   html: string;
// }
