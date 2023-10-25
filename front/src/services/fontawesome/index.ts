import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBicycle,
  faBolt,
  faGear,
  faSquareParking,
} from '@fortawesome/free-solid-svg-icons';

const config = library.add(faSquareParking, faBicycle, faBolt, faGear);

export default config;
