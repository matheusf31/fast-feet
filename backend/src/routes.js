import { Router } from 'express';

import User from './app/models/User';

const routes = new Router();

routes.get('/users', async (req, res) => {
  const user = await User.findByPk(1);

  return res.json(user);
});

export default routes;
