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

test('pending shown for added and removed type', (t) => {
  const id = 'api:declarativeNetRequest.MAX_NUMBER_OF_DYNAMIC_RULES';
  const rc = new RenderOverride({}, new FeatureQuery({}), {
    generated: "",
    // Newest release is Chrome 5.
    high: 5,
    low: 1,
    revision: 0,
    symbols: {
      [id]: {
        // But this symbol was last seen in Chrome 2.
        high: 2
      }
    },
  });

  // Check that if we saw this in the source, it would show as Pending (since
  // it will be available again from Chrome 6 onwards).
  t.deepEqual(
    rc.sinceTextFor({ id }, id),
    { since: 'Missing 2 vs 5' }
  );
});
