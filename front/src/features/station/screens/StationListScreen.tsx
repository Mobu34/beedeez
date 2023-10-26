import {
  Animated,
  FlatList,
  TouchableOpacity,
  View,
  useWindowDimensions,
  // useWindowDimensions,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
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

const StationListScreen = () => {
  const { stations, pagination } = useAppSelector(
    state => state.stationReducer,
  );

  const [search, setSearch] = useState<string>('');
  const [bikeType, setBikeType] = useState<string>('');

  const { width } = useWindowDimensions();

  const wheelAnimationTop = useRef(new Animated.Value(-240)).current;
  // const [wheelAnimationLeft, setWheelAnimationLeft] = useState(0);
  const wheelAnimationLeft = useRef(new Animated.Value(0)).current;
  const wheelAnimationSpin = useRef(new Animated.Value(0)).current;

  // Animated.loop(

  const spin = () => {
    console.log('spin');
    wheelAnimationSpin.setValue(0);
    // Animated.sequence([
    // Animated.parallel([
    //   Animated.timing(wheelAnimationTop, {
    //     toValue: height / 2,
    //     useNativeDriver: true,
    //     duration: 2000,
    //   }),
    //   Animated.timing(wheelAnimationLeft, {
    //     toValue: width / 4,
    //     useNativeDriver: true,
    //     duration: 2000,
    //     delay: 1000,
    //   }),

    // ]).start(() => spin());
    Animated.timing(wheelAnimationSpin, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => spin());
  };

  useEffect(() => {
    spin();
  }, []);

  // const rotating = wheelAnimationSpin.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0deg', '360deg'],
  // });

  // ).start(({ finished }) => {
  //   console.log({ finished });
  //   // if (finished) {
  //   // const randomTop = Math.floor(Math.random() * 2);
  //   wheelAnimationTop.setValue(-120);
  //   // setWheelAnimationLeft(Math.floor(Math.random() * width));
  //   const rand = Math.floor(Math.random() * width);
  //   console.log(rand);
  //   wheelAnimationLeft.setValue(rand);
  //   // }
  // });

  console.log(wheelAnimationLeft);

  console.log(wheelAnimationTop);

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

  const widthBreapoint = width > 850;

  return (
    <Container>
      <Wrapper justifyContent="center" alignItems="center">
        {/* <Animated.View
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            borderWidth: 6,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: Color.TERTIARY,
            position: 'absolute',
            top: 50,
            left: 50,
          }}>
          <Animated.View
            style={{
              borderWidth: 1,
              width: '100%',
              transform: [{ rotate: rotating }],
            }}
          />
          <View
            style={{
              borderWidth: 1,
              width: '100%',
              transform: [{ rotate: '90deg' }],
              position: 'absolute',
            }}
          />
          <View
            style={{
              borderWidth: 1,
              width: '100%',
              transform: [{ rotate: '45deg' }],
              position: 'absolute',
            }}
          />
          <View
            style={{
              borderWidth: 1,
              width: '100%',
              transform: [{ rotate: '135deg' }],
              position: 'absolute',
            }}
          />
        </Animated.View> */}
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
