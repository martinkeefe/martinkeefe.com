
import Events from '../events'

export default class Base extends Events {
	constructor(context,args) {
		super();
        this.context = context;
        this.x = this.get(args[0], 0);
        this.y = this.get(args[1], 0);

        this.style = {};
        var last_arg = args[args.length-1];
        if (typeof last_arg === 'object' && !Array.isArray(last_arg)) {
        	this.style = last_arg;
        }
	}

	apply_style() {
		Object.keys(this.style).forEach(function(key) {
			if (key === 'lineDash') {
				this.context.setlineDash(this.style.lineDash);
			} else if (key === 'fill' || key === 'stroke') {
				this.context[key+'Style'] = this.style[key];
			} else {
				this.context[key] = this.style[key];
			}
		}, this);
	}

	get(val, def) {
		return val !== undefined ? val : def;
	}
}
