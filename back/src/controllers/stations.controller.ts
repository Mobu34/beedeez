import { NextFunction, Request, Response } from 'express';
import stationsService from '@services/stations.service';
import { Station } from '@/models/stations.model';

class StationsController {
  public stationsService = new stationsService();

  public getStations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filter = { name: new RegExp(req.query?.search as string, 'i') || '' };
      const skip = parseInt(req.query?.skip as string) || 0;
      const findAllStations: Station[] = await this.stationsService.findAllStations(filter, skip);

      res.status(200).json({ data: findAllStations, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default StationsController;
