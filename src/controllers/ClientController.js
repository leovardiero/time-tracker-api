import Client from '../models/Client';

class ClientController {
  // Create
  async create(req, res) {
    try {
      const newClient = await Client.create(req.body);
      const { id, name } = newClient;
      return res.json({ id, name });
    } catch (e) {
      const errArray = e.errors.length === 0 ? ['Error during create a new client'] : e.errors.map((err) => err.message);
      return res.status(400).json({
        errors: errArray,
      });
    }
  }

  // Index
  async index(req, res) {
    try {
      const clients = await Client.findAll({ attributes: ['id', 'name'] });
      return res.json(clients);
    } catch (e) {
      const errArray = e.errors.length === 0 ? ['Error during get all clients'] : e.errors.map((err) => err.message);
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

      const client = await Client.findOne({ where: { id } });

      if (!client) {
        return res.status(400).json({
          errors: ['No client found'],
        });
      }

      return res.json({ client });
    } catch (e) {
      if (!e.errors) {
        return res.status(400).json({
          errors: ['An error occured during get all clients'],
        });
      }
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
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

      const client = await Client.findByPk(searchId);

      if (!client) {
        return res.status(400).json({
          errors: ['Client not found'],
        });
      }

      const newUser = await client.update(req.body);
      const { id, email, name } = newUser;

      return res.json({ id, email, name });
    } catch (e) {
      if (!e.errors) {
        return res.status(400).json({
          errors: ['An error occured during get all clients'],
        });
      }
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      // Verifying User
      const searchId = req.body.id;

      if (!searchId) {
        return res.status(400).json({
          errors: ['ID field missing'],
        });
      }

      const client = await Client.findByPk(req.body.id);

      if (!client) {
        return res.status(400).json({
          errors: ['Client not found'],
        });
      }

      await client.destroy(req.body);
      return res.json({
        message: 'Client deleted succesfully',
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

export default new ClientController();
