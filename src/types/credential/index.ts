import {CredentialMetadata} from '@sphereon/openid4vci-client';

import {LabelStatus} from '../component';
import { VerifiableCredential } from '@veramo/core'

export enum CredentialStatusEnum {
  VALID = 'valid',
  EXPIRED = 'expired',
  REVOKED = 'revoked',
}

export enum IssuerStatusEnum {
  VERIFIED = 'verified',
  UNVERIFIED = 'unverified',
}

export enum CredentialIssuanceStateEnum {
  OFFER = 'offer',
}

// TODO create proper interface for credential summary / info
export interface ICredentialSummary {
  id: string; // TODO this is the hash of the vc. maybe call this hash to avoid confusion
  title: string;
  issuer: IIssuerSummary;
  credentialStatus: CredentialStatusEnum;
  issueDate: number;
  expirationDate: number;
  properties: ICredentialDetailsRow[];
}

// TODO create proper interface for credential summary / info
export interface IIssuerSummary {
  name: string;
  alias: string
  image?: string;
  url?: string;
}

// TODO interface should be replaced by proper interface for credential details
export interface ICredentialDetailsRow {
  id: string;
  label: string;
  value: any;
  isEditable?: boolean;
  status?: LabelStatus;
}

export interface ICredentialTypeSelection {
  id: string;
  credentialType: string;
  isSelected: boolean;
}

export interface ICredentialMetadata extends CredentialMetadata {
  credentialType: string;
}

export interface ICredentialSelection {
  id: string
  credential: ICredentialSummary
  rawCredential: VerifiableCredential
  isSelected: boolean;
}
