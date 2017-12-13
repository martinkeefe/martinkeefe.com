import Group from './group'
import Rect from './rect'
import Text from './text'

const OPTS = {height: 20, width: 100, hilite: '#CC8', dark: '#555', lite: '#CCC', font: '10pt Arial', min: 0, max: 1};

export default class HSlide extends Group {
	constructor(context, args) {
        super(context, args);
		this.value = this.get(args[2], 0);
        const cfg = Object.assign({}, OPTS, this.get(args[3], {}));

		const ctrl  = this.add(Rect, 0,0, cfg.width, cfg.height);
		const box   = this.add(Rect, 2,2, cfg.width-4, cfg.height-4, {fill: cfg.dark});
		const slide = this.add(Rect, 4,4, (cfg.width-8) * this.value, cfg.height-8, {fill: cfg.hilite});

		ctrl.on('hover', on => {
	    	ctrl.style.stroke = on ? cfg.dark : null;
		});

		ctrl.on('mousedown', (x, y) => {
			this.value = Math.max(0, Math.min(1, (x-this.x)/cfg.width));
			slide.w = (cfg.width-8) * this.value;
		});

		ctrl.on('drag', (dragging, x, y) => {
			if (dragging) {
				this.value = Math.max(0, Math.min(1, (x-this.x)/cfg.width));
				slide.w = (cfg.width-8) * this.value;
	    	}
		});
    }
}
