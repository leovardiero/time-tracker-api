import Project from '../models/Project';

class ProjectController {
  async create(req, res) {
    try {
      // console.log(req.params);
      const newProject = await Project.create({
        name: req.body.name,
        owner_id: req.user_id,
      });
      const { id, name, owner_id } = newProject;
      return res.json({ id, name, owner_id });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        error: 'Unexpected error found during creating a project',
      });
    }
  }
}

export default new ProjectController();
