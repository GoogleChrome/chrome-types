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

test('chrome-install-location tag is added', (t) => {
  const rc = new RenderOverride({}, new FeatureQuery({'api:sidePanel.setPanelBehavior': { location: 'policy' }}), {
    generated: "",
    high: 2,
    low: 1,
    revision: 0,
    symbols: {
      'api:sidePanel.setPanelBehavior': {
        high: 2
      }
    }
  });

  t.deepEqual(
    rc.completeTagsFor({ id: 'api:sidePanel.setPanelBehavior' }, 'api:sidePanel.setPanelBehavior'),
    [{ name: 'chrome-install-location', value: 'policy' }]
  );
});
