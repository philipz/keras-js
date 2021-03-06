describe('pooling layer: MaxPooling3D', function() {
  const assert = chai.assert;
  const styles = testGlobals.styles;
  const logTime = testGlobals.logTime;
  const stringifyCondensed = testGlobals.stringifyCondensed;
  const approxEquals = KerasJS.testUtils.approxEquals;
  const layers = KerasJS.layers;

  const testParams = [
    {
      inputShape: [ 4, 4, 4, 2 ],
      attrs: {
        poolSize: [ 2, 2, 2 ],
        strides: null,
        borderMode: 'valid',
        dimOrdering: 'tf'
      }
    },
    {
      inputShape: [ 4, 4, 4, 2 ],
      attrs: {
        poolSize: [ 2, 2, 2 ],
        strides: [ 1, 1, 1 ],
        borderMode: 'valid',
        dimOrdering: 'tf'
      }
    },
    {
      inputShape: [ 4, 5, 2, 3 ],
      attrs: {
        poolSize: [ 2, 2, 2 ],
        strides: [ 2, 1, 1 ],
        borderMode: 'valid',
        dimOrdering: 'tf'
      }
    },
    {
      inputShape: [ 4, 4, 4, 2 ],
      attrs: {
        poolSize: [ 3, 3, 3 ],
        strides: null,
        borderMode: 'valid',
        dimOrdering: 'tf'
      }
    },
    {
      inputShape: [ 4, 4, 4, 2 ],
      attrs: {
        poolSize: [ 3, 3, 3 ],
        strides: [ 3, 3, 3 ],
        borderMode: 'valid',
        dimOrdering: 'tf'
      }
    },
    {
      inputShape: [ 4, 4, 4, 2 ],
      attrs: {
        poolSize: [ 2, 2, 2 ],
        strides: null,
        borderMode: 'same',
        dimOrdering: 'tf'
      }
    },
    {
      inputShape: [ 4, 4, 4, 2 ],
      attrs: {
        poolSize: [ 2, 2, 2 ],
        strides: [ 1, 1, 1 ],
        borderMode: 'same',
        dimOrdering: 'tf'
      }
    },
    {
      inputShape: [ 4, 5, 4, 2 ],
      attrs: {
        poolSize: [ 2, 2, 2 ],
        strides: [ 1, 2, 1 ],
        borderMode: 'same',
        dimOrdering: 'tf'
      }
    },
    {
      inputShape: [ 4, 4, 4, 2 ],
      attrs: {
        poolSize: [ 3, 3, 3 ],
        strides: null,
        borderMode: 'same',
        dimOrdering: 'tf'
      }
    },
    {
      inputShape: [ 4, 4, 4, 2 ],
      attrs: {
        poolSize: [ 3, 3, 3 ],
        strides: [ 3, 3, 3 ],
        borderMode: 'same',
        dimOrdering: 'tf'
      }
    },
    {
      inputShape: [ 2, 3, 3, 4 ],
      attrs: {
        poolSize: [ 3, 3, 3 ],
        strides: [ 2, 2, 2 ],
        borderMode: 'valid',
        dimOrdering: 'th'
      }
    },
    {
      inputShape: [ 2, 3, 3, 4 ],
      attrs: {
        poolSize: [ 3, 3, 3 ],
        strides: [ 1, 1, 1 ],
        borderMode: 'same',
        dimOrdering: 'th'
      }
    },
    {
      inputShape: [ 3, 4, 4, 3 ],
      attrs: {
        poolSize: [ 2, 2, 2 ],
        strides: null,
        borderMode: 'valid',
        dimOrdering: 'th'
      }
    }
  ];

  before(function() {
    console.log('\n%cpooling layer: MaxPooling3D', styles.h1);
  });

  testParams.forEach(({ inputShape, attrs }, i) => {
    const key = `pooling.MaxPooling3D.${i}`;
    const [ inputDim1, inputDim2, inputDim3, inputChannels ] = inputShape;
    const title = `[${key}] test: ${inputDim1}x${inputDim2}x${inputDim3}x${inputChannels} input, poolSize='${attrs.poolSize}', strides=${attrs.strides}, borderMode=${attrs.borderMode}, dimOrdering=${attrs.dimOrdering}`;

    it(title, function() {
      console.log(`\n%c${title}`, styles.h3);
      let testLayer = new layers.MaxPooling3D(attrs);
      let t = new KerasJS.Tensor(
        TEST_DATA[key].input.data,
        TEST_DATA[key].input.shape
      );
      console.log('%cin', styles.h4, stringifyCondensed(t.tensor));
      const startTime = performance.now();
      t = testLayer.call(t);
      const endTime = performance.now();
      console.log('%cout', styles.h4, stringifyCondensed(t.tensor));
      logTime(startTime, endTime);
      const dataExpected = new Float32Array(TEST_DATA[key].expected.data);
      const shapeExpected = TEST_DATA[key].expected.shape;
      assert.deepEqual(t.tensor.shape, shapeExpected);
      assert.isTrue(approxEquals(t.tensor, dataExpected));
    });
  });
});
