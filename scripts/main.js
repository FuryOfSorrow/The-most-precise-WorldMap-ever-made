var globalObj = {
	initted: false,
	canvas: undefined,
	init: function() {
		this.initted = true;

		mapModal.init();
		svgLayoutObj.init();
		capitalsObject.init();
	}
};

window.addEventListener('load', globalObj.init.bind(globalObj));