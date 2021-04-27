/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * @fileoverview Helper to write C-style output (with block comments). Does not deal with maximum
 * line length, as buffers may be created and attached at any point.
 */


const INDENT_SIZE = 2;


import * as types from '../types/index.js';


export class RenderBuffer {
  #depth = 0;

  /** @type {string[]} */
  #lines = [];

  /**
   * Appends another string or @see {RenderBuffer} to this buffer. This appends to the current line
   * and does not insert a new line.
   *
   * @param {string|RenderBuffer} raw
   */
  append(raw) {
    if (raw instanceof RenderBuffer) {
      raw = raw.render();
    }

    const lines = raw.split('\n');

    let last = this.#lines.pop() || this.indent();
    last += lines.shift() ?? '';
    this.#lines.push(last);

    for (let line of lines) {
      if (line) {
        this.#lines.push(this.indent() + line);
      } else {
        this.#lines.push('');
      }
    }
  }

  /**
   * Adds a single line to this buffer. Always adds the line, even if blank.
   *
   * @param {string} raw line to add to this buffer
   */
  line(raw = '') {
    this.append('\n' + raw);
  }

  /**
   * Adds a block comment to the output of this buffer. If the raw comment is blank or zero-length,
   * no comment will be added whatsoever.
   *
   * @param {string=} raw
   * @param {types.Tag[]} tags
   * @return {boolean} whether anything was added
   */
  comment(raw, tags = []) {
    if (!raw && !tags.length) {
      return false;
    }
    this.line('/**');

    if (raw) {
      raw = raw.replace(/\*\//g, '*\\/').trim();

      raw.split('\n').map((line) => line.trim()).forEach((line) => {
        if (line) {
          this.line(` * ${line}`);
        } else {
          this.line(` *`);
        }
      });

      if (tags.length) {
        this.line(' *');
      }
    }

    tags.forEach(({name, value}) => {
      this.line(` * @${name}`);
      if (value === '') {
        // ignore
      } else if (value != null) {
        this.append(` ${value}`)
      }
    });

    this.line(' */');
    return true;
  }

  /**
   * @return {string} the current indent (in spaces) for this depth
   */
  indent() {
    return ''.padStart(this.#depth * INDENT_SIZE, ' ');
  }

  /**
   * Starts an indented block with a given string. An example might be "namespace foo {".
   */
  start(s = '') {
    this.append(s);
    ++this.#depth;
  }

  /**
   * Completes a block with a given string, e.g., with "}".
   */
  end(s = '') {
    if (this.#depth === 0) {
      throw new Error(`cannot finish block zero`);
    }
    --this.#depth;
    this.line(s);
  }

  /**
   * Renders this buffer to a string.
   */
  render() {
    return this.#lines.join('\n');
  }
}
