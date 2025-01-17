/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {
	AzExtParentTreeItem,
	AzExtTreeItem,
	createContextValue,
	GenericTreeItem,
	IActionContext,
	TreeItemIconPath,
} from "@microsoft/vscode-azext-utils";
import { l10n, ThemeIcon } from "vscode";

import { ParsedSite } from "../SiteClient";
import { createSiteFilesUrl, ISiteFileMetadata, listFiles } from "../siteFiles";
import { FileTreeItem } from "./FileTreeItem";

export interface FolderTreeItemOptions {
	site: ParsedSite;

	label: string;

	url: string;

	isReadOnly: boolean;

	contextValuesToAdd?: string[];
}

export class FolderTreeItem extends AzExtParentTreeItem {
	public static contextValue: string = "folder";

	public readonly childTypeLabel: string = l10n.t("file or folder");

	public readonly label: string;

	public readonly url: string;

	public readonly isReadOnly: boolean;

	public readonly contextValuesToAdd: string[];

	public readonly site: ParsedSite;

	protected readonly _isRoot: boolean = false;

	constructor(parent: AzExtParentTreeItem, options: FolderTreeItemOptions) {
		super(parent);

		this.site = options.site;

		this.label = options.label;

		this.url = options.url;

		this.isReadOnly = options.isReadOnly;

		this.contextValuesToAdd = options.contextValuesToAdd || [];
	}

	public get contextValue(): string {
		return createContextValue([
			FolderTreeItem.contextValue,
			...this.contextValuesToAdd,
		]);
	}

	public get iconPath(): TreeItemIconPath {
		return new ThemeIcon("folder");
	}

	public hasMoreChildrenImpl(): boolean {
		return false;
	}

	public get description(): string | undefined {
		return this._isRoot && this.isReadOnly
			? l10n.t("Read-only")
			: undefined;
	}

	public async loadMoreChildrenImpl(
		_clearCache: boolean,
		context: IActionContext,
	): Promise<AzExtTreeItem[]> {
		let files: ISiteFileMetadata[] = await listFiles(
			context,
			this.site,
			this.url,
		);
		// this file is being accessed by Kudu and is not viewable
		files = files.filter(
			(f) =>
				f.mime !== "text/xml" ||
				!f.name.includes("LogFiles-kudu-trace_pending.xml"),
		);

		return files.map((file) => {
			const url = createSiteFilesUrl(this.site, file.path, file.href);

			return file.mime === "inode/directory"
				? new FolderTreeItem(this, {
						site: this.site,
						label: file.name,
						isReadOnly: this.isReadOnly,
						url,
						contextValuesToAdd: this.contextValuesToAdd,
					})
				: new FileTreeItem(
						this,
						this.site,
						file.name,
						url,
						this.isReadOnly,
					);
		});
	}

	public compareChildrenImpl(ti1: AzExtTreeItem, ti2: AzExtTreeItem): number {
		let result: number | undefined = instanceOfCompare(
			ti1,
			ti2,
			GenericTreeItem,
		);

		if (result === undefined) {
			result = instanceOfCompare(ti1, ti2, FolderTreeItem);
		}

		return result === undefined
			? ti1.label.localeCompare(ti2.label)
			: result;
	}
}

function instanceOfCompare<T>(
	ti1: AzExtTreeItem,
	ti2: AzExtTreeItem,
	typeToCompare: new (...args: unknown[]) => T,
): number | undefined {
	if (!(ti1 instanceof typeToCompare) && ti2 instanceof typeToCompare) {
		return 1;
	} else if (
		ti1 instanceof typeToCompare &&
		!(ti2 instanceof typeToCompare)
	) {
		return -1;
	} else {
		return undefined;
	}
}
