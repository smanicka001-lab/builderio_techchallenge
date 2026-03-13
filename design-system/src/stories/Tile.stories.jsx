import { Tile, ClickableTile, SelectableTile, ExpandableTile, TileAboveTheFoldContent, TileBelowTheFoldContent } from '@carbon/react';

export default {
  title: 'Carbon/Tile',
  component: Tile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <Tile style={{ width: '300px', padding: '1rem' }}>
      <h4 style={{ marginBottom: '0.5rem' }}>Default Tile</h4>
      <p>This is a simple, non-interactive tile that displays information.</p>
    </Tile>
  ),
};

export const Clickable = {
  render: () => (
    <ClickableTile
      href="#"
      style={{ width: '300px', padding: '1rem' }}
    >
      <h4 style={{ marginBottom: '0.5rem' }}>Clickable Tile</h4>
      <p>Click this tile to navigate or trigger an action.</p>
    </ClickableTile>
  ),
};

export const Selectable = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <SelectableTile
        id="selectable-tile-1"
        name="tiles"
        value="tile-1"
        style={{ width: '200px', padding: '1rem' }}
      >
        <h4 style={{ marginBottom: '0.5rem' }}>Option 1</h4>
        <p>Select this option</p>
      </SelectableTile>
      <SelectableTile
        id="selectable-tile-2"
        name="tiles"
        value="tile-2"
        style={{ width: '200px', padding: '1rem' }}
      >
        <h4 style={{ marginBottom: '0.5rem' }}>Option 2</h4>
        <p>Or select this one</p>
      </SelectableTile>
    </div>
  ),
};

export const Expandable = {
  render: () => (
    <ExpandableTile
      tileCollapsedIconText="Expand"
      tileExpandedIconText="Collapse"
      style={{ width: '400px' }}
    >
      <TileAboveTheFoldContent>
        <h4 style={{ marginBottom: '0.5rem' }}>Expandable Tile</h4>
        <p>Click to see more content</p>
      </TileAboveTheFoldContent>
      <TileBelowTheFoldContent>
        <h5 style={{ marginBottom: '0.5rem', marginTop: '1rem' }}>Additional Details</h5>
        <p>
          This content is revealed when the tile is expanded. You can include
          more detailed information, images, or other components here.
        </p>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          <li>Feature one</li>
          <li>Feature two</li>
          <li>Feature three</li>
        </ul>
      </TileBelowTheFoldContent>
    </ExpandableTile>
  ),
};

export const MultipleDefaultTiles = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', width: '700px' }}>
      <Tile style={{ padding: '1rem' }}>
        <h4 style={{ marginBottom: '0.5rem' }}>Card 1</h4>
        <p>Information card</p>
      </Tile>
      <Tile style={{ padding: '1rem' }}>
        <h4 style={{ marginBottom: '0.5rem' }}>Card 2</h4>
        <p>Information card</p>
      </Tile>
      <Tile style={{ padding: '1rem' }}>
        <h4 style={{ marginBottom: '0.5rem' }}>Card 3</h4>
        <p>Information card</p>
      </Tile>
    </div>
  ),
};
