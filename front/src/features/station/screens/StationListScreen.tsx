import { FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Input,
  Spacing,
  Text,
  Wrapper,
} from '../../../components';
import { StationCard } from '../components';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getStations, getStationsBySearch } from '../stationThunk';
import { setPagination } from '../stationSlice';
// import { Screens } from '../../../navigators/screens';
// import { useNavigation } from '@react-navigation/core';

const StationListScreen = () => {
  const { stations, pagination } = useAppSelector(
    state => state.stationReducer,
  );

  console.log('length! = ', stations.length);
  // const { _id } = useAppSelector((state) => state.userReducer);
  const [search, setSearch] = useState<string>('');

  // const navigation = useNavigation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    // if (!_id) {
    //   navigation.navigate(Screens.Login);
    // }
    if (pagination > 0 || !stations.length) {
      console.log('useEFFECT');
      dispatch(getStations(search));
    }
  }, [pagination]);

  return (
    <Container>
      <Wrapper justifyContent="center" alignItems="center">
        <Text.Title>Liste des stations de Velib :</Text.Title>
        <Spacing vertical={12} />
        <Input
          label="Recherchez une station"
          placeholder="Nom de la station"
          value={search}
          onChange={text => {
            dispatch(setPagination(0));
            setSearch(text);
            dispatch(getStationsBySearch(text));
          }}
        />
        <FlatList
          data={stations}
          keyExtractor={({ _id }) => _id}
          renderItem={({ item }) => <StationCard item={item} />}
          ItemSeparatorComponent={() => <Spacing vertical={4} />}
          ListFooterComponent={() => (
            <Button onPress={() => dispatch(setPagination(pagination + 1))}>
              Charger plus...
            </Button>
          )}
        />
      </Wrapper>
    </Container>
  );
};

export default StationListScreen;
