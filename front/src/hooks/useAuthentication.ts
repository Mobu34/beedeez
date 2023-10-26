import { useEffect } from 'react';
import useAppSelector from './useAppSelector';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../navigators/screens';

const useAuthentication = () => {
  const { token } = useAppSelector(state => state.userReducer.authToken);

  const navigation = useNavigation();

  useEffect(() => {
    if (token) {
      navigation.navigate(Screens.Station as never);
    } else {
      navigation.navigate(Screens.Login as never);
    }
  }, [token]);
};

export default useAuthentication;
