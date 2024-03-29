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

        name: {
          type: Sequelize.STRING,
          unique: {
            msg: 'Name must be unique',
          },
          validate: {
            len: {
              args: [3, 255],
              msg: 'Name must contain between 3 and 255 characters',
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
    this.hasMany(models.Project, { foreignKey: 'client_id', as: 'projects' });
  }
}
