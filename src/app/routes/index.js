import Express from 'express';
import render from '../utils/render';

const router = Express.Router();

router.get('/', (req, res) => {
  render(req, res, {});
});

router.get('/:slug', (req, res) => {
  render(req, res, {});
});

export default router;
