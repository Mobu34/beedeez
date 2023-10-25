import { FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { Container, Spacing, Text } from '../../../components';
import { StationCard } from '../components';
import { useAppSelector } from '../../../hooks';
// import { Screens } from '../../../navigators/screens';
// import { useNavigation } from '@react-navigation/core';

const StationListScreen = () => {
  const { stations } = useAppSelector(state => state.stationReducer);
  // const { _id } = useAppSelector((state) => state.userReducer);

  // const navigation = useNavigation();

  useEffect(() => {
    // if (!_id) {
    //   navigation.navigate(Screens.Login);
    // }
  }, []);

  return (
    <Container alignItems="center">
      <Text.Title>Liste des stations de Velib :</Text.Title>
      <Spacing vertical={12} />
      <FlatList
        data={stations}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item }) => <StationCard item={item} />}
        ItemSeparatorComponent={() => <Spacing vertical={4} />}
      />
    </Container>
  );
};

export default StationListScreen;
