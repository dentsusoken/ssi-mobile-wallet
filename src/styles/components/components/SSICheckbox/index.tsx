import styled from 'styled-components/native';

import {SSITextH4LightStyled} from '../../fonts';

export const SSICheckboxUnselectedContainerStyled = styled.View`
  width: 15px;
  aspect-ratio: 1;
  border-radius: 7.5px;
  border-width: 1px;
  align-items: center;
  justify-content: center;
`;

export const SSICheckboxSelectedContainerStyled = styled.View`
  width: 11.25px;
  aspect-ratio: 1;
  border-radius: 5.63px;
  align-items: center;
  justify-content: center;
`;

// TODO this might be a solution for more text wrapping issues
export const SSICheckboxLabelContainerStyled = styled(SSITextH4LightStyled)`
  flex: 1;
  flex-wrap: wrap;
`;
