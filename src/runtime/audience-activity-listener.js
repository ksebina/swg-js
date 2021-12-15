/**
 * Copyright 2021 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

<<<<<<< HEAD
import {
  AnalyticsEvent,
  AudienceActivityClientLogsRequest,
} from '../proto/api_messages';
import {serviceUrl} from './services';
import {Storage} from './storage';
=======
 import {
    AnalyticsEvent,
    AudienceActivityClientLogsRequest,
  } from '../proto/api_messages';
  import {serviceUrl} from './services';
  import {Storage} from './storage';
  import {Constants} from '../utils/constants';
>>>>>>> 17627b11 (change to request to AudienceActivityClientLogsRequest)

/** @const {!Set} */
const audienceActivityLoggingEvents = new Set([
  AnalyticsEvent.IMPRESSION_PAGE_LOAD,
  AnalyticsEvent.IMPRESSION_PAYWALL,
  AnalyticsEvent.ACTION_PAYMENT_FLOW_STARTED,
  AnalyticsEvent.ACTION_CONTRIBUTION_OFFER_SELECTED,
]);

<<<<<<< HEAD
export class AudienceActivityEventListener {
  /**
   * @param {!./deps.DepsDef} deps
   * @param {!./fetcher.Fetcher} fetcher
   */
  constructor(deps, fetcher) {
    /** @private @const {!Window} */
    this.win_ = deps.win();

    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;

    /** @private @const {!./client-event-manager.ClientEventManager} */
    this.eventManager_ = deps.eventManager();

    /** @private @const {!./fetcher.Fetcher} */
    this.fetcher_ = fetcher;

    /** @private @const {!Storage} */
    this.storage_ = new Storage(this.win_);
=======
      /** @private @const {!./deps.DepsDef} */
      this.deps_ = deps;
  
      /** @private @const {!./client-event-manager.ClientEventManager} */
      this.eventManager_ = deps.eventManager();

      /** @private @const {!./fetcher.Fetcher} */
      this.fetcher_ = fetcher;

      /** @private @const {!Storage} */
      this.storage_ = new Storage(this.win_);
    }
  
    /**
     * Start listening to client events
     */
    start() {
      this.eventManager_.registerEventListener(
        this.handleClientEvent_.bind(this)
      );
    }
  
    /**
     *  Listens for new events from the events manager and logs appropriate events to Google Analytics.
     * @param {!../api/client-event-manager-api.ClientEvent} event
     */
    handleClientEvent_(event) {
      const audienceActivityLoggingEvents = [AnalyticsEvent.IMPRESSION_PAGE_LOAD, AnalyticsEvent.IMPRESSION_PAYWALL, AnalyticsEvent.ACTION_PAYMENT_FLOW_STARTED, AnalyticsEvent.ACTION_CONTRIBUTION_OFFER_SELECTED];
      if (audienceActivityLoggingEvents.includes(event.eventType)) {
        const pubId = encodeURIComponent(this.deps_.pageConfig().getPublicationId());
        const audienceActivityClientLogsRequest = this.createLogRequest(event);
        const url = serviceUrl('/publication/' + pubId + '/audienceactivitylogs');
        console.log(audienceActivityClientLogsRequest);
        console.log(url);
        this.fetcher_.sendBeacon(url, audienceActivityClientLogsRequest);
     }
   }

   /**
   * @param {!../api/client-event-manager-api.ClientEvent} event
   * @return {!AudienceActivityLogRequest}
   */
   createLogRequest(event) {
      const request = new AudienceActivityClientLogsRequest();
      request.setEvent(/** @type {!AnalyticsEvent} */ (event.eventType));
      return request;
>>>>>>> 17627b11 (change to request to AudienceActivityClientLogsRequest)
  }

  /**
   * Start listening to client events.
   */
  start() {
    this.eventManager_.registerEventListener(
      this.handleClientEvent_.bind(this)
    );
  }

  /**
   *  Listens for new audience activity events from the events manager and sends them to the SwG Client Server.
   * @param {!../api/client-event-manager-api.ClientEvent} event
   */
  handleClientEvent_(event) {
    if (audienceActivityLoggingEvents.has(event.eventType)) {
      const pubId = encodeURIComponent(
        this.deps_.pageConfig().getPublicationId()
      );
      const audienceActivityClientLogsRequest = this.createLogRequest(event);
      const url = serviceUrl('/publication/' + pubId + '/audienceactivitylogs');
      this.fetcher_.sendBeacon(url, audienceActivityClientLogsRequest);
    }
  }

  /**
   * @param {!../api/client-event-manager-api.ClientEvent} event
   * @return {!AudienceActivityClientLogsRequest}
   */
  createLogRequest(event) {
    const request = new AudienceActivityClientLogsRequest();
    request.setEvent(/** @type {!AnalyticsEvent} */ (event.eventType));
    return request;
  }
}
