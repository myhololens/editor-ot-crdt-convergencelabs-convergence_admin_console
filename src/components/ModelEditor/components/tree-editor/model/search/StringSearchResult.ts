import {SearchResult} from "./SearchResult";
import {StringNode} from "../StringNode";

export class StringSearchResult extends SearchResult {

  private _start: number;
  private _end: number;

  constructor(node: StringNode, start: number, end: number) {
    super(node);
    this._start = start;
    this._end = end;
  }

  public start(): number {
    return this._start;
  }

  public end(): number {
    return this._end;
  }
}