/*
 * Copyright (c) 2019 - Convergence Labs, Inc.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React, {ReactNode} from "react";
import {Card, Icon, notification} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {RouteComponentProps} from "react-router";
import {DomainId} from "../../../../../models/DomainId";
import {DomainJwtKeyService} from "../../../../../services/domain/DomainJwtKeyService";
import {SERVICES} from "../../../../../services/ServiceConstants";
import {toDomainRoute} from "../../../../../utils/domain-url";
import {DomainJwtKey} from "../../../../../models/domain/DomainJwtKey";
import {Page} from "../../../../../components/common/Page";
import {RestError} from "../../../../../services/RestError";
import {injectAs} from "../../../../../utils/mobx-utils";
import {DomainJwtKeyForm} from "../../../../../components/domain/auth/DomainJwtKeyForm";
import styles from "./styles.module.css";

export interface CreateDomainJwtKeyProps extends RouteComponentProps {
  domainId: DomainId;
}

interface InjectedProps extends CreateDomainJwtKeyProps, FormComponentProps {
  domainJwtKeyService: DomainJwtKeyService;
}

class CreateDomainJwtKeyComponent extends React.Component<InjectedProps, {}> {
  private readonly _breadcrumbs = [
    {title: "Authentication", link: toDomainRoute(this.props.domainId, "authentication/")},
    {title: "JWT Keys", link: toDomainRoute(this.props.domainId, "authentication/jwt")},
    {title: "New JWT Key"}
  ];
  private readonly _newKey = new DomainJwtKey("", "", new Date(), "", true);


  public render(): ReactNode {
    return (
      <Page breadcrumbs={this._breadcrumbs}>
        <Card title={<span><Icon type="team"/> New JWT Key</span>} className={styles.formCard}>
          <DomainJwtKeyForm
            disableId={false}
            domainId={this.props.domainId}
            saveButtonLabel="Create"
            initialValue={this._newKey}
            onCancel={this._handleCancel}
            onSave={this._handleSave}
          />
        </Card>
      </Page>
    );
  }

  private _handleCancel = () => {
    const url = toDomainRoute(this.props.domainId, "authentication/jwt");
    this.props.history.push(url);
  }

  private _handleSave = (key: DomainJwtKey) => {
    this.props.domainJwtKeyService.createKey(this.props.domainId, key)
      .then(() => {
        notification.success({
          message: 'Key Created',
          description: `Jwt Key '${key.id}' successfully created.`
        });
        const url = toDomainRoute(this.props.domainId, "authentication/jwt");
        this.props.history.push(url);
      }).catch((err) => {
      if (err instanceof RestError) {
        if (err.code === "duplicate") {
          notification.error({
            message: 'Could Not Create Key',
            description: `A key with the specified ${err.details["field"]} already exists.`
          });
        }
      }
    });
  }
}

const injections = [SERVICES.DOMAIN_JWT_KEY_SERVICE];
export const CreateDomainJwtKey = injectAs<CreateDomainJwtKeyProps>(injections, CreateDomainJwtKeyComponent);
