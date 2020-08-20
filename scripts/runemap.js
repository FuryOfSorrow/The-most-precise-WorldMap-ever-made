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
			console.log(x,y,z);

			if (x) {
				if (this.prev.x === undefined)
					this.prev.x = x;
				/* this.x = this.prev.x + x * this.z; */
				this.x = -this.prev.x + x;
			}

			if (y) {
				if (this.prev.y === undefined)
					this.prev.y = y;
				/* this.y = this.prev.y + y * this.z; */
				this.y = -this.prev.y + y;
			}

			if (z) {
				this.z = this.z + z;

				if (this.z > 5)
					this.z = 5;
				else if (this.z < 1)
					this.z = 1;
			}

			console.log(this.x);

			svgLayoutObj.htmlEl.style.transform = `matrix(${this.z}, 0, 0, ${this.z}, ${this.x}, ${this.y})`;
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

		this.offsets.rewriteCoords(0, 0, 1);




		function setCoords(e) {
			if (svgLayoutObj.mouse.leftBtnHeld) {
				/* console.log('setting new coords:');*/
				console.log(e);

				this.offsets.rewriteCoords(e.offsetX, e.offsetY, null);
			}
		}
	}
};

runesObject = {
	runes: [],
	init: function() {
		let runeObj = {
			id: '1',
			selector: document.getElementById('item-1')
		};
		this.runes.push(runeObj);

		runeObj = {
			id: '10',
			selector: document.getElementById('item-10')
		};
		this.runes.push(runeObj);




		console.log(this);




		for (let i = 0; i < this.runes.length; i++) {
			this.runes[i].selector.addEventListener('click', setRuneClickEvent);
		}


		function setRuneClickEvent() {
			console.log(this);
		}
	}
};