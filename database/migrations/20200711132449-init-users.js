'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize
    await queryInterface.createTable('users', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
        comment: '唯一索引',
      },
      phone: {
        type: STRING(11),
        unique: true,
        allowNull: true,
        comment: '手机号',
      },
      password: {
        type: STRING,
        allowNull: true,
        comment: '密码',
      },
      name: {
        type: STRING(50),
        allowNull: false,
        comment: '昵称',
      },
      avatar: {
        type: STRING,
        allowNull: true,
        comment: '头像',
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
