import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    /**
     * Fazer as checagens com o Yup
     */

    const recipients = await Recipient.create(req.body);

    return res.json(recipients);
  }

  async update(req, res) {
    return res.json({ ok: true });
  }
}

export default new RecipientController();
