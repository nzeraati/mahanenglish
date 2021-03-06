
// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { Injectable, Injector } from '@angular/core';
import { CoreUserProfileFieldHandler, CoreUserProfileFieldHandlerData } from '@core/user/providers/user-profile-field-delegate';
import { AddonUserProfileFieldDatetimeComponent } from '../component/datetime';

/**
 * Datetime user profile field handlers.
 */
@Injectable()
export class AddonUserProfileFieldDatetimeHandler implements CoreUserProfileFieldHandler {
    name = 'AddonUserProfileFieldDatetime';
    type = 'datetime';

    constructor() {
        // Nothing to do.
    }

    /**
     * Whether or not the handler is enabled on a site level.
     *
     * @return {boolean|Promise<boolean>} True or promise resolved with true if enabled.
     */
    isEnabled(): boolean | Promise<boolean> {
        return true;
    }

    /**
     * Get the data to send for the field based on the input data.
     *
     * @param  {any}     field          User field to get the data for.
     * @param  {boolean} signup         True if user is in signup page.
     * @param  {string}  [registerAuth] Register auth method. E.g. 'email'.
     * @param  {any}     formValues     Form Values.
     * @return {CoreUserProfileFieldHandlerData}  Data to send for the field.
     */
    getData(field: any, signup: boolean, registerAuth: string, formValues: any): CoreUserProfileFieldHandlerData {
        const name = 'profile_field_' + field.shortname;

        if (formValues[name]) {
            const milliseconds = new Date(formValues[name]).getTime();

            return {
                type: 'datetime',
                name: 'profile_field_' + field.shortname,
                value: Math.round(milliseconds / 1000)
            };
        }
    }

    /**
     * Return the Component to use to display the user profile field.
     * It's recommended to return the class of the component, but you can also return an instance of the component.
     *
     * @param {Injector} injector Injector.
     * @return {any|Promise<any>} The component (or promise resolved with component) to use, undefined if not found.
     */
    getComponent(injector: Injector): any | Promise<any> {
        return AddonUserProfileFieldDatetimeComponent;
    }
}
