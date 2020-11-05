import { serializeContextSpecificViewContextId } from './viewcontexts.reducer';

describe('Viewcontexts Reducer', () => {
  it('should serialize callParameters in a sorted manner if callParameters are given', () => {
    const viewContextId = 'the_viewcontext';
    const callParameters = { Product: 'TEST', Category: 'Hello@World', Extra: 'foo', Alternative: 'bar' };

    expect(serializeContextSpecificViewContextId(viewContextId, callParameters)).toMatchInlineSnapshot(
      `"the_viewcontext@@Alternative-bar@@Category-Hello@World@@Extra-foo@@Product-TEST"`
    );
  });

  it('should return the viewContextId if empty callParameters are provided', () => {
    const viewContextId = 'the_viewcontext';
    const callParameters = {};

    expect(serializeContextSpecificViewContextId(viewContextId, callParameters)).toMatchInlineSnapshot(
      `"the_viewcontext"`
    );
  });

  it('should return the viewContextId if if no callParameters are provided', () => {
    const viewContextId = 'the_viewcontext';
    const callParameters = undefined;

    expect(serializeContextSpecificViewContextId(viewContextId, callParameters)).toMatchInlineSnapshot(
      `"the_viewcontext"`
    );
  });
});
