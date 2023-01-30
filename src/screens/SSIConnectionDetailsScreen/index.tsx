import { IConnection } from '@sphereon/ssi-sdk-data-store-common'
import React, { PureComponent } from 'react'
import { NativeStackScreenProps } from 'react-native-screens/native-stack'
import { connect } from 'react-redux'

import { ConnectionStatusEnum, MainRoutesEnum, ScreenRoutesEnum, StackParamList } from '../../@types'
import { IAuthenticatedEntity } from '../../@types/store/authenticate.types'
import SSIPrimaryButton from '../../components/buttons/SSIPrimaryButton'
import SSIConnectionDetailsView from '../../components/views/SSIConnectionDetailsView'
import { translate } from '../../localization/Localization'
import { RootState } from '../../store'
import { authenticateConnectionEntity, disconnectConnectionEntity } from '../../store/actions/authentication.actions'
import {
  SSIButtonBottomContainerStyled as ButtonContainer,
  SSIBasicHorizontalCenterContainerStyled as Container
} from '../../styles/components'
import { showToast, ToastTypeEnum } from '../../utils/ToastUtils'

const format = require('string-format')

type Props = NativeStackScreenProps<StackParamList, ScreenRoutesEnum.CONNECTION_DETAILS>

interface IScreenProps extends Props {
  authenticationEntities: Array<IAuthenticatedEntity>
  authenticateConnectionEntity: (entityId: string, connection: IConnection) => Promise<void>
  disconnectConnectionEntity: (entityId: string, connection: IConnection) => Promise<void>
}

export class SSIConnectionDetailsScreen extends PureComponent<IScreenProps> {
  onDisconnectConfirm = async (): Promise<void> => {
    this.props
      // TODO fix non null assertion
      .disconnectConnectionEntity(this.props.route.params.entityId!, this.props.route.params.connection)
      .then(() => {
        this.props.navigation.navigate(MainRoutesEnum.HOME, {})
        showToast(
          ToastTypeEnum.TOAST_SUCCESS,
          format(translate('disconnect_provider_success_message'), this.props.route.params.entityName)
        )
      })
      .catch((error) => {
        if (!/User cancelled flow/.test(error)) {
          showToast(ToastTypeEnum.TOAST_ERROR, error.message)
        }
      })
  }

  onDisconnect = async (): Promise<void> => {
    this.props.navigation.navigate(MainRoutesEnum.ALERT_MODAL, {
      message: format(translate('disconnect_provider_confirm_message'), this.props.route.params.entityName),
      buttons: [
        {
          caption: translate('action_confirm_label'),
          onPress: this.onDisconnectConfirm
        }
      ]
    })
  }

  onConnectConfirm = async (): Promise<void> => {
    this.props
      // TODO fix non null assertion
      .authenticateConnectionEntity(this.props.route.params.entityId!, this.props.route.params.connection)
      .then(() => {
        this.props.navigation.navigate(MainRoutesEnum.HOME, {})
        showToast(
          ToastTypeEnum.TOAST_SUCCESS,
          format(translate('connect_provider_success_message'), this.props.route.params.entityName)
        )
      })
      .catch((error) => {
        // TODO refactor error type behaviour
        if (!/User cancelled flow/.test(error) && !/Pex verification manual stop/.test(error)) {
          showToast(ToastTypeEnum.TOAST_ERROR, error.message)
        }
      })
  }

  onConnect = async (): Promise<void> => {
    this.props.navigation.navigate(MainRoutesEnum.ALERT_MODAL, {
      message: format(translate('connect_provider_confirm_message'), this.props.route.params.entityName),
      buttons: [
        {
          caption: translate('action_confirm_label'),
          onPress: this.onConnectConfirm
        }
      ]
    })
  }

  render() {
    const connectionStatus = this.props.authenticationEntities.find(
      (entity: IAuthenticatedEntity) => entity.entityId === this.props.route.params.entityId
    )
      ? ConnectionStatusEnum.CONNECTED
      : ConnectionStatusEnum.DISCONNECTED

    return (
      <Container>
        <SSIConnectionDetailsView
          entityConnection={{
            ...this.props.route.params,
            connectionStatus
          }}
        />
        <ButtonContainer>
          {connectionStatus === ConnectionStatusEnum.DISCONNECTED ? (
            <SSIPrimaryButton
              title={translate('connection_details_action_connect')}
              onPress={this.onConnect}
              // TODO move styling to styled components (currently there is an issue where this styling prop is not being set correctly)
              style={{ height: 42, width: 300 }}
            />
          ) : (
            <SSIPrimaryButton
              title={translate('connection_details_action_disconnect')}
              onPress={this.onDisconnect}
              // TODO move styling to styled components (currently there is an issue where this styling prop is not being set correctly)
              style={{ height: 42, width: 300 }}
            />
          )}
        </ButtonContainer>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    authenticateConnectionEntity: async (entityId: string, connection: IConnection) =>
      dispatch(authenticateConnectionEntity(entityId, connection)),
    disconnectConnectionEntity: async (entityId: string, connection: IConnection) =>
      dispatch(disconnectConnectionEntity(entityId, connection))
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    authenticationEntities: state.authentication.entities
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SSIConnectionDetailsScreen)
