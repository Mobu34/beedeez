import { FC, useState } from 'react';
import { styled } from 'styled-components/native';
import { IStationCardProps, IStyledPressable } from './stationCard.d';
import { Icon, Spacing, Text } from '../../../../components';
import { IconEnum } from '../../../../components/icon/icon.enum';
import { getPlurialSentence } from '../../utils';
import { Color } from '../../../../enums';
import { StyledViewRow } from '../../../../styles';
import { fr } from '../../../../locales';

const StationCard: FC<IStationCardProps> = ({ item }) => {
  const {
    name,
    numBikesAvailable,
    numDocksAvailable,
    num_bikes_available_types,
  } = item;
  const [hoverColor, setHoverColor] = useState(Color.Black);

  return (
    <StyledView
      borderColor={hoverColor}
      onHoverIn={() => setHoverColor(Color.Primary)}
      onHoverOut={() => setHoverColor(Color.Black)}>
      <Text.Regular textAlign="center">
        Station : <Text.Bold>{name}</Text.Bold>
      </Text.Regular>
      <Spacing vertical={8} />
      <StyledViewRow>
        <StyledViewAvailability>
          <Icon icon={IconEnum.Bicycle} size="2x" />
          <Spacing vertical={8} />
          <Text.Regular textAlign="center">
            {getPlurialSentence(
              numBikesAvailable,
              fr.stationListScreen.bikeAvailable,
            )}
          </Text.Regular>
          <Spacing vertical={4} />
          <StyledViewRow>
            <Text.Regular>{num_bikes_available_types[1].ebike}</Text.Regular>
            <Spacing horizontal={1} />
            <Icon icon={IconEnum.Bolt} color={Color.Warning} />
            <Spacing horizontal={8} />
            <Text.Regular>
              {num_bikes_available_types[0].mechanical}
            </Text.Regular>
            <Spacing horizontal={1} />
            <Icon icon={IconEnum.Gear} color={Color.Grey} />
          </StyledViewRow>
        </StyledViewAvailability>
        <StyledViewAvailability>
          <Icon
            icon={IconEnum.SquareParking}
            size="2x"
            color={Color.Secondary}
          />
          <Spacing vertical={4} />
          <Text.Regular textAlign="center">
            {getPlurialSentence(
              numDocksAvailable,
              fr.stationListScreen.dockAvailable,
            )}
          </Text.Regular>
        </StyledViewAvailability>
      </StyledViewRow>
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
  background-color: ${Color.White};
`;

const StyledViewAvailability = styled.View`
  flex: 1;
  align-items: center;
  padding: 6px;
`;
