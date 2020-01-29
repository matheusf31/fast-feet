import * as Yup from 'yup';
import Courier from '../models/Courier';

class CourierController {
  async index(req, res) {
    const couriers = await await Courier.findAll();

    return res.json(couriers);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await Courier.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const recipients = await Courier.create(req.body);

    return res.json(recipients);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { email } = req.body;
    const user = await Courier.findByPk(req.params.courierId);

    if (!user) {
      return res.status(401).json({ error: 'User does not exist.' });
    }

    if (email && email !== user.email) {
      const userExists = await Courier.findOne({
        where: { email: req.body.email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    const recipient = await user.update(req.body);

    return res.json(recipient);
  }

  async delete(req, res) {
    const user = await Courier.findByPk(req.params.courierId);

    if (!user) {
      return res.status(401).json({ error: 'User does not exist.' });
    }

    await Courier.destroy({
      where: { id: req.params.courierId },
    });

    return res.json({ ok: true });
  }
}

export default new CourierController();
