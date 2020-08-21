var svgLayoutObj = {
	initted: false,
	htmlEl: undefined,
	mouse: {
		leftBtnHeld: false,
		rightBtnHeld: false,
	},
	offsets: {
		x: 0,
		y: 0,
		z: 1,
		prev: {
			x: undefined,
			y: undefined
		},
		rewriteCoords: function(x, y, z) {
			if (x) {
				if (this.prev.x === undefined)
					this.prev.x = x + window.pageXOffset / this.z;
				this.x = parseInt((this.prev.x - x) * this.z);
			}

			if (y) {
				if (this.prev.y === undefined)
					this.prev.y = y + window.pageYOffset / this.z;
				this.y = parseInt((this.prev.y - y) * this.z);
			}

			if (z !== null) {
				this.z = this.z + z;

				if (this.z >= 5)
					this.z = 5;
				else if (this.z <= 1)
					this.z = 1;

				let de = document.documentElement;
				let xTrans = (de.clientWidth * this.z - de.clientWidth) / 2;
				let yTrans = (de.clientHeight * this.z - de.clientHeight) / 2;

				document.body.style.transform = `matrix(${this.z}, 0, 0, ${this.z}, ${xTrans}, ${yTrans})`;
			}

			window.scrollTo(this.x, this.y);
			setTimeout(() => {
				//console.log(window.pageXOffset, window.pageYOffset);
				runemapModal.htmlEl.style.transform = `matrix(${1 / this.z}, 0, 0, ${1 / this.z}, ${window.pageXOffset / this.z}, ${window.pageYOffset / this.z})`;
			}, 0);
		}
	},
	init: function() {
		this.initted = true;
		this.htmlEl = document.getElementById('layout');
		this.setCanvas();
	},
	setCanvas: function() {
		let runemap = this.htmlEl;

		runemap.addEventListener('mousedown', (e) => {
			svgLayoutObj.mouse.leftBtnHeld = true;
		});
		runemap.addEventListener('mouseup', (e) => {
			svgLayoutObj.mouse.leftBtnHeld = false;
			svgLayoutObj.offsets.prev.x = undefined;
			svgLayoutObj.offsets.prev.y = undefined;
		});
		runemap.addEventListener('mousemove', (e) => {
			setCoords.call(this, e);
		});

		window.addEventListener('wheel', (e) => {
			if (e.wheelDelta >= 0)
				this.offsets.rewriteCoords(null, null, 0.2);
			else
				this.offsets.rewriteCoords(null, null, -0.2);
		});
		window.addEventListener('scroll', (e) => {
			e.preventDefault();
		});
		window.addEventListener('resize', (e) => {
			this.offsets.rewriteCoords(0, 0, 0);
		});

		this.offsets.rewriteCoords(0, 0, 0);


		function setCoords(e) {
			if (svgLayoutObj.mouse.leftBtnHeld) {
				/* console.log(e); */
				this.offsets.rewriteCoords(e.clientX, e.clientY, null);
			}
		}
	}
};

var runesObject = {
	runes: [],
	init: function() {
		this.setRunemap();

		let runeObj = {
			id: 1,
			name: {
				ru: 'Крестьянин',
				en: 'Peasant'
			},
			rarity: 1,
			selector: document.getElementById('rune-1')
		};
		this.runes.push(runeObj);
		runeObj = {
			id: 10,
			name: {
				ru: 'Гоблин',
				en: 'Goblin'
			},
			rarity: 2,
			selector: document.getElementById('rune-10')
		};
		this.runes.push(runeObj);

		for (let i = 0; i < this.runes.length; i++) {
			this.runes[i].selector.addEventListener('click', () => {
				runeClicked(this.runes[i]);
			});
		}


		function runeClicked(rune) {
			//если руна открыта
			console.log(this);
			runemapModal.show();

			setRuneNameBlock(rune.name[userData.lang]);


			function setRuneNameBlock(val) {
				runemapModal.htmlEl.querySelector('.leftpart .runename-block').innerHTML = val;
			}
		}
	},
	setRunemap: function() {
		console.log('Runemap is set');
	}
};


var runemapModal = {
	active: false,
	htmlEl: undefined,
	init: function() {
		this.htmlEl = document.getElementById('runemap-modal');
		let closeBtn = document.getElementById('close-modal-btn');

		closeBtn.addEventListener('click', () => {
			this.hide();
		});
	},
	show: function() {
		this.active = true;
		this.htmlEl.classList.add('active');
	},
	hide: function() {
		this.active = false;
		this.htmlEl.classList.remove('active');
	}
};