import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../models/User';
import Project from '../models/Project';
import Client from '../models/Client';
import Type from '../models/Type';

const models = [User, Project, Client, Type];
const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));

models.forEach((model) => model.associate && model.associate(connection.models));
