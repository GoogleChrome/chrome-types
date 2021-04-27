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


import * as model from './model.js';


const anyType = new model.PrimitiveType('any');


/**
 * @param {model.Type} type
 * @return {model.RefType}
 */
const assertIsEvent = (type) => {
  if (!(type instanceof model.RefType) || type.name !== 'events.Event') {
    throw new Error(`expected ref to event.Events`);
  }
  return type;
};


/**
 * @param {{[name: string]: model.Namespace}} all
 */
export function parseOverride(all) {
  // TODO(samthor): This can probably be removed now as it's fixed upstream.
  const contextMenus = all['contextMenus'];
  if (contextMenus) {
    const update = all['contextMenusInternal']?.all['OnClickData'].clone();
    if (update) {
      update.nodoc = false;
      contextMenus.all['OnClickData'] = contextMenus.all['OnClickData'] ?? update;
    }
  }
}


/**
 * @param {string} path
 * @param {model.Property} prop
 * @return {model.Type=}
 */
export function propertyOverride(path, prop) {
  switch (path) {

    // We extend event.Events to accept three template types:
    //   - H: the function handler
    //   - C: conditions allowed for declarative events
    //   - A: actions allowed for declarative events
    case 'events.Event':
      if (!(prop.type instanceof model.ObjectType) || !prop.isType) {
        throw new Error(`${path} was not expected object type`);
      }
      prop.type.templates = [
        new model.Property(model.requiredTemplateType, 'H'),
        new model.Property(model.voidType, 'C'),
        new model.Property(model.voidType, 'A'),
      ];
      return;

    case 'events.Event.addListener.callback':
    case 'events.Event.removeListener.callback':
    case 'events.Event.hasListener.callback':
      return new model.RefType('H');

    // These are settings types which allow a specific type of setting.
    case 'types.ChromeSetting':
    case 'contentSettings.ContentSetting':
      if (!(prop.type instanceof model.ObjectType) || !prop.isType) {
        throw new Error(`${path} was not expected object type`);
      }
      prop.type.templates = [
        new model.Property(model.requiredTemplateType, 'T'),
      ];
      return;

    // Part of Declarative Events. Allows conditions/actions as per event.Events.
    case 'events.Rule':
      if (!(prop.type instanceof model.ObjectType) || !prop.isType) {
        throw new Error(`${path} was not expected object type`);
      }
      prop.type.templates = [
        new model.Property(anyType, 'C'),
        new model.Property(anyType, 'A'),
      ];
      return;

    case 'events.Rule.conditions':
      if (!(prop.type instanceof model.SequenceType)) {
        throw new Error(`was not expected array type`)
      }
      return new model.SequenceType(new model.RefType('C'));

    case 'events.Rule.actions':
      if (!(prop.type instanceof model.SequenceType)) {
        throw new Error(`was not expected array type`)
      }
      return new model.SequenceType(new model.RefType('A'));

    case 'runtime.Port.onDisconnect':
    case 'runtime.Port.onMessage': {
      const eventType = assertIsEvent(prop.type);

      // HACK: These are documented but not actually in the definition.
      const parameters = [
        new model.Property(new model.RefType('Port'), 'port'),
      ];
      if (path === 'runtime.Port.onMessage') {
        parameters.unshift(new model.Property(anyType, 'message'));
      }

      eventType.templates = [
        new model.FunctionType(parameters),
      ];
      return;
    }

    // This is a "$ref" to the contextMenusInternal type. Just replace it here (probably a bug).
    case 'contextMenus.onClicked': {
      const eventType = assertIsEvent(prop.type);

      const parameters = [
        new model.Property(new model.RefType('OnClickData', true), 'info'),
        new model.Property(new model.RefType('tabs.Tab', true), 'tab'),
      ];
      parameters[1].optional = true;

      eventType.templates = [
        new model.FunctionType(parameters),
      ];
      return;
    }
  }

  if (path.startsWith('events.Event.') &&
      prop.type instanceof model.SequenceType &&
      prop.type.itemType instanceof model.RefType &&
      prop.type.itemType.name === 'Rule') {
    prop.type.itemType.templates = [
      new model.RefType('C', true),
      new model.RefType('A', true),
    ];
  }

  if (prop.type instanceof model.PrimitiveType && prop.type.primitiveType === 'any') {
    if (path.startsWith('contentSettings.ContentSetting.') ||
        path.startsWith('types.ChromeSetting.')) {
      return new model.RefType('T');
    }
  }

  // Catches some invalid top-level type refs.
  if (prop.type instanceof model.RefType) {
    if (prop.type.name === 'contextMenusInternal.OnClickData') {
      if (path.startsWith('contextMenus.')) {
        return new model.RefType('OnClickData', true);
      }
      return new model.RefType('contextMenus.OnClickData', true);
    }

    if (prop.type.name === 'Promise' && prop.type.templates.length === 0) {
      prop.type.templates = [anyType];
    }

    if (prop.type.name === 'global') {
      return new model.RefType('Window');
    }
  }

  return;
}
