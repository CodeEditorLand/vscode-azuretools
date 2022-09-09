/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import * as types from '../../../../index';
import { QuickPickAzureSubscriptionStep } from '../quickPickAzureResource/QuickPickAzureSubscriptionStep';
import { QuickPickGroupStep } from '../quickPickAzureResource/QuickPickGroupStep';
import { QuickPickAppResourceStep } from '../quickPickAzureResource/QuickPickAppResourceStep';
import { RecursiveQuickPickStep } from '../RecursiveQuickPickStep';
import { getLastNode } from '../QuickPickWizardContext';
import { NoResourceFoundError } from '../../../errors';
import { AzureWizardPromptStep } from '../../../wizard/AzureWizardPromptStep';
import { AzExtResourceType } from '../../../AzExtResourceType';
import { AzureWizard } from '../../../wizard/AzureWizard';
import { AzureResourceQuickPickWizardContext, ResourceGroupsItem } from '../../../../hostapi.v2';
import { isBox } from '../../../registerCommandWithTreeNodeUnboxing';

export async function appResourceExperience<TPick>(context: types.IActionContext, tdp: vscode.TreeDataProvider<ResourceGroupsItem>, resourceType: AzExtResourceType, childItemFilter?: types.ContextValueFilter): Promise<TPick> {
    const promptSteps: AzureWizardPromptStep<AzureResourceQuickPickWizardContext>[] = [
        new QuickPickAzureSubscriptionStep(tdp),
        new QuickPickGroupStep(tdp, {
            groupType: resourceType,
        }),
        new QuickPickAppResourceStep(tdp, {
            resourceType: resourceType,
            skipIfOne: false,
        }),
    ];

    if (childItemFilter) {
        promptSteps.push(new RecursiveQuickPickStep<ResourceGroupsItem, AzureResourceQuickPickWizardContext>(tdp, {
            contextValueFilter: childItemFilter,
            skipIfOne: false,
        }));
    }

    // Fill in the `pickedNodes` property
    const wizardContext = context as AzureResourceQuickPickWizardContext;
    wizardContext.pickedNodes = [];

    const wizard = new AzureWizard(context, {
        hideStepCount: true,
        promptSteps: promptSteps,
    });

    await wizard.prompt();

    const lastPickedItem = getLastNode(wizardContext);

    if (!lastPickedItem) {
        throw new NoResourceFoundError(wizardContext);
    } else {
        return isBox(lastPickedItem) ? lastPickedItem.unwrap<TPick>() : lastPickedItem as unknown as TPick;
    }
}
