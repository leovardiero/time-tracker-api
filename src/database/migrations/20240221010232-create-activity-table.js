module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'activities',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },

        project_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'projects',
            key: 'id',
          },
        },

        owner_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
        },

        type_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'types',
            key: 'id',
          },
        },

        description: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },

        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('activities');
  },
};
