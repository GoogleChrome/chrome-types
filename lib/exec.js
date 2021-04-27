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
 * @fileoverview Better version of Node's child process helper.
 */


import * as childProcess from 'child_process';


/**
 * Executes the given command (and its string arguments) via the shell with some limited options.
 *
 * Always logs STDERR (itself via STDERR), returns STDOUT and the status code.
 *
 * @param {string[]} args
 * @param {{cwd?: string, stdin?: string|Buffer}} options
 * @return {Promise<{code: number, out: Buffer}>}
 */
export function exec(args, options = {}) {
  const { cwd = process.cwd(), stdin } = options;

  args = args.slice();
  const command = args.shift();
  if (!command) {
    throw new TypeError(`no command specified`)
  }
  return new Promise((resolve) => {
    const ls = childProcess.spawn(command, args, {
      cwd,
      shell: true,
    });

    if (stdin !== undefined) {
      ls.stdin.write(stdin);
      ls.stdin.end();
    }

    const chunks = [];
    ls.stdout.on('data', (data) => chunks.push(data));
    ls.stderr.on('data', (data) => process.stderr.write(data));

    ls.on('close', (code) => {
      const out = Buffer.concat(chunks);
      return resolve({ code: code ?? 0, out });
    });
  });
}
