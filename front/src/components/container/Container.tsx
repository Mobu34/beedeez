import { FlexStyle } from 'react-native';
import React, { FC, useState } from 'react';
import { styled } from 'styled-components/native';
import { IContainerProps } from './container.d';
import { useAppDispatch } from '../../hooks';
import { disconnectionAction } from '../../actions/disconnection';
import { IconEnum } from '../icon/icon.enum';
import { Icon } from '../icon';
import { Text } from '../text';

const Container: FC<IContainerProps> = ({ children, ...styleProps }) => {
  const dispatch = useAppDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <StyledView {...styleProps}>
      <StyledViewHeader>
        <StyledPressable onHoverIn={() => setIsMenuOpen(true)}>
          <Icon icon={IconEnum.Bars} />
        </StyledPressable>
        {isMenuOpen && (
          <StyledPressableMenu
            onPress={() => dispatch(disconnectionAction())}
            onHoverOut={() => setIsMenuOpen(false)}>
            <Text.Regular>Se déconnecter</Text.Regular>
          </StyledPressableMenu>
        )}
      </StyledViewHeader>
      {children}
    </StyledView>
  );
};

export default Container;

const StyledView = styled.ScrollView<FlexStyle>`
  flex: 1;
`;

const StyledViewHeader = styled.View`
  height: 60px;
  justify-content: center;
  shadow-color: #000000;
  shadow-offset: {
    width: 0;
    height: 2px;
  }
  shadow-opacity: 0.25px;
  shadow-radius: 3.84px;
  margin-bottom: 20px;
`;

const StyledPressable = styled.Pressable`
  position: absolute;
  right: 40px;
`;

const StyledPressableMenu = styled.Pressable`
  position: absolute;
  right: 40px;
  top: 40px;
  border-width: 1px;
  padding: 5px;
  border-radius: 5px;
  background-color: white;
`;
