import * as Yup from 'yup';

import Recipient from '../models/Recipient';
import File from '../models/File';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      dest_name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep_number: Yup.string()
        .required()
        .min(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipients = await Recipient.create(req.body);

    return res.json(recipients);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      dest_name: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      state: Yup.string(),
      city: Yup.string(),
      cep_number: Yup.string().min(8),
      signature: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await Recipient.findByPk(req.body.id);

    const checkSignature = await File.findOne({
      where: { id: req.body.signature },
    });

    if (!(await checkSignature)) {
      return res.status(400).json({ error: 'Signature not found' });
    }

    const recipient = await user.update(req.body);

    return res.json(recipient);
  }
}

export default new RecipientController();
