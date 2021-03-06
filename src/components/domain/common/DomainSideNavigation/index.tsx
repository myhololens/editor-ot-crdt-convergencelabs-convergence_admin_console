/*
 * Copyright (c) 2019 - Convergence Labs, Inc.
 *
 * This file is part of the Convergence Server, which is released under
 * the terms of the GNU General Public License version 3 (GPLv3). A copy
 * of the GPLv3 should have been provided along with this file, typically
 * located in the "LICENSE" file, which is part of this source code package.
 * Alternatively, see <https://www.gnu.org/licenses/gpl-3.0.html> for the
 * full text of the GPLv3 license, if it was not provided.
 */

import * as React from 'react';
import {ReactNode} from 'react';
import {SideNavigation, SideNavigationMenuItem} from "../../../common/SideNavigation/";
import {DomainId} from "../../../../models/DomainId";
import {toDomainRoute} from "../../../../utils/domain-url";

export interface DomainSideNavigationProps {
  domainId: DomainId
}

export class DomainSideNavigation extends React.Component<DomainSideNavigationProps, {}> {

  private readonly _menus: SideNavigationMenuItem[];

  constructor(props: DomainSideNavigationProps) {
    super(props);

    const {domainId} = this.props;
    const dashboard = toDomainRoute( domainId, "");
    const users = toDomainRoute(domainId, "users");
    const groups = toDomainRoute(domainId, "groups/");
    const sessions = toDomainRoute(domainId, "sessions/");
    const collections = toDomainRoute(domainId, "collections/");
    const models = toDomainRoute(domainId, "models/");
    const chat = toDomainRoute(domainId, "chats/");
    const settings = toDomainRoute(domainId, "settings/");
    const auth = toDomainRoute(domainId, "authentication/");

    this._menus = [
      {key: "dashboard", icon: "dashboard", title: "Dashboard", link: dashboard, routeMatch: {path: dashboard, exact: true}},
      {key: "users", icon: "user", title: "Users", link: users, routeMatch: {path: users}},
      {key: "groups", icon: "team", title: "Groups", link: groups, routeMatch: {path: groups}},
      {key: "sessions", icon: "cloud", title: "Sessions", link: sessions, routeMatch: {path: sessions}},
      {key: "collections", icon: "folder", title: "Collections", link: collections,routeMatch: {path: collections}},
      {key: "models", icon: "file", title: "Models", link: models, routeMatch: {path: models}},
      {key: "chat", icon: "message", title: "Chat", link: chat, routeMatch: {path: chat}},
      {key: "authentication", icon: "lock", title: "Authentication", link: auth, routeMatch: {path: auth}},
      {key: "settings", icon: "setting", title: "Settings", link: settings, routeMatch: {path: settings}}
    ];
  }

  public render(): ReactNode {
    return (<SideNavigation menus={this._menus}/>);
  }
}
