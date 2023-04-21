import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React, {FC, useEffect} from 'react';
import {NativeEventEmitter, NativeModules, TouchableWithoutFeedback, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  SSIHeaderBarBackIconStyled as BackIcon,
  SSIHeaderBarBackIconContainerStyled as BackIconContainer,
  SSIHeaderBarContainerStyled as Container,
  SSIHeaderBarHeaderCaptionStyled as HeaderCaption,
  SSIHeaderBarHeaderSubCaptionStyled as HeaderSubCaption,
  SSIFlexDirectionColumnViewStyled as LeftColumn,
  SSIHeaderBarMoreIconStyled as MoreIcon,
  SSIHeaderBarProfileIconContainerStyled as ProfileIconContainer,
  SSIRightColumnRightAlignedContainerStyled as RightColumn,
  SSIFlexDirectionRowViewStyled as Row,
} from '../../../styles/components';
import {ButtonIconsEnum, HeaderEventEnum, IMoreMenuButton} from '../../../types';
import SSIProfileIcon from '../../assets/icons/SSIProfileIcon';
import SSIDropDownList from '../../dropDownLists/SSIDropDownList';

interface Props extends NativeStackHeaderProps {
  headerSubTitle?: string;
  showBorder?: boolean;
  showBackButton?: boolean;
  moreActions?: Array<IMoreMenuButton>;
  showProfileIcon?: boolean;
}

const {MyModule} = NativeModules; // FIXME WAL-513 - on iOS MyModule is not defined, I also don't see a .h / .m file with MyModule in it. The functionality related to closing the ... menu is not working on iOS atm
export const headerEmitter = MyModule ? new NativeEventEmitter(MyModule) : undefined;

// TODO fix that there is a slight flash of elements moving when navigating
const SSIHeaderBar: FC<Props> = (props: Props): JSX.Element => {
  const {showBorder = false, showBackButton = true, showProfileIcon = true, moreActions = []} = props;
  const [showMoreMenu, setShowMoreMenu] = React.useState(false);

  useEffect(() => {
    if(headerEmitter) {
      const subscription = headerEmitter.addListener(HeaderEventEnum.ON_MORE_MENU_CLOSE, () => {
        setShowMoreMenu(false);
      });

      return () => {
        subscription.remove();
      };
    }
  }, []);

  const onBack = async (): Promise<void> => {
    props.navigation.goBack();
  };

  const onProfile = async (): Promise<void> => {
    props.navigation.navigate('Veramo', {});
  };

  const onMore = async (): Promise<void> => {
    setShowMoreMenu(!showMoreMenu);
  };

  const onPress = async (): Promise<void> => {
    setShowMoreMenu(false);
  };

  return (
    <TouchableWithoutFeedback onPress={onPress} accessible={false}>
      <Container style={{marginTop: useSafeAreaInsets().top}} showBorder={showBorder}>
        <Row>
          <LeftColumn>
            {showBackButton && (
              <BackIconContainer>
                <BackIcon icon={ButtonIconsEnum.BACK} onPress={onBack} />
              </BackIconContainer>
            )}
            <HeaderCaption style={{marginTop: showBackButton ? 21.5 : 15, marginBottom: props.headerSubTitle ? 0 : 14}}>
              {props.options.headerTitle}
            </HeaderCaption>
            {props.headerSubTitle && <HeaderSubCaption>{props.headerSubTitle}</HeaderSubCaption>}
          </LeftColumn>
          <RightColumn>
            {showProfileIcon && (
              <ProfileIconContainer onLongPress={onProfile}>
                <SSIProfileIcon />
              </ProfileIconContainer>
            )}
            {moreActions.length > 0 && <MoreIcon icon={ButtonIconsEnum.MORE} onPress={onMore} />}
            {showMoreMenu && (
              <View style={{position: 'absolute', width: 250, right: 10, top: 92}}>
                <SSIDropDownList buttons={moreActions} />
              </View>
            )}
          </RightColumn>
        </Row>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default SSIHeaderBar;
