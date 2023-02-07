'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('orders', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        address: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        phone: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        status: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        quantity: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        productId: {
          type: Sequelize.INTEGER,
        },
        quantity:{
          allowNull: false,
          type: Sequelize.STRING,
        },
        status:{
          allowNull: false,
          type: Sequelize.STRING,
        },
        userId: {
          type: Sequelize.INTEGER,
        },
        quantity: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        status: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(async () => {
        await queryInterface.addConstraint('orders', {
          fields: ['userId'],
          type: 'foreign key',
          name: 'users_orders_fk',
          references: {
            table: 'users',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('orders', {
          fields: ['productId'],
          type: 'foreign key',
          name: 'products_orders_fk',
          references: {
            table: 'products',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        });
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  },
};
