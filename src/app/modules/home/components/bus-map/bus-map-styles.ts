import { DEFAULT_NODE_SHAPE } from '../../../../core/config/common.config';

export const busMapStyles = [
  {
    selector: 'node',
    style: {
      height: 55,
      width: 55,
      shape: DEFAULT_NODE_SHAPE,
      content: 'data(id)',
      'text-valign': 'center',
      'text-halign': 'center',
      'font-size': '20px',
      'font-weight': 'bold',
      'font-family': 'Libre Baskerville, serif',
      'background-color': 'white',
      'border-width': 2,
      'border-color': 'black'
    }
  },
  {
    selector: 'edge',
    style: {
      'curve-style': 'unbundled-bezier',
      width: 0,
      'line-color': '#9a9a9a',
    }
  },
  {
    selector: '.highlighted-edge',
    style: {
      'z-index': 10,
      width: 13,
      'background-color': 'data(color)',
      'line-color': 'data(color)',
      'transition-property': 'background-color, line-color, width',
      'transition-timing-function': 'ease-in',
      'transition-duration': '0.6s'
    }
  },
  {
    selector: '.highlighted-node',
    style: {
      height: 'data(size)',
      width: 'data(size)',
      'font-size': ele => ele.data('size') / 2,
      // padding: '7px',
      'font-weight': 'bold',
      'background-color': 'data(color)',
      'line-color': 'black',
      'border-width': 'data(border)',
      'text-valign': 'center',
      'text-halign': 'center',
      shape: 'data(shape)' as any,
      'transition-property': 'background-color, width, height, font-size',
      'transition-duration': '0.2s'
    }
  }
];
