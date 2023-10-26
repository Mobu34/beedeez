import { View } from 'react-native';
import { FC, useState } from 'react';
import { styled } from 'styled-components/native';
import { IStationCardProps, IStyledPressable } from './stationCard.d';
import { Icon, Spacing, Text } from '../../../../components';
import { IconEnum } from '../../../../components/icon/icon.enum';
import { getPlurialSentence } from '../../utils';
import { Color } from '../../../../enums';

const StationCard: FC<IStationCardProps> = ({ item }) => {
  const {
    name,
    numBikesAvailable,
    numDocksAvailable,
    num_bikes_available_types,
  } = item;
  const [hoverColor, setHoverColor] = useState('black');

  return (
    <StyledView
      borderColor={hoverColor}
      onHoverIn={() => setHoverColor(Color.PRIMARY)}
      onHoverOut={() => setHoverColor('black')}>
      <Text.Regular textAlign="center">
        Station : <Text.Bold>{name}</Text.Bold>
      </Text.Regular>
      <Spacing vertical={8} />
      <View style={{ flexDirection: 'row' }}>
        <StyledViewAvailability>
          <Icon icon={IconEnum.Bicycle} size="2x" />
          <Spacing vertical={8} />
          <Text.Regular textAlign="center">
            {getPlurialSentence(numBikesAvailable, 'vélo disponible')}
          </Text.Regular>
          <Spacing vertical={4} />
          <View style={{ flexDirection: 'row' }}>
            <Text.Regular>{num_bikes_available_types[1].ebike}</Text.Regular>
            <Spacing horizontal={1} />
            <Icon icon={IconEnum.Bolt} color="#f0c905" />
            <Spacing horizontal={8} />
            <Text.Regular>
              {num_bikes_available_types[0].mechanical}
            </Text.Regular>
            <Spacing horizontal={1} />
            <Icon icon={IconEnum.Gear} color="#616160" />
          </View>
        </StyledViewAvailability>
        <StyledViewAvailability>
          <Icon
            icon={IconEnum.SquareParking}
            size="2x"
            color={Color.TERTIARY}
          />
          <Spacing vertical={4} />
          <Text.Regular textAlign="center">
            {getPlurialSentence(numDocksAvailable, 'emplacement disponible')}
          </Text.Regular>
        </StyledViewAvailability>
      </View>
    </StyledView>
  );
};

export default StationCard;

const StyledView = styled.Pressable<IStyledPressable>`
  border-width: 1.5px;
  border-color: ${({ borderColor }) => borderColor};
  border-radius: 20px;
  padding: 20px;
  width: 400px;
  margin-horizontal: 4px;
  background-color: white;
`;

const StyledViewAvailability = styled.View`
  flex: 1;

  align-items: center;
  padding: 6px;
`;
