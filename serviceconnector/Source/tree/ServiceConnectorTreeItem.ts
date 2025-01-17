/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { LinkerResource } from "@azure/arm-servicelinker";
import {
	AzExtParentTreeItem,
	AzExtTreeItem,
	createContextValue,
	nonNullProp,
	TreeItemIconPath,
} from "@microsoft/vscode-azext-utils";
import { ThemeIcon } from "vscode";

import { getIconPath } from "./IconPath";
import { connectionIconPath } from "./ServiceConnectorItem";
import { getTreeId } from "./treeUtils";

export class ServiceConnectorTreeItem extends AzExtTreeItem {
	public readonly linker: LinkerResource;

	public readonly item: AzExtTreeItem;

	constructor(
		linker: LinkerResource,
		parent: AzExtParentTreeItem,
		private readonly contextValuesToAdd: string[],
	) {
		super(parent);

		this.linker = linker;

		this.item = parent;
	}

	public get id(): string {
		return getTreeId(this.item, this.linker);
	}

	public get label(): string {
		return nonNullProp(this.linker, "name");
	}

	public get contextValue(): string {
		return createContextValue([
			"serviceConnectorItem",
			...this.contextValuesToAdd,
		]);
	}

	public get iconPath(): TreeItemIconPath {
		return connectionIconPath(this.linker) === ""
			? new ThemeIcon("dash")
			: getIconPath(connectionIconPath(this.linker));
	}
}
