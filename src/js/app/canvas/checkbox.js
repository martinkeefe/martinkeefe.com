import Group from './group'
import Rect from './rect'
import Text from './text'

var OPTS = {height: 20, width: 100, hilite: '#CC8', dark: '#555', lite: '#CCC', font: '10pt Arial'};

export default class Checkbox extends Group {
	constructor(context, args) {
        super(context, args);
        this.text = this.get(args[2], '');
		this._val = false;

        const cfg  = Object.assign({}, OPTS, this.get(args[3], {}));
		const ctrl = this.add(Rect, 0,0, cfg.width, cfg.height);
		const box  = this.add(Rect, 2,2, cfg.height-4, cfg.height-4, {fill: cfg.dark});
		const chk  = this.add(Rect, 5,5, cfg.height-10, cfg.height-10);
		this.add(Text, cfg.height+2, cfg.height-5, this.text, {fill: cfg.lite, font: cfg.font})

		ctrl.on('click', () => {
			var val = !this.value;
	    	chk.style.fill = val ? cfg.hilite : null;
			this.value = val;
		});

		ctrl.on('hover', on => {
	    	ctrl.style.stroke = on ? cfg.dark : null;
		});
    }

	get value() {return this._val}

	set value(value) {
		if (value !== this._val) {
			this._val = value;
	    	this.emit('change', value);
		}
	}
}
