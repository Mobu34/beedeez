import { View } from 'react-native';
import { FC } from 'react';
import { styled } from 'styled-components/native';
import { IStationCardProps } from './stationCard.d';
import { Icon, Spacing, Text } from '../../../../components';
import { IconEnum } from '../../../../components/icon/icon.enum';

const StationCard: FC<IStationCardProps> = ({ item }) => {
  const {
    name,
    numBikesAvailable,
    numDocksAvailable,
    num_bikes_available_types,
  } = item;
  return (
    <StyledView>
      <Text.Regular textAlign="center">
        Station : <Text.Bold>{name}</Text.Bold>
      </Text.Regular>
      <Spacing vertical={8} />
      <View style={{ flexDirection: 'row' }}>
        <StyledViewAvailability>
          <Icon icon={IconEnum.Bicycle} size="2x" />
          <Spacing vertical={8} />
          <Text.Regular textAlign="center">
            {numBikesAvailable} vélo(s) disponible
          </Text.Regular>
          <Spacing vertical={4} />
          <View style={{ flexDirection: 'row' }}>
            <Text.Regular>{num_bikes_available_types[1].ebike}</Text.Regular>
            <Spacing horizontal={1} />
            <Icon icon={IconEnum.Bolt} />
            <Spacing horizontal={8} />
            <Text.Regular>
              {num_bikes_available_types[0].mechanical}
            </Text.Regular>
            <Spacing horizontal={1} />
            <Icon icon={IconEnum.Gear} />
          </View>
        </StyledViewAvailability>
        <StyledViewAvailability>
          <Icon icon={IconEnum.SquareParking} size="2x" />
          <Spacing vertical={4} />
          <Text.Regular textAlign="center">
            {numDocksAvailable} emplacement(s) disponible
          </Text.Regular>
        </StyledViewAvailability>
      </View>
    </StyledView>
  );
};

export default StationCard;

const StyledView = styled.View`
  border-width: 1px;
  border-radius: 20px;
  padding: 20px;
`;

const StyledViewAvailability = styled.View`
  flex: 1;

  align-items: center;
  padding: 6px;
`;
