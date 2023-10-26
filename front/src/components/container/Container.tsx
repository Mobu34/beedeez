import { FlexStyle, View } from 'react-native';
import React, { FC, useState } from 'react';
import { styled } from 'styled-components/native';
import { IContainerProps } from './container.d';
import { useAppDispatch } from '../../hooks';
import { disconnectionAction } from '../../actions/disconnection';
import { IconEnum } from '../icon/icon.enum';
import { Icon } from '../icon';
import { Text } from '../text';
import { Color } from '../../enums';

const Container: FC<IContainerProps> = ({ children, ...styleProps }) => {
  const dispatch = useAppDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <StyledView {...styleProps}>
      <StyledViewHeader>
        <View
          style={{
            transform: [{ rotate: '-10deg' }],
          }}>
          <Text.Title fontSize={32} color={Color.TERTIARY}>
            Velib Rabbit
          </Text.Title>
        </View>
        <StyledPressable onHoverIn={() => setIsMenuOpen(true)}>
          <Icon icon={IconEnum.Bars} />
        </StyledPressable>
        {isMenuOpen && (
          <StyledPressableMenu
            onPress={() => dispatch(disconnectionAction())}
            onHoverOut={() => setIsMenuOpen(false)}>
            <Text.Regular color={Color.TERTIARY}>Se déconnecter</Text.Regular>
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
  height: 65px;
  justify-content: center;
  shadow-color: #000000;
  shadow-offset: {
    width: 0;
    height: 2px;
  }
  shadow-opacity: 0.25px;
  shadow-radius: 3.84px;
  margin-bottom: 20px;
  align-items: center;
`;

const StyledPressable = styled.Pressable`
  position: absolute;
  right: 40px;
`;

const StyledPressableMenu = styled.Pressable`
  position: absolute;
  right: 40px;
  top: 45px;
  padding-vertical: 6px;
  padding-horizontal: 12px;
  border-radius: 5px;
  background-color: #f2f2f2;
  shadow-color: #0966b9;
  shadow-offset: {
    width: 0;
    height: 2px;
  }
  shadow-opacity: 1px;
  shadow-radius: 3.84px;
`;
