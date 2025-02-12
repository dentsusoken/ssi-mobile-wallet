import styled from 'styled-components/native';

import {alerts} from '../../../colors';
import {SSIFlexDirectionRowViewStyled, SSIRoundedContainerStyled} from '../../containers';
import {SSITextH4DarkStyled} from '../../fonts';

export const SSIToastContainerStyled = styled(SSIRoundedContainerStyled)`
  width: 96.8%;
  background-color: ${alerts.secondaryLight};
  border-radius: 8px;
  justify-content: center;
  padding: 18px 18px 15px 18px;
`;

export const SSIToastBadgeContainerStyled = styled.View`
  margin-right: 10px;
  justify-content: center;
`;

export const SSIToastTitleContainerStyled = styled(SSIFlexDirectionRowViewStyled)`
  margin-bottom: 12px;
  width: 100%;
`;

export const SSIToastMessageCaptionStyled = styled(SSITextH4DarkStyled)`
  width: 100%;
`;
