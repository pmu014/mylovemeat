'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(async()=>{
      await queryInterface.addConstraint('carts', {
        fields: ['userId'],
        type: 'foreign key',
        name: 'users_carts_fk',
        references: {
          table: 'users',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      });
      await queryInterface.addConstraint('carts', {
        fields: ['productId'],
        type: 'foreign key',
        name: 'products_carts_fk',
        references: {
          table: 'products',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      });
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('carts');
  }
};