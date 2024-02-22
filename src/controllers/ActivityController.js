import Activity from '../models/Activity';

class ActivityController {
  async create(req, res) {
    try {
      console.log(req.body);
      console.log(req.user_id);
      const newActivity = await Activity.create({
        ...req.body,
        owner_id: req.user_id,
      });

      return res.json(newActivity);
    } catch (e) {
      const errArray = !e.errors ? ['Error during create a new activity'] : e.errors.map((err) => err.message);
      return res.status(400).json({
        errors: errArray,
      });
    }
  }

  async index(req, res) {
    try {
      const activities = await Activity.findAll({
        include: ['project', 'owner', 'type'],
      });
      return res.json(activities);
    } catch (e) {
      const errArray = !e.errors ? ['Error during get all activities'] : e.errors.map((err) => err.message);
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

      const activities = await Activity.findOne({
        where: { id },
        include: ['project', 'owner', 'type'],
      });

      if (!activities) {
        return res.status(400).json({
          errors: ['No activity found'],
        });
      }

      return res.json(activities);
    } catch (e) {
      const errArray = !e.errors ? ['Error during get all activities'] : e.errors.map((err) => err.message);
      return res.status(400).json({
        errors: errArray,
      });
    }
  }
}

export default new ActivityController();
