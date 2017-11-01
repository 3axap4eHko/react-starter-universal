import Express from 'express';
import render from '../utils/render';

const router = Express.Router();

router.get(['/', '/:slug'], (req, res) => render(req, res, {}));

export default router;
