import User from '../models/User';

class UserController {
  // Create
  async create(req, res) {
    try {
      console.log(req.body);
      const newUser = await User.create(req.body);
      console.log(newUser);
      const { user_id, email, name } = newUser;
      return res.json({ user_id, email, name });
    } catch (e) {
      return res.status(400).json({
        errors: 'Error!',
        // errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Index
  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'name', 'email'] });
      return res.json(users);
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  // Show
  async show(req, res) {
    try {
      // const user = await User.findByPk(req.params.id);
      const user = await User.findOne({
        where: { user_id: req.params.id },
        include: 'projects',
      });
      const { user_id, name, email } = user;

      console.log(user.projects[1].dataValues);

      return res.json({ user_id, name, email });
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
