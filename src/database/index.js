import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../models/User';
import Project from '../models/Project';
import Client from '../models/Client';

const models = [User, Project, Client];
const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));

models.forEach((model) => model.associate && model.associate(connection.models));
