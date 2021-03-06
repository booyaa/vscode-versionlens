/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Peter Flannery. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { CodeLens, Range, Uri } from 'vscode';
import { extractSymbolFromVersionRegex, formatWithExistingLeading } from './utils';

export class PackageCodeLens extends CodeLens {

  constructor(commandRange, replaceRange, packageInfo, documentUrl) {
    super(commandRange);
    this.replaceRange = replaceRange || commandRange;
    this.package = packageInfo;
    this.documentUrl = documentUrl;
    this.command = null;
  }

  generateNewVersion(newVersion) {
    if (!this.package.customGenerateVersion)
      return formatWithExistingLeading(this.package.version, newVersion);

    return this.package.customGenerateVersion.call(this, this.package, newVersion);
  }

  setCommand(text, command, args) {
    this.command = {
      title: text,
      command: command || null,
      arguments: args || null
    };
    return this;
  }

}