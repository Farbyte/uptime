import { type Request, type Response } from 'express';
import pool from '../db/db';

export const addMonitor = async (req: Request, res: Response) => {
  const { name, url, method, heartbeat } = req.body;

  if (!name || !url || !heartbeat) {
    return res.status(400).json({ error: 'Invalid body' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO monitors (name, url, method, heartbeat) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, url, method, heartbeat]
    );
    res.json({ message: 'New monitor added', data: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to save new monitor', error: error.message });
  }
};

export const listMonitors = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM monitors');
    res.json({ message: 'Monitor list', results: result.rows });
  } catch (error : any) {
    res.status(500).json({ error: error.message });
  }
};

export const editMonitor = async (req: Request, res: Response) => {
  const { name } = req.params;
  const { url, method, heartbeat } = req.body;

  try {
    const result = await pool.query(
      'UPDATE monitors SET url = $1, method = $2, heartbeat = $3 WHERE name = $4 RETURNING *',
      [url, method, heartbeat, name]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json({ message: 'Monitor changes saved', data: result.rows[0] });
  } catch (error : any) {
    res.status(500).json({ error: error.message });
  }
};
