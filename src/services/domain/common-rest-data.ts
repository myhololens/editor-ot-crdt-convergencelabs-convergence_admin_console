/*
 * Copyright (c) 2019 - Convergence Labs, Inc.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

export interface PagedData<T> {
  data: T[];
  startIndex: number;
  totalResults: number;
}

export interface CollectionData {
  id: string;
  description: string;
  worldPermissions: CollectionPermissionsData;
  overrideSnapshotPolicy: boolean;
  snapshotPolicy: ModelSnapshotPolicyData;
}

export interface CollectionUpdateData {
  description: string;
  worldPermissions: CollectionPermissionsData;
  overrideSnapshotPolicy: boolean;
  snapshotPolicy?: ModelSnapshotPolicyData;
}

export interface CollectionPermissionsData {
  read: boolean;
  write: boolean;
  remove: boolean;
  create: boolean;
  manage: boolean;
}

export interface CollectionSummaryData {
  id: string;
  description: string;
  modelCount: number;
}

export interface ModelSnapshotPolicyData {
  snapshotsEnabled: boolean;
  triggerByVersion: boolean;
  maximumVersionInterval: number;
  limitByVersion: boolean;
  minimumVersionInterval: number;
  triggerByTime: boolean;
  maximumTimeInterval: number;
  limitByTime: boolean;
  minimumTimeInterval: number;
}

export interface ModelData {
  id: string;
  collection: string;
  version: number
  createdTime: number,
  modifiedTime: number
  data?: {[key: string]: any}
}

export interface ModelPermissionSummaryData {
  overrideWorld: boolean;
  worldPermissions: ModelPermissionsData;
  userPermissions: ModelUserPermissionsData[];
}

export interface ModelPermissionsData {
  read: boolean;
  write: boolean;
  remove: boolean;
  manage: boolean;
}

export interface ModelUserPermissionsData {
  userId: DomainUserIdData;
  permissions: ModelPermissionsData;
}

export interface DomainUserData {
  username: string;
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  disabled: boolean;
}

export interface CreateDomainUserData {
  username: string;
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdateDomainUserData {
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  disabled: boolean;
}

export interface DomainUserIdData {
  type: string;
  username: string;
}

export interface DomainUserGroupData {
  id: string;
  description: string;
  members: string[];
}

export interface DomainUserGroupInfoData {
  id: string;
  description: string;
}

export interface DomainUserGroupSummaryData {
  id: string;
  description: string;
  members: number;
}

export interface DomainJwtKeyData {
  id: string;
  description: string;
  updated: Date;
  key: string;
  enabled: boolean
}


export interface DomainSessionData {
  id: string;
  username: string;
  userType: string;
  connected: number;
  disconnected?: number;
  authMethod: string;
  client: string;
  clientVersion: string;
  clientMetaData: string;
  remoteHost: string;
}

export interface DomainStatisticsData {
  activeSessionCount: number;
  userCount: number;
  modelCount: number;
  dbSize: number
}

export interface ChatInfoData {
  chatId: string;
  chatType: string;
  membership: string;
  name: string;
  topic: string;
  members: string[];
}

export interface CreateChatData {
  chatId: string;
  chatType: string;
  membership: string;
  name: string;
  topic: string;
  members: string[];
}
