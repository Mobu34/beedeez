import {
  FlatList,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Icon,
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
        <Text.Bold fontSize={24}>Liste des stations de Velib :</Text.Bold>
        <Spacing vertical={12} />
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => onBikeTypePress('ebike')}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon icon={IconEnum.Bolt} color="#f0c905" />
            <Spacing horizontal={2} />
            <View
              style={{
                width: 20,
                height: 20,
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: bikeType === 'ebike' ? Color.PRIMARY : 'white',
              }}
            />
          </TouchableOpacity>
          <Spacing horizontal={10} />
          <TouchableOpacity
            onPress={() => onBikeTypePress('mechanical')}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon icon={IconEnum.Gear} color="#616160" />
            <Spacing horizontal={2} />
            <View
              style={{
                width: 20,
                height: 20,
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor:
                  bikeType === 'mechanical' ? Color.PRIMARY : 'white',
              }}
            />
          </TouchableOpacity>
        </View>
        <Spacing vertical={12} />
        <Input
          label="Recherchez une station"
          placeholder="Nom de la station"
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
          ListFooterComponent={() => (
            <>
              <Spacing vertical={12} />
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Button
                  onPress={() => {
                    dispatch(
                      getStations({ ...query, pagination: pagination + 1 }),
                    );
                    dispatch(setPagination(pagination + 1));
                  }}>
                  Charger plus...
                </Button>
              </View>
              <Spacing vertical={16} />
            </>
          )}
          numColumns={widthBreapoint ? 2 : 1}
        />
      </Wrapper>
    </Container>
  );
};

export default StationListScreen;
