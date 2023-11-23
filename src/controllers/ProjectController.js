import Project from '../models/Project';

class ProjectController {
  async create(req, res) {
    try {
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
      return res.status(400).json({
        error: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new ProjectController();
