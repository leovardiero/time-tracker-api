import Sequelize, { Model } from 'sequelize';

export default class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },

        project_id: {
          type: Sequelize.INTEGER,
          validate: {
            notEmpty: {
              msg: 'It is necessary a project',
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

        type_id: {
          type: Sequelize.INTEGER,
        },

        description: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'Activity description must be unique',
          },
          validate: {
            notEmpty: {
              msg: 'Activity description can\'t be empty',
            },
          },
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
    this.belongsTo(models.Project, { foreignKey: 'project_id', as: 'project' });
    this.belongsTo(models.User, { foreignKey: 'owner_id', as: 'owner' });
    this.belongsTo(models.Type, { foreignKey: 'type_id', as: 'type' });
  }
}
