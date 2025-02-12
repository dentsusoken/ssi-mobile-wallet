import React, {FC} from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';

import {
  SSICredentialSelectViewItemCheckboxContainerStyled as CheckboxContainer,
  SSIFlexDirectionRowViewStyled as Container,
  SSICredentialSelectViewItemContentContainerStyled as ContentContainer,
  SSICredentialSelectViewItemContentTextContainerStyled as ContentTextContainer,
  SSITextH3LightStyled as CredentialTypeCaption,
  SSITextH4LightStyled as IssuerCaption,
  SSICredentialSelectViewItemLogoCheckboxContainerStyled as LogoCheckboxContainer,
  SSICredentialSelectViewItemLogoContainerStyled as LogoContainer,
  SSICredentialSelectViewItemLogoOuterContainerStyled as LogoOuterContainer,
} from '../../../styles/components';
import SSICredentialLogo from '../../assets/logos/SSICredentialLogo';
import SSICheckbox from '../../fields/SSICheckbox';

export interface Props {
  title: string;
  issuer?: string;
  isSelected: boolean;
  image?: string; // TODO WAL-302 Support passing in storage location
  style?: ViewStyle;
  onPress: () => Promise<void>;
}

const SSICredentialSelectViewItem: FC<Props> = (props: Props): JSX.Element => {
  const {image, style, title, issuer, onPress} = props;

  return (
    <Container>
      <LogoContainer>
        <LogoOuterContainer>
          <LogoCheckboxContainer>
            <TouchableOpacity onPress={onPress}>
              <SSICredentialLogo image={image} />
            </TouchableOpacity>
            <CheckboxContainer>
              <SSICheckbox onValueChange={onPress} isChecked={props.isSelected} backgroundColor={style?.backgroundColor} />
            </CheckboxContainer>
          </LogoCheckboxContainer>
        </LogoOuterContainer>
      </LogoContainer>
      <ContentContainer>
        <ContentTextContainer>
          <CredentialTypeCaption>{title}</CredentialTypeCaption>
          {issuer && <IssuerCaption>{issuer}</IssuerCaption>}
        </ContentTextContainer>
      </ContentContainer>
    </Container>
  );
};

export default SSICredentialSelectViewItem;
