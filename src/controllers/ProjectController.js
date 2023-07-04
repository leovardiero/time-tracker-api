import Project from '../models/Project';

class ProjectController {
  async create(req, res) {
    try {
      console.log(req);
      const newProject = await Project.create({
        name: req.body.name,
        owner_id: req.userId,
      });
      const { id, name, owner } = newProject;
      return res.json({ id, name, owner });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new ProjectController();
