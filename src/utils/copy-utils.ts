/*
 * Copyright (c) 2019 - Convergence Labs, Inc.
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

export function getOrDefault<T>(value: T | undefined, defaultValue: T): T {
  return value !== undefined ? value : defaultValue;
}
