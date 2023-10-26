import { FlatList, TouchableOpacity, View } from 'react-native';
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
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getStations } from '../stationThunk';
import { setPagination } from '../stationSlice';
import { IconEnum } from '../../../components/icon/icon.enum';
import { Color } from '../../../enums';
import { StationCard } from '../components';
import useAuthentication from '../../../hooks/useAuthentication';
import { useNavigation } from '@react-navigation/native';

const StationListScreen = () => {
  const { stations, pagination } = useAppSelector(
    state => state.stationReducer,
  );

  const [search, setSearch] = useState<string>('');
  const [bikeType, setBikeType] = useState<string>('');

  const navigation = useNavigation();

  const dispatch = useAppDispatch();

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

  return (
    <Container>
      <Wrapper justifyContent="center" alignItems="center">
        <Text.Title>Liste des stations de Velib :</Text.Title>
        <Spacing vertical={12} />
        <TouchableOpacity onPress={() => onBikeTypePress('ebike')}>
          <Icon icon={IconEnum.Bolt} />
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
        <TouchableOpacity onPress={() => onBikeTypePress('mechanical')}>
          <Icon icon={IconEnum.Gear} />
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
        <FlatList
          data={stations}
          keyExtractor={({ _id }) => _id}
          renderItem={({ item }) => <StationCard item={item} />}
          ItemSeparatorComponent={() => <Spacing vertical={4} />}
          ListFooterComponent={() => (
            <Button
              onPress={() => {
                console.log('PRESSED');
                dispatch(getStations({ ...query, pagination: pagination + 1 }));
                dispatch(setPagination(pagination + 1));
              }}>
              Charger plus...
            </Button>
          )}
        />
      </Wrapper>
    </Container>
  );
};

export default StationListScreen;
