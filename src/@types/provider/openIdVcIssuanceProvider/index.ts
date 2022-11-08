import { IssuanceInitiationWithBaseUrl } from '@sphereon/oid4vci-client'
import { EndpointMetadata } from '@sphereon/oid4vci-client/dist/main/lib/types'
import {
  CredentialFormatSupport,
  CredentialMetadata,
  OID4VCICredentialFormatTypes
} from '@sphereon/oid4vci-client/dist/main/lib/types/OID4VCIServerMetadata'
import { CredentialFormat } from '@sphereon/ssi-types'
import { IIdentifier, TKeyType } from '@veramo/core'

import { SupportedDidMethodEnum } from '../../did'
import { SignatureAlgorithmEnum } from '../../identity'

export interface IJwtOpts {
  identifier: IIdentifier
  nonce?: string
}

export interface IGetIssuanceInitiationFromUriArgs {
  uri: string
}

export interface IGetMetaDataArgs {
  issuanceInitiation: IssuanceInitiationWithBaseUrl
}

export interface IGetAccessTokenArgs {
  issuanceInitiation: IssuanceInitiationWithBaseUrl
  pin?: string
  metadata?: EndpointMetadata
}

export interface IGetCredentialArgs {
  issuanceInitiation: IssuanceInitiationWithBaseUrl
  token: string
  format: CredentialFormat | CredentialFormat[]
  jwtOpts: IJwtOpts
  metadata?: EndpointMetadata
}

export interface IGetCredentialFromIssuanceArgs {
  issuanceInitiation: IssuanceInitiationWithBaseUrl
  pin?: string
}

export interface IGetIssuanceOptsArgs {
  credentialType: string
  metadata: EndpointMetadata
}

export interface IIssuanceOpts {
  didMethod: SupportedDidMethodEnum
  format: OID4VCICredentialFormatTypes
  keyType: TKeyType
}

export interface IGetVcIssuanceFormatArgs {
  credentialMetadata: CredentialMetadata
}

export interface IGetIssuanceCryptoSuiteArgs {
  credentialFormatOpts: ICredentialFormatOpts
}

export interface ICredentialFormatOpts {
  credentialFormat: CredentialFormatSupport
  format: OID4VCICredentialFormatTypes
}
