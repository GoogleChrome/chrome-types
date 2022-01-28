/**
 * Copyright 2022 Google LLC
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

import test from 'ava';
import {
  FeatureQueryAll,
  EmptyRenderOverride,
  RenderOverride,
} from '../tools/override.js';
import { FeatureQuery } from '../tools/lib/feature-query.js';

const featureQuery = new FeatureQuery({
  spec: {
    dependencies: ['dependency-one'],
    channel: 'beta',
  },
});

/**
 * @type {import('../types/chrome.js').EventSpec}
 */
const eventSpec = {
  name: 'hi',
  returns: undefined,
  parameters: [],
  type: 'function',
  options: {},
  extraParameters: [],
  filters: [],
  $ref: '$ref',
};
eventSpec.returns = eventSpec;
eventSpec.filters?.push(eventSpec);
eventSpec.extraParameters?.push(eventSpec);

const validId = 'api:declarativeContent.onPageChanged';

test('FeatureQueryAll.mergeComplexFeature', (t) => {
  const fqa = new FeatureQueryAll({});
  let mcf;

  // Returns super.mergeComplexFeature result when not undefined
  mcf = fqa.mergeComplexFeature([]);
  t.deepEqual(mcf, { dependencies: [] });

  // If all dependencie match, then super.mergeComplexFeature returns dependencies
  mcf = fqa.mergeComplexFeature([{}, {}]);
  t.deepEqual(mcf, { dependencies: [] });

  // If all dependencie don't equal the first, then super.mergeComplexFeature returns undefined
  mcf = fqa.mergeComplexFeature([
    { disallow_for_service_workers: false },
    { disallow_for_service_workers: true },
  ]);
  t.deepEqual(mcf, undefined);
});

test('EmptyRenderOverride.isVisible', (t) => {
  const erq = new EmptyRenderOverride();
  let iv;

  // `isVisible` always returns true
  iv = erq.isVisible([]);
  t.is(iv, true);
  iv = erq.isVisible();
  t.is(iv, true);
  iv = erq.isVisible(1, 2);
  t.is(iv, true);
});

test('EmptyRenderOverride.objectTemplatesFor', (t) => {
  const erq = new EmptyRenderOverride();
  let oTR;

  // `objectTemplatesFor` always returns undefined
  oTR = erq.objectTemplatesFor([]);
  t.is(oTR, undefined);
  oTR = erq.objectTemplatesFor();
  t.is(oTR, undefined);
  oTR = erq.objectTemplatesFor('hello world');
  t.is(oTR, undefined);
});

test('EmptyRenderOverride.typeOverride', (t) => {
  const erq = new EmptyRenderOverride();
  let tO;

  // `typeOverride` always returns undefined
  tO = erq.typeOverride([]);
  t.is(tO, undefined);
  tO = erq.typeOverride();
  t.is(tO, undefined);
  tO = erq.typeOverride(1, 2);
  t.is(tO, undefined);
});

test('EmptyRenderOverride.tagsFor', (t) => {
  const erq = new EmptyRenderOverride();
  let tf;

  // `tagsFor` always returns undefined
  tf = erq.tagsFor([]);
  t.is(tf, undefined);
  tf = erq.tagsFor();
  t.is(tf, undefined);
  tf = erq.tagsFor(1, 2);
  t.is(tf, undefined);
});

test('EmptyRenderOverride.rewriteComment', (t) => {
  const erq = new EmptyRenderOverride();
  let rc;

  // `rewriteComment` always returns undefined
  rc = erq.rewriteComment([]);
  t.is(rc, undefined);
  rc = erq.rewriteComment();
  t.is(rc, undefined);
  rc = erq.rewriteComment(1, 2, 3);
  t.is(rc, undefined);
});

test('RenderOverride', (t) => {
  // Doesn't throw error with valid arguments
  t.notThrows(() => new RenderOverride({}, featureQuery));
});

