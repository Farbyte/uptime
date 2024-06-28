import express from 'express';
import { addMonitor, listMonitors, editMonitor } from '../controllers/monitor_controller';

const router = express.Router();

router.post('/monitor', addMonitor);
router.get('/monitor', listMonitors);
router.put('/monitor/:name', editMonitor);

export default router;
