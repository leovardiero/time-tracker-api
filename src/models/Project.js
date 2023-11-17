import Sequelize, { Model } from 'sequelize';

export default class Project extends Model {
  static init(sequelize) {
    super.init(
      {
        // Primary Key
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },

        name: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'Project name must be unique',
          },
          validate: {
            notEmpty: {
              msg: 'Project name can\'t be empty',
            },
          },
        },

        owner_id: {
          type: Sequelize.INTEGER,
          validate: {
            notEmpty: {
              msg: 'It is necessary an owner',
            },
          },
        },

        description: {
          type: Sequelize.STRING,
        },

        color: {
          type: Sequelize.STRING,
        },
      },
      {
        sequelize,
        paranoid: true,
        deletedAt: 'deleted_at',
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'owner_id', as: 'owner' });
  }
}
