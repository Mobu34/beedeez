import { BikeType } from '@/enums/bikeType.enum';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const skipValue = (value: number): number => {
  return value * 10;
};

export const bikeTypeFilter = (bikeType: BikeType) => {
  switch (bikeType) {
    case BikeType.Mechanical:
      return {
        'num_bikes_available_types.mechanical': { $gt: 0 },
      };
    case BikeType.Ebike:
      return {
        'num_bikes_available_types.ebike': { $gt: 0 },
      };
  }
};