test('RenderOverride.isVisible', (t) => {
  let ro = new RenderOverride({}, featureQuery);
  let iv;

  // Not visible if internal API aren't specifically disallowed
  iv = ro.isVisible({}, 'api:test');
  t.is(iv, false);

  // Not visible if invalid id
  iv = ro.isVisible({}, 'Private');
  t.is(iv, false);
  iv = ro.isVisible({}, 'Internal');
  t.is(iv, false);

  // Not visible if invalid id
  iv = ro.isVisible({}, 'Private');
  t.is(iv, false);
  iv = ro.isVisible({}, 'Internal');
  t.is(iv, false);

  // If specific API's return `true`
  iv = ro.isVisible({}, 'api:contextMenus.OnClickData');
  t.is(iv, true);
  iv = ro.isVisible({}, 'api:notifications.NotificationBitmap');
  t.is(iv, true);

  // If `spec.nodoc` is truthy return `false`
  iv = ro.isVisible({ nodoc: true }, 'test');
  t.is(iv, false);
  // If `spec.nodoc` is falsey return `true`
  iv = ro.isVisible({ nodoc: false }, 'test');
  t.is(iv, true);
});

test('RenderOverride.objectTemplatesFor', (t) => {
  let ro = new RenderOverride({}, featureQuery);
  let otr;

  // If id is special case, return appropriate type
  otr = ro.objectTemplatesFor('api:events.Event');
  t.is(otr, 'H extends (...args: any) => void, C = void, A = void');
  otr = ro.objectTemplatesFor('api:events.Rule');
  t.is(otr, 'C = any, A = any');
  otr = ro.objectTemplatesFor('api:contentSettings.ContentSetting');
  t.is(otr, 'T');
  otr = ro.objectTemplatesFor('api:types.ChromeSetting');
  t.is(otr, 'T');

  // If id is not special case, return nothing
  otr = ro.objectTemplatesFor('');
  t.is(otr, undefined);
});

test('RenderOverride.rewriteEventsToProperties', (t) => {
  let ro = new RenderOverride({}, featureQuery);
  /** @type {any} */
  let retp;

  // If no events return undefined
  retp = ro.rewriteEventsToProperties({}, 'id');
  t.is(retp, undefined);
  retp = ro.rewriteEventsToProperties({ events: [] }, 'id');
  t.is(retp, undefined);

  // Throw error if `options.supportsListeners === false` and no `options.conditions`
  t.throws(() =>
    ro.rewriteEventsToProperties(
      {
        events: [
          {
            ...eventSpec,
            options: { supportsListeners: false, conditions: [] },
          },
        ],
      },
      'id'
    )
  );

  // Throw error if `options.supportsListeners === false` and no `options.actions`
  t.throws(() =>
    ro.rewriteEventsToProperties(
      {
        events: [
          {
            ...eventSpec,
            options: {
              supportsListeners: false,
              conditions: ['a'],
              actions: [],
            },
          },
        ],
      },
      'id'
    )
  );

  // Returns expected object
  retp = ro.rewriteEventsToProperties({ events: [eventSpec] }, validId);
  t.is(!!retp, true);
  t.is(retp._event, true);
  t.is(retp.events, undefined);
  t.deepEqual(Object.keys(retp), ['events', 'properties', '_event']);
  t.deepEqual(Object.keys(retp.properties), ['hi']);
  t.is(retp.properties.hi['$ref'], 'CustomChromeEvent');
  t.is(retp.properties.hi._event, true);
  t.is(retp.properties.hi.name, 'hi');
  t.is(Array.isArray(retp.properties.hi.value), true);
  t.deepEqual(Object.keys(retp.properties.hi), [
    'name',
    '$ref',
    'value',
    '_event',
  ]);
});

