var globalObj = {
	initted: false,
	canvas: undefined,
	init: function() {
		this.initted = true;

		runemapModal.init();
		svgLayoutObj.init();
		runesObject.init();
	}
};

var userData = {
	lang: 'ru',
	runesUnlocked: {
		basic: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
		strong: [],
		great: [],
		godly: []
	},
	runesLocked: {
		basic: [],
		strong: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
		great: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
		godly: [55, 56, 57, 58, 59, 60, 61, 62, 63]
	}
}

window.addEventListener('load', globalObj.init.bind(globalObj));