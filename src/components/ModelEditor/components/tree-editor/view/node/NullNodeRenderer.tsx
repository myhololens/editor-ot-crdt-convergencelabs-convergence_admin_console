/*
 * Copyright (c) 2019 - Convergence Labs, Inc.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React, {ReactNode} from "react";
import {NullNode} from "../../model/NullNode";
import {NodeRenderer, NodeRendererProps, NodeRendererState} from "./NodeRenderer";
import classNames from "classnames";
import {Highlighter, HighlightRange} from "../highlighter/Highlighter";
import {NullSearchResult} from "../../model/search/NullSearchResult";


export interface NullNodeRendererProps extends NodeRendererProps {
  node: NullNode;
}

export class NullNodeRenderer extends NodeRenderer<NullNodeRendererProps, NodeRendererState> {

  private _span: HTMLSpanElement | null = null;
  private _text: Text | null = null;

  public render(): ReactNode {
    return super.render();
  }

  protected _renderValue(): ReactNode {
    const ranges = this._getSearchRanges();
    return (
      <div className="value null-value">
        <span ref={this._setSpan}>null</span>
        <Highlighter ranges={ranges}/>
      </div>
    );
  }

  protected _classNames(): any {
    return classNames({
      "node": true,
      "null-node": true
    });
  }

  private _setSpan = (span: HTMLSpanElement) => {
    this._span = span;
    if (this._span) {
      this._text = this._span.firstChild as Text;
    } else {
      this._text = null;
    }
  };

  private _getSearchRanges(): HighlightRange[] {
    const ranges: HighlightRange[] = [];
    if (this._text) {
      const active = this.props.node.getActiveSearchResult();
      this.props.node.searchResults().forEach(result => {
        if (result instanceof NullSearchResult) {
          const range: Range = document.createRange();
          range.setStart(this._text!, 0);
          range.setEnd(this._text!, 4);
          ranges.push({
            range: range,
            active: result === active
          });
        }
      });
    }
    return ranges;
  }
}