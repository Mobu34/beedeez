import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faBicycle,
  faBolt,
  faGear,
  faSquareParking,
} from '@fortawesome/free-solid-svg-icons';

const config = library.add(faSquareParking, faBicycle, faBolt, faGear, faBars);

export default config;
