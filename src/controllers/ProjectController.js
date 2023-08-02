import Project from '../models/Project';

class ProjectController {
  async create(req, res) {
    try {
      console.log(req);
      const newProject = await Project.create({
        project_name: req.body.project_name,
        owner_id: req.userId,
      });
      const { project_id, project_name, owner_id } = newProject;
      return res.json({ project_id, project_name, owner_id });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new ProjectController();
