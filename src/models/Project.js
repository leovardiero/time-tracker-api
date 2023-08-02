import Sequelize, { Model } from 'sequelize';

export default class Project extends Model {
  static init(sequelize) {
    super.init(
      {
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
      },
      { sequelize },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'owner_id', as: 'owner' });
  }
}
