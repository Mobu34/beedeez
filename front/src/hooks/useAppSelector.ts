import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { TRootState } from '../store';

const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

export default useAppSelector;
