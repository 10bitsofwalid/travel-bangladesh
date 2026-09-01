import { Router } from 'express';
import healthRoutes from './health.routes.js';

const router = Router();

// Health routes
router.use('/health', healthRoutes);

// Base v1 root info
router.get('/', (_req, res) => {
  res.json({
    name: 'ExploreBD API',
    version: 'v1',
    description: 'Map-centric tourism and heritage platform for Bangladesh',
    endpoints: {
      health: '/api/v1/health',
      geo: '/api/v1/geo',
      destinations: '/api/v1/destinations',
      heritage: '/api/v1/heritage',
      itineraries: '/api/v1/itineraries',
      auth: '/api/v1/auth',
    },
  });
});

export default router;
