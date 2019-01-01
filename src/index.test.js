var expect = require('chai').expect;
var naturalSort = require('./index');

describe('different-values-types', () => {
  it('number always comes first', () => {
    let input = ['a', 1];
    let output = [1, 'a'];
    expect(input.sort(naturalSort)).eql(output);
  });

  it('number vs numeric string - should remain unchanged', () => {
    let input = ['1', 1];
    let output = ['1', 1];
    expect(input.sort(naturalSort)).eql(output);
  });

  it('padding numeric string vs number', () => {
    let input = ['02', 3, 2, '01'];
    let output = ['01', '02', 2, 3];
    expect(input.sort(naturalSort)).eql(output);
  });
});

describe('version number strings', () => {
  it('close version numbers', () => {
    let input = ['1.0.2', '1.0.1', '1.0.0', '1.0.9'];
    let output = ['1.0.0', '1.0.1', '1.0.2', '1.0.9'];
    expect(input.sort(naturalSort)).eql(output);
  });

  it('multi-digit branch release', () => {
    let input = ['1.0.03', '1.0.003', '1.0.002', '1.0.0001'];
    let output = ['1.0.0001', '1.0.002', '1.0.003', '1.0.03'];
    expect(input.sort(naturalSort)).eql(output);
  });

  it('close version numbers', () => {
    let input = [
      '1.1beta',
      '1.1.2alpha3',
      '1.0.2alpha3',
      '1.0.2alpha1',
      '1.0.1alpha4',
      '2.1.2',
      '2.1.1',
    ];
    let output = [
      '1.0.1alpha4',
      '1.0.2alpha1',
      '1.0.2alpha3',
      '1.1.2alpha3',
      '1.1beta',
      '2.1.1',
      '2.1.2',
    ];

    expect(input.sort(naturalSort)).eql(output);
  });

  it('string first', () => {
    let input = [
      'myrelease-1.1.3',
      'myrelease-1.2.3',
      'myrelease-1.1.4',
      'myrelease-1.1.1',
      'myrelease-1.0.5',
    ];
    let output = [
      'myrelease-1.0.5',
      'myrelease-1.1.1',
      'myrelease-1.1.3',
      'myrelease-1.1.4',
      'myrelease-1.2.3',
    ];

    expect(input.sort(naturalSort)).eql(output);
  });
});

describe('numerics', () => {
  it('string vs number', () => {
    let input = ['0001', '002', '001'];
    let output = ['0001', '001', '002'];
    expect(input.sort(naturalSort)).eql(output);
  });

  it('decimal string vs decimal, different precision', () => {
    let input = [2, 1, '1', '0001', '002', '02', '001'];
    let output = ['0001', '001', '002', '02', 1, '1', 2];
    expect(input.sort(naturalSort)).eql(output);
  });

  it('decimal string vs decimal, same precision', () => {
    let input = ['10.04', 10.02, 10.03, '10.01'];
    let output = ['10.01', 10.02, 10.03, '10.04'];

    expect(input.sort(naturalSort)).eql(output);
  });
});
