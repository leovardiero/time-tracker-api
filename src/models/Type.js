import Sequelize, { Model } from 'sequelize';

export default class Type extends Model {
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
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Type name must contain between 3 and 255 characters',
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
  }

  // change here to actitivities
  // static associate(models) {
  //  this.hasMany(models.Project, { foreignKey: 'owner_id', as: 'projects' });
  // }
}
