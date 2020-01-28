import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const recipients = await Recipient.create(req.body);

    return res.json(recipients);
  }
}

export default new RecipientController();
