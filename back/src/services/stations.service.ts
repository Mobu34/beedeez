import { skipValue } from '@/utils/util';
import stationsModel, { Station } from '@models/stations.model';

class StationsService {
  public async findAllStations(filter: any, skip: number): Promise<Station[]> {
    const stations: Station[] = await stationsModel.find(filter, null, { limit: 10, skip: skipValue(skip) });

    return stations;
  }
}

export default StationsService;
