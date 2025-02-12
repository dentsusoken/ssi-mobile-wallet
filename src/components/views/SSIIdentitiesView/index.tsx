import {IIdentity} from '@sphereon/ssi-sdk.data-store';
import React, {FC} from 'react';
import {ListRenderItemInfo, RefreshControl} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

import {OVERVIEW_INITIAL_NUMBER_TO_RENDER} from '../../../@config/constants';
import {backgrounds, borders} from '../../../styles/colors';
import {SSIIdentitiesViewContainerStyled as Container} from '../../../styles/components';
import SSIIdentityViewItem from '../SSIIdentityViewItem';

export interface IProps {
  identities: Array<IIdentity>;
}

const SSIIdentitiesView: FC<IProps> = (props: IProps): JSX.Element => {
  const {identities} = props;
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async (): Promise<void> => {
    setRefreshing(false);
  };

  const renderItem = (itemInfo: ListRenderItemInfo<IIdentity>): JSX.Element => (
    <SSIIdentityViewItem
      style={{
        backgroundColor: itemInfo.index % 2 === 0 ? backgrounds.secondaryDark : backgrounds.primaryDark,
        ...(itemInfo.index === identities.length - 1 && itemInfo.index % 2 === 0 && {borderBottomWidth: 1, borderBottomColor: borders.dark}),
      }}
      name={itemInfo.item.alias}
      roles={itemInfo.item.roles}
    />
  );

  return (
    <Container>
      <SwipeListView
        data={identities}
        keyExtractor={(itemInfo: IIdentity) => itemInfo.id}
        renderItem={renderItem}
        closeOnRowOpen
        closeOnRowBeginSwipe
        useFlatList
        initialNumToRender={OVERVIEW_INITIAL_NUMBER_TO_RENDER}
        removeClippedSubviews
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </Container>
  );
};

export default SSIIdentitiesView;
