import User from '../models/User';

function cleanProjects(projects) {
  return projects.map(({
    id, name, color, description,
  }) => ({
    id, name, color, description,
  }));
}

class UserController {
  // Create
  async create(req, res) {
    try {
      const newUser = await User.create(req.body);
      const { id, email, name } = newUser;
      return res.json({ id, email, name });
    } catch (e) {
      return res.status(400).json({
        errors: 'Error during create a new user!',
        // errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Index
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  // Show
  async show(req, res) {
    try {
      const { includeProjects } = req.params;

      const user = await User.findOne({
        where: { id: req.params.id },
        ...(includeProjects === 'true' && { include: 'projects' }),
      });

      console.log(user);

      const {
        id, name, email, projects,
      } = user;

      return res.json({
        id,
        name,
        email,
        ...(projects !== undefined && { projects: cleanProjects(projects) }),
      });
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  // Update
  async update(req, res) {
    try {
      // Verifying User
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({
          errors: ['User not found'],
        });
      }

      const newUser = await user.update(req.body);
      const { id, email, name } = newUser;

      return res.json({ id, email, name });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      // Verifying User
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({
          errors: ['User not found'],
        });
      }

      await user.destroy(req.body);
      return res.json(null);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
