import test from 'ava';
import { RenderOverride } from '../../tools/override.js';
import { FeatureQuery } from '../../tools/lib/feature-query.js';

test('setPanelBehavior is visible', t => {
  const rc = new RenderOverride({}, new FeatureQuery({}), {
    generated: "",
    high: 2,
    low: 1,
    revision: 0,
    symbols: {}
  });

  t.assert(rc.isVisible({ nodoc: true }, 'api:sidePanel.setPanelBehavior'));
});
