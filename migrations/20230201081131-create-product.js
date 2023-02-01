'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.STRING,
        allowNull: false
      },
      img: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      adminId: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};