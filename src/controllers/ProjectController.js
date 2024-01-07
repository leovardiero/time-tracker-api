import _ from 'underscore';
import Project from '../models/Project';

function cleanProject(project) {
  project.dataValues.owner = _.pick(project.dataValues.owner, ['id', 'name', 'email']);
  project.dataValues.client = _.pick(project.dataValues.client, ['id', 'name']);
  return project;
}

class ProjectController {
  async create(req, res) {
    try {
      console.log(req.body);
      const newProject = await Project.create({
        ...req.body,
        owner_id: req.user_id,
      });
      const {
        id, name, owner_id, description, color,
      } = newProject;
      return res.json({
        id, name, owner_id, description, color,
      });
    } catch (e) {
      const errArray = !e.errors ? ['Error during create a new project'] : e.errors.map((err) => err.message);
      return res.status(400).json({
        error: errArray,
      });
    }
  }

  async index(req, res) {
    try {
      const projects = await Project.findAll();
      return res.json(projects);
    } catch (e) {
      const errArray = !e.errors ? ['Error during get all clients'] : e.errors.map((err) => err.message);
      return res.status(400).json({
        errors: errArray,
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      // No ID
      if (!id) {
        return res.status(400).json({
          errors: ['ID field missing'],
        });
      }

      const project = await Project.findOne({
        where: { id },
        include: ['client', 'owner'],
      });

      if (!project) {
        return res.status(400).json({
          errors: ['No project found'],
        });
      }

      const cleanedProject = cleanProject(project);
      console.log(cleanedProject);

      return res.json(cleanedProject);
    } catch (e) {
      console.log(e.message);
      const errArray = !e.errors ? ['Error during get all clients'] : e.errors.map((err) => err.message);
      return res.status(400).json({
        errors: errArray,
      });
    }
  }

  async update(req, res) {
    try {
      // Verifying User
      const searchId = req.body.id;

      if (!searchId) {
        return res.status(400).json({
          errors: ['ID field missing'],
        });
      }

      const project = await Project.findByPk(searchId);

      if (!project) {
        return res.status(400).json({
          errors: ['Project not found'],
        });
      }

      const newProject = await project.update(req.body);

      return res.json(newProject);
    } catch (e) {
      const errArray = !e.errors ? ['Error during update the project'] : e.errors.map((err) => err.message);
      return res.status(400).json({
        error: errArray,
      });
    }
  }

  async delete(req, res) {
    try {
      const searchId = req.params.id;

      if (!searchId) {
        return res.status(400).json({
          errors: ['ID field missing'],
        });
      }

      const project = await Project.findByPk(searchId);

      if (!project) {
        return res.status(400).json({
          errors: ['Project not found'],
        });
      }

      await project.destroy(req.body);
      return res.json({
        message: 'Project deleted succesfully',
      });
    } catch (e) {
      if (!e.errors) {
        return res.status(400).json({
          errors: ['An error occured during deleted the clients'],
        });
      }
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new ProjectController();
