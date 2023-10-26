import React, { FC } from 'react';
import { Text } from '../text';
import { Color } from '../../enums';
import { styled } from 'styled-components/native';
import { ITitleProps } from './title.d';
import { fr } from '../../locales';

const Title: FC<ITitleProps> = ({ fontSize }) => {
  return (
    <StyledView>
      <Text.Title fontSize={fontSize} color={Color.Secondary}>
        {fr.common.title}
      </Text.Title>
    </StyledView>
  );
};

export default Title;

const StyledView = styled.View`
  transform: rotate(-10deg);
`;
