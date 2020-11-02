import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {
    env: 'prod', // 推荐云函数的 egg 运行环境变量修改为 prod
    rundir: '/tmp',
    logger: {
      dir: '/tmp',
    },
  } as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_0408';

  config.oauth = {
    match: '/graphql',
  };

  // add your egg config in here
  config.middleware = ['error', 'auth', 'graphql'];

  // graphql 配置
  config.graphql = {
    router: '/graphql',
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
    graphiql: true,
    apolloServerOptions: {
      tracing: true, // 设置为true时，以Apollo跟踪格式收集和公开跟踪数据
      debug: true, // 一个布尔值，如果发生执行错误，它将打印其他调试日志记录
      formatError: (error: any) => {
        return new Error(error.message);
      },
      formatResponse(data: any, _all: any) {
        delete data.extensions; // 当加上 tracing: true 返回到前端的会有extensions对象的值 对前端来说这数据没有用 所有可以删除
        return data;
      },
    },
  };

  // sequelize 配置
  config.sequelize = {
    dialect: 'mysql',  // support: mysql, mariadb, postgres, mssql
    host: '127.0.0.1',
    port: 3306,
    database: 'wisdom-project', // /数据库名
    username: 'root',
    password: 'limscript',
  };

  // redis 配置
  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: '',
      db: 0
    },
  };

  config.bodyParser = {
    enable: true,
    jsonLimit: '10mb',
  };

  // 阿里云短信插件 配置
  config.aliyun = {
    accessKeyId: 'limLTAI4G1F2gqe---pTnbYQTYHbRBroid',   // 秘钥
    accessKeySecret: 'limjVUAQlOhk9GC---3WnUGTNyggIyfPuNDBroid',   // 秘钥
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25',
    sendSms: {
      RegionId: 'cn-hangzhou',
      SignName: '智慧工程',   // 短信签名
      TemplateCode: 'SMS_193506476', // 短信模板ID
    },
  };

  // CORS 跨域访问配置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // CSRF 跨站请求伪造配置
  config.security = {
    csrf: {
      ignore: () => true,
    },
  };

  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };
  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
