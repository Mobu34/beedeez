import { FlatList, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Container,
  Input,
  Spacing,
  Text,
  Wrapper,
} from '../../../components';
import {
  useAppDispatch,
  useAppSelector,
  useAuthentication,
} from '../../../hooks';
import { getStations } from '../stationThunk';
import { setPagination } from '../stationSlice';
import { IconEnum } from '../../../components/icon/icon.enum';
import { Color } from '../../../enums';
import { StationCard } from '../components';
import { useNavigation } from '@react-navigation/native';
import { WheelAnimation } from '../../../animations';
import { styled } from 'styled-components/native';
import { StyledViewRow } from '../../../styles';
import { fr } from '../../../locales';

const StationListScreen = () => {
  const { stations, pagination } = useAppSelector(
    state => state.stationReducer,
  );

  const [search, setSearch] = useState<string>('');
  const [bikeType, setBikeType] = useState<string>('');

  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const { width } = useWindowDimensions();

  useAuthentication();

  const query = { pagination: 0, search, bikeType };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getStations(query));
    });
    return unsubscribe;
  }, []);

  const onBikeTypePress = (type: string) => {
    dispatch(setPagination(0));
    if (bikeType === type) {
      setBikeType('');
      dispatch(getStations({ ...query, pagination: 0, bikeType: '' }));
    } else {
      setBikeType(type);
      dispatch(getStations({ ...query, pagination: 0, bikeType: type }));
    }
  };

  const widthBreapoint = width > 850;

  return (
    <Container>
      <WheelAnimation />
      <Wrapper justifyContent="center" alignItems="center">
        <Text.Bold fontSize={24}>{fr.stationListScreen.listTitle}</Text.Bold>
        <Spacing vertical={12} />
        <StyledViewRow>
          <Checkbox
            onPress={() => onBikeTypePress('ebike')}
            icon={IconEnum.Bolt}
            iconColor={Color.Warning}
            color={bikeType === 'ebike' ? Color.Primary : Color.White}
          />
          <Spacing horizontal={10} />
          <Checkbox
            onPress={() => onBikeTypePress('mechanical')}
            icon={IconEnum.Gear}
            iconColor={Color.Grey}
            color={bikeType === 'mechanical' ? Color.Primary : Color.White}
          />
        </StyledViewRow>
        <Spacing vertical={12} />
        <Input
          label={fr.stationListScreen.searchLabel}
          placeholder={fr.stationListScreen.searchPlaceholder}
          value={search}
          onChange={text => {
            dispatch(setPagination(0));
            setSearch(text);
            dispatch(getStations({ ...query, pagination: 0, search: text }));
          }}
        />
        <Spacing vertical={12} />

        <FlatList
          data={stations}
          key={widthBreapoint ? '#' : '@'}
          keyExtractor={({ _id }) => `${widthBreapoint ? '#' : '@'}${_id}`}
          renderItem={({ item }) => <StationCard item={item} />}
          ItemSeparatorComponent={() => <Spacing vertical={4} />}
          ListFooterComponent={() => {
            return stations.length > 0 ? (
              <>
                <Spacing vertical={12} />
                <StyledViewButton>
                  <Button
                    onPress={() => {
                      dispatch(
                        getStations({ ...query, pagination: pagination + 1 }),
                      );
                      dispatch(setPagination(pagination + 1));
                    }}>
                    {fr.stationListScreen.loadMore}
                  </Button>
                </StyledViewButton>
                <Spacing vertical={16} />
              </>
            ) : (
              <></>
            );
          }}
          ListEmptyComponent={() => (
            <>
              <StyledImage
                source={{
                  uri: 'https://media.tenor.com/vFojGfJgDbgAAAAi/rabbit-bunny.gif',
                }}
              />
              <Text.Bold>{fr.stationListScreen.noMatch}</Text.Bold>
            </>
          )}
          numColumns={widthBreapoint ? 2 : 1}
        />
      </Wrapper>
    </Container>
  );
};

export default StationListScreen;

const StyledViewButton = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const StyledImage = styled.Image`
  width: 200px;
  height: 200px;
`;
