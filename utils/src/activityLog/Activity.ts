/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { randomUUID } from "crypto";
import { CancellationTokenSource, EventEmitter } from "vscode";
import * as types from '../../index';
import * as hTypes from '../../hostapi';
import { parseError } from "../parseError";

export abstract class ActivityBase<R> implements hTypes.Activity {

    public readonly id: string;
    public status: types.ActivityStatus = types.ActivityStatus.NotStarted;
    public error?: types.IParsedError;
    public message?: string;

    public readonly onChange: typeof this._onChangeEmitter.event;
    private readonly _onChangeEmitter = new EventEmitter();

    public readonly task: types.ActivityTask<R>;
    public readonly cancellationTokenSource: CancellationTokenSource = new CancellationTokenSource();

    abstract initialState(): hTypes.ActivityTreeItemOptions;
    abstract successState(): hTypes.ActivityTreeItemOptions;
    abstract errorState(error?: types.IParsedError): hTypes.ActivityTreeItemOptions;

    public constructor(task: types.ActivityTask<R>) {
        this.id = randomUUID();
        this.task = task;

        this.onChange = this._onChangeEmitter.event;
    }

    private report(progress: { message?: string; increment?: number }): void {
        this.message = progress.message ?? this.message;
        this._onChangeEmitter.fire(null);
    }

    public async run(): Promise<R> {
        try {
            this.status = types.ActivityStatus.Running;
            this._onChangeEmitter.fire(null);
            const result = await this.task({ report: this.report.bind(this) as typeof this.report }, this.cancellationTokenSource.token);
            this.status = types.ActivityStatus.Succeeded;
            this._onChangeEmitter.fire(null);
            return result as R;
        } catch (e) {
            this.error = parseError(e);
            this.status = types.ActivityStatus.Failed;
            this._onChangeEmitter.fire(null);
            throw e;
        }
    }

    public get state(): hTypes.ActivityTreeItemOptions {
        switch (this.status) {
            case types.ActivityStatus.Failed:
                return this.errorState(this.error);
            case types.ActivityStatus.Succeeded:
                return this.successState();
            default:
                return this.initialState();
        }
    }
}