test('RenderOverride.typeOverride', (t) => {
  let ro = new RenderOverride({}, featureQuery);
  /** @type {import('../types/chrome.js').TypeSpec|import('../types/chrome.js').NamespaceSpec|undefined} */
  let to;

  // If `rewriteEventsToProperties` is truthy return object
  to = ro.typeOverride({ ...eventSpec, events: [eventSpec] }, validId);
  t.is(to?.constructor, {}.constructor);

  // If `id` is `api:contextMenus` and has `OnClickData` event return `undefined`
  to = ro.typeOverride(
    // @ts-ignore
    { ...eventSpec, types: [{ id: 'OnClickData' }] },
    'api:contextMenus'
  );
  t.is(to, undefined);

  // If `id` is `api:contextMenus` and doesn't have `OnClickData` event return object
  to = ro.typeOverride(
    // @ts-ignore
    { ...eventSpec, types: [{ id: 'NotOnClickData' }] },
    'api:contextMenus'
  );
  t.is(to?.constructor, {}.constructor);

  // If `id` is `api:contextMenus.onClicked` and doesn't have valid `spec.value` return `undefined`
  to = ro.typeOverride(eventSpec, 'api:contextMenus.onClicked');
  t.is(to, undefined);
  to = ro.typeOverride(
    { ...eventSpec, value: 'events' },
    'api:contextMenus.onClicked'
  );
  t.is(to, undefined);
  to = ro.typeOverride(
    { ...eventSpec, value: [null, {}] },
    'api:contextMenus.onClicked'
  );
  t.is(to, undefined);

  // If `id` is `api:contextMenus.onClicked` and has valid `spec.value` return object
  to = ro.typeOverride(
    { ...eventSpec, value: [{}, { $ref: 'ref' }] },
    'api:contextMenus.onClicked'
  );
  t.is(to?.constructor, {}.constructor);

  // If `id` is a special switch case return $ref
  to = ro.typeOverride(eventSpec, 'api:events.Event.addListener.callback');
  // @ts-ignore
  t.is(to.$ref, 'H');
  t.deepEqual(Object.keys(to || {}), ['$ref']);
  to = ro.typeOverride(eventSpec, 'api:events.Event.removeListener.callback');
  // @ts-ignore
  t.is(to.$ref, 'H');
  t.deepEqual(Object.keys(to || {}), ['$ref']);
  to = ro.typeOverride(eventSpec, 'api:events.Event.hasListener.callback');
  // @ts-ignore
  t.is(to.$ref, 'H');
  t.deepEqual(Object.keys(to || {}), ['$ref']);
  to = ro.typeOverride(eventSpec, 'api:events.Event.addRules.rules[]');
  // @ts-ignore
  t.is(to.$ref, 'Rule');
  // @ts-ignore
  t.is(Array.isArray(to.value), true);
  // @ts-ignore
  t.is(to.value.length, 3);
  t.deepEqual(Object.keys(to || {}), ['$ref', 'value']);
  to = ro.typeOverride(eventSpec, 'api:events.Event.addRules.callback.rules[]');
  // @ts-ignore
  t.is(to.$ref, 'Rule');
  // @ts-ignore
  t.is(Array.isArray(to.value), true);
  // @ts-ignore
  t.is(to.value.length, 3);
  t.deepEqual(Object.keys(to || {}), ['$ref', 'value']);
  to = ro.typeOverride(eventSpec, 'api:events.Event.getRules.callback.rules[]');
  // @ts-ignore
  t.is(to.$ref, 'Rule');
  // @ts-ignore
  t.is(Array.isArray(to.value), true);
  // @ts-ignore
  t.is(to.value.length, 3);
  t.deepEqual(Object.keys(to || {}), ['$ref', 'value']);

  // Fix and return bad runtime.Port APIs in older Chrome versions
  to = ro.typeOverride(
    { ...eventSpec, $ref: 'events.Event', value: false },
    'id'
  );
  // @ts-ignore
  t.is(to?.value.length, 2);
  // @ts-ignore
  t.is(Array.isArray(to?.value), true);
  t.is(to?.constructor, {}.constructor);

  // Fix and return bad contextMenusInternal references in older Chrome versions
  to = ro.typeOverride({ ...eventSpec, $ref: 'contextMenusInternal.' }, 'id');
  // // @ts-ignore
  // t.is(to.$ref, `contextMenus.`);
  // t.is(to?.constructor, {}.constructor);
  t.is(to, undefined);

  // Fix and return isInstanceOf usages
  to = ro.typeOverride({ ...eventSpec, isInstanceOf: 'Promise' }, 'id');
  // @ts-ignore
  t.is(to.$ref, `Promise`);
  // @ts-ignore
  t.is(to?.value.length, 2);
  // @ts-ignore
  t.is(Array.isArray(to?.value), true);
  t.deepEqual(Object.keys(to || {}), ['$ref', 'value']);
  t.is(to?.constructor, {}.constructor);

  to = ro.typeOverride({ ...eventSpec, isInstanceOf: 'global' }, 'id');
  // @ts-ignore
  t.is(to.$ref, `Window`);
  t.deepEqual(Object.keys(to || {}), ['$ref']);
  t.is(to?.constructor, {}.constructor);

  // If `spec.type === 'any'` and `id` is a special switch case return $ref
  to = ro.typeOverride(
    { ...eventSpec, type: 'any' },
    'api:events.Rule.conditions[]'
  );
  // @ts-ignore
  t.is(to.$ref, 'C');
  t.deepEqual(Object.keys(to || {}), ['$ref']);

  to = ro.typeOverride(
    { ...eventSpec, type: 'any' },
    'api:events.Rule.actions[]'
  );
  // @ts-ignore
  t.is(to.$ref, 'A');
  t.deepEqual(Object.keys(to || {}), ['$ref']);

  to = ro.typeOverride(
    { ...eventSpec, type: 'any' },
    'api:contentSettings.ContentSetting.get.return.setting'
  );
  // @ts-ignore
  t.is(to.$ref, 'T');
  t.deepEqual(Object.keys(to || {}), ['$ref']);

  to = ro.typeOverride(
    { ...eventSpec, type: 'any' },
    'api:contentSettings.ContentSetting.get.callback.details.setting'
  );
  // @ts-ignore
  t.is(to.$ref, 'T');
  t.deepEqual(Object.keys(to || {}), ['$ref']);

  to = ro.typeOverride(
    { ...eventSpec, type: 'any' },
    'api:types.ChromeSetting.set.details.setting'
  );
  // @ts-ignore
  t.is(to.$ref, 'T');
  t.deepEqual(Object.keys(to || {}), ['$ref']);

  to = ro.typeOverride(
    { ...eventSpec, type: 'any' },
    'api:types.ChromeSetting.onChange.details.value'
  );
  // @ts-ignore
  t.is(to.$ref, 'T');
  t.deepEqual(Object.keys(to || {}), ['$ref']);

  to = ro.typeOverride(
    { ...eventSpec, type: 'any' },
    'api:types.ChromeSetting.get.return.value'
  );
  // @ts-ignore
  t.is(to.$ref, 'T');
  t.deepEqual(Object.keys(to || {}), ['$ref']);

  to = ro.typeOverride(
    { ...eventSpec, type: 'any' },
    'api:types.ChromeSetting.get.callback.details.value'
  );
  // @ts-ignore
  t.is(to.$ref, 'T');
  t.deepEqual(Object.keys(to || {}), ['$ref']);

  to = ro.typeOverride(
    { ...eventSpec, type: 'any' },
    'api:types.ChromeSetting.set.details.value'
  );
  // @ts-ignore
  t.is(to.$ref, 'T');
  t.deepEqual(Object.keys(to || {}), ['$ref']);
});

