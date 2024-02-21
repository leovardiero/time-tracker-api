import Type from '../models/Type';

class TypeController {
  // Create
  async create(req, res) {
    try {
      const newType = await Type.create(req.body);
      const { id, name } = newType;
      return res.json({ id, name });
    } catch (e) {
      const errArray = !e.errors ? ['Error during create a new type'] : e.errors.map((err) => err.message);
      return res.status(400).json({
        errors: errArray,
      });
    }
  }

  // Index
  async index(req, res) {
    try {
      const types = await Type.findAll();
      return res.json(types);
    } catch (e) {
      const errArray = !e.errors ? ['Error during get all types'] : e.errors.map((err) => err.message);
      return res.status(400).json({
        errors: errArray,
      });
    }
  }

  // Show
  async show(req, res) {
    try {
      const { id } = req.params;

      // No ID
      if (!id) {
        return res.status(400).json({
          errors: ['ID field missing'],
        });
      }

      const type = await Type.findOne({ where: { id } });

      if (!type) {
        return res.status(400).json({
          errors: ['No type found'],
        });
      }

      return res.json(type);
    } catch (e) {
      const errArray = !e.errors ? [`Error during get type id ${req.params.id}`] : e.errors.map((err) => err.message);
      return res.status(400).json({
        errors: errArray,
      });
    }
  }

  // Update
  async update(req, res) {
    try {
      // Verifying User
      const searchId = req.body.id;

      if (!searchId) {
        return res.status(400).json({
          errors: ['ID field missing'],
        });
      }

      const type = await Type.findByPk(searchId);

      if (!type) {
        return res.status(400).json({
          errors: ['Type not found'],
        });
      }

      const newUser = await type.update(req.body);
      const { id, name } = newUser;

      return res.json({ id, name });
    } catch (e) {
      const errArray = !e.errors ? [`Error during update type id ${req.body.id}`] : e.errors.map((err) => err.message);
      return res.status(400).json({
        errors: errArray,
      });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      // Verifying User
      const searchId = req.params.id;

      if (!searchId) {
        return res.status(400).json({
          errors: ['ID field missing'],
        });
      }

      const type = await Type.findByPk(searchId);

      if (!type) {
        return res.status(400).json({
          errors: ['Type not found'],
        });
      }

      await type.destroy(req.body);
      return res.json({
        message: 'Type deleted succesfully',
      });
    } catch (e) {
      const errArray = !e.errors ? [`Error during deleting type id ${req.params.id}`] : e.errors.map((err) => err.message);
      return res.status(400).json({
        errors: errArray,
      });
    }
  }
}

export default new TypeController();
