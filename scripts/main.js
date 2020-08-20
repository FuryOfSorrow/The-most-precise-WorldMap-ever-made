var globalObj = {
	initted: false,
	canvas: undefined,
	init: function() {
		this.initted = true;

		svgLayoutObj.init();
		runesObject.init();
	}
};

window.addEventListener('load', globalObj.init.bind(globalObj));