test('RenderOverride.bestChannelFor', (t) => {
  const ro = new RenderOverride({}, featureQuery);
  let bcf;

  // If no best channel found return `stable`
  bcf = ro.bestChannelFor('api:test');
  t.is(bcf, 'stable');

  // If best channel found return it
  bcf = ro.bestChannelFor('spec');
  t.is(bcf, 'beta');
});

test('RenderOverride.completeTagsFor', (t) => {
  const ro = new RenderOverride({}, featureQuery);
  let ctf;

  // Returns completed tag
  ctf = ro.completeTagsFor({ ...eventSpec, _event: true }, 'api:test');
  t.is(ctf[0].name, 'event');
});

test('RenderOverride.tagsFor', (t) => {
  const ro = new RenderOverride({}, featureQuery);
  let tf;

  // Returns array
  tf = ro.tagsFor(eventSpec, validId);
  t.is(Array.isArray(tf), true);
  tf = ro.tagsFor({ ...eventSpec, _event: true }, validId);
  t.is(Array.isArray(tf), true);
});

test('RenderOverride.rewriteComment', (t) => {
  const ro = new RenderOverride(
    { declarativeContent: { namespace: 'declarativeContent' } },
    featureQuery
  );
  let rc;

  // Returns `undefined` if no rewrite
  rc = ro.rewriteComment('', validId);
  t.is(rc, undefined);
});
