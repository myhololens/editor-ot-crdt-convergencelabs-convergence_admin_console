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

import React, {ReactNode} from "react";
import {Checkbox, Col, Form, InputNumber, Row} from "antd";
import {ModelSnapshotPolicy} from "../../../../models/domain/ModelSnapshotPolicy";
import {WrappedFormUtils} from "antd/lib/form/Form";

interface ModelSnapshotPolicyFormFragmentProps {
  form: WrappedFormUtils
  initialValue: ModelSnapshotPolicy;
}

export class ModelSnapshotPolicyFormFragment extends React.Component<ModelSnapshotPolicyFormFragmentProps, {}> {
  public render(): ReactNode {
    const {form: {getFieldDecorator}, initialValue} = this.props
    return (
      <React.Fragment>
        <Row>
          <Col span={24}>
            {getFieldDecorator('snapshotsEnabled', {
              initialValue: initialValue.snapshotsEnabled,
              valuePropName: 'checked'
            })(
              <Checkbox>Snapshots Enabled</Checkbox>
            )}
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            {getFieldDecorator('triggerByVersion', {
              initialValue: initialValue.triggerByVersion,
              valuePropName: 'checked'
            })(
              <Checkbox>Trigger By Version</Checkbox>
            )}
          </Col>
          <Col span={12}>
            {getFieldDecorator('limitByVersion', {
              initialValue: initialValue.limitByVersion,
              valuePropName: 'checked'
            })(
              <Checkbox>Limit By Version</Checkbox>
            )}
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Maximum Version">
              {getFieldDecorator('maximumVersion', {
                initialValue: initialValue.maximumVersionInterval
              })(
                <InputNumber/>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Minimum Version">
              {getFieldDecorator('minimumVersion', {
                initialValue: initialValue.minimumVersionInterval
              })(
                <InputNumber/>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            {getFieldDecorator('triggerByTime', {
              initialValue: initialValue.triggerByTime, valuePropName: 'checked'
            })(
              <Checkbox>Trigger By Time</Checkbox>
            )}
          </Col>
          <Col span={12}>
            {getFieldDecorator('limitByTime', {
              initialValue: initialValue.limitByTime,
              valuePropName: 'checked'
            })(
              <Checkbox>Limit By Time</Checkbox>
            )}
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Maximum Time (min)">
              {getFieldDecorator('maximumTime', {
                initialValue: initialValue.maximumTimeInterval
              })(
                <InputNumber/>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Minimum Time (min)">
              {getFieldDecorator('minimumTime', {
                initialValue: initialValue.minimumTimeInterval
              })(<InputNumber/>)}
            </Form.Item>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
