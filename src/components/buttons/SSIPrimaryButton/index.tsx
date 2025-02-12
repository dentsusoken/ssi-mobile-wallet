import React, {FC} from 'react';
import {PressableProps, ViewStyle} from 'react-native';

import {
  SSITouchableOpacityButtonFlexRowStyled as Button,
  SSITextH2LightStyled as ButtonCaption,
  SSIRoundedCenteredLinearGradientStyled as LinearGradient,
} from '../../../styles/components';
import {OpacityStyleEnum} from '../../../types';

export interface Props extends PressableProps {
  title: string; // TODO rename to caption
  disabled?: boolean | undefined;
  onPress?: () => void;
  style?: ViewStyle;
}

const SSIPrimaryButton: FC<Props> = (props: Props): JSX.Element => {
  const {onPress, disabled, style, title} = props;

  return (
    <Button
      onPress={onPress}
      disabled={disabled}
      style={{
        ...(disabled && {opacity: OpacityStyleEnum.DISABLED}),
      }}>
      <LinearGradient style={{...style}}>
        <ButtonCaption>{title}</ButtonCaption>
      </LinearGradient>
    </Button>
  );
};

export default SSIPrimaryButton;
