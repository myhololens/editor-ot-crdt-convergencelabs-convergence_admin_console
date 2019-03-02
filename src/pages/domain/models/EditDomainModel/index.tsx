import {Page} from "../../../../components/common/Page/";
import React, {ReactNode} from "react";
import {Card, notification, Popconfirm, Tabs} from "antd";
import {Icon} from 'antd';
import styles from "./styles.module.css";
import {RouteComponentProps} from "react-router";
import {injectAs} from "../../../../utils/mobx-utils";
import {SERVICES} from "../../../../services/ServiceConstants";
import {DomainModelService} from "../../../../services/domain/DomainModelService";
import {ModelEditorTab} from "./ModelEditorTab/";
import {ModelPermissionsTab} from "./ModelPermissionsTab";
import {ToolbarButton} from "../../../../components/common/ToolbarButton";
import {DomainId} from "../../../../models/DomainId";
import {toDomainUrl} from "../../../../utils/domain-url";
import {Model} from "../../../../models/domain/Model";
import {makeCancelable, PromiseSubscription} from "../../../../utils/make-cancelable";
import {IBreadcrumbSegment} from "../../../../stores/BreacrumsStore";

interface EditDomainModelRouteProps {
  id: string;
  tab: string;
}

interface EditDomainModelProps extends RouteComponentProps<EditDomainModelRouteProps> {
  domainId: DomainId;
}

interface InjectedProps extends EditDomainModelProps {
  domainModelService: DomainModelService;
}

interface EditDomainModelState {
  model: Model | null;
}

class EditDomainModelComponent extends React.Component<InjectedProps, EditDomainModelState> {
  private readonly _breadcrumbs: IBreadcrumbSegment[];
  private _modelSubscription: PromiseSubscription | null;

  constructor(props: InjectedProps) {
    super(props);

    const id = this.props.match.params.id;
    this._breadcrumbs = [
      {title: "Models", link: toDomainUrl(this.props.domainId, "models")},
      {title: id}
    ];

    this.state = {
      model: null
    };

    this._modelSubscription = null;
  }

  public componentDidMount(): void {
    this._loadModel();
  }

  public componentWillUnmount(): void {
    if (this._modelSubscription !== null) {
      this._modelSubscription.unsubscribe();
      this._modelSubscription = null;
    }
  }

  public render(): ReactNode {
    const {model}= this.state;
    if (model != null) {
      const tab = this.props.match.params.tab || "data";
      const baseUrl = toDomainUrl(this.props.domainId, `models/${model.id}`);
      return (
        <Page breadcrumbs={this._breadcrumbs} full={true}>
          <Card title={this._renderTitle(model)} className={styles.formCard}>
            <Tabs className={styles.tabs}
                  type="card"
                  defaultActiveKey={tab}
                  onChange={key => {
                    this.props.history.push(`${baseUrl}/${key}`);
                  }}
            >
              <Tabs.TabPane tab="Data" key="data">
                <ModelEditorTab modelId={model.id}/>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Permissions" key="permissions">
                <ModelPermissionsTab
                  domainId={this.props.domainId}
                  modelId={model.id}
                />
              </Tabs.TabPane>
            </Tabs>
          </Card>
        </Page>
      );
    } else {
      return null;
    }
  }

  private _renderTitle = (model: Model) => {
    return (
      <span className={styles.title}>
        <span className={styles.editTitle}>
          <Icon type="file"/>
          <span> Edit Model</span>
        </span>
        <span className={styles.modelAndCollection}>
          <span className={styles.modelId}>{model.id}</span>
          <span className={styles.collectionId}><Icon className={styles.collectionIcon}
                                                      type="folder"/>{model.collection}</span>
        </span>
        <span className={styles.spacer}/>
        <Popconfirm title="Delete this model?" onConfirm={this._onDeleteModel} placement="bottomRight">
          <ToolbarButton icon="delete" tooltip="Delete Model"/>
        </Popconfirm>
      </span>
    );
  }

  private _onDeleteModel = () => {
    this.props.domainModelService
      .deleteModel(this.props.domainId, this.props.match.params.id)
      .then(() => {
          notification.success({
            message: "Model Deleted",
            description: `The model '${this.props.match.params.id}' was deleted.`
          });

          this.props.history.push(toDomainUrl(this.props.domainId, "models"));
        }
      )
      .catch(err => {
        console.log(err);
        notification.error({
          message: "Model Not Deleted",
          description: `Ths model could not be deleted.`
        });
      });
  }

  private _loadModel(): void {
    const {id} = this.props.match.params;
    const {promise, subscription} = makeCancelable(
      this.props.domainModelService.getModelById(this.props.domainId, id, false)
    );

    this._modelSubscription = subscription;

    promise.then(model => {
      this.setState({model: model});
    })
  }
}

const injections = [SERVICES.DOMAIN_MODEL_SERVICE];
export const EditDomainModel = injectAs<EditDomainModelProps>(injections, EditDomainModelComponent);
