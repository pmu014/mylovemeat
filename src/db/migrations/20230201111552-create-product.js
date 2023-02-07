'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('products', {
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
        price: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        img: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        description: {
          allowNull: false,
          type: Sequelize.TEXT,
        },
        quantity:{
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        adminId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        quantity: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        deletedAt: {
          type: Sequelize.DATE,
        },
      })
      .then(async () => {
        await queryInterface.addConstraint('products', {
          fields: ['adminId'],
          type: 'foreign key',
          name: 'admins_products_fk',
          references: {
            table: 'admins',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        });
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  },
};
