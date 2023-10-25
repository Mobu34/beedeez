import { useDispatch } from 'react-redux';
import { TAppDispatch } from '../store';

const useAppDispatch: () => TAppDispatch = useDispatch;

export default useAppDispatch;
