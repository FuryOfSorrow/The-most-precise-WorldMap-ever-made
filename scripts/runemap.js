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

			if (z) {
				this.z = this.z + z;

				if (this.z >= 5)
					this.z = 5;
				else if (this.z <= 1)
					this.z = 1;

				let de = document.documentElement;
				/* console.log(de.clientWidth, de.clientHeight); */
				document.body.style.transform = `matrix(${this.z}, 0, 0, ${this.z}, ${(de.clientWidth * this.z - de.clientWidth) / 2}, ${(de.clientHeight * this.z - de.clientHeight) / 2})`;
			}

			/* console.log(this.x, this.y); */
			window.scrollTo(this.x, this.y);
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

		this.offsets.rewriteCoords(0, 0, 0);

		/* runemap.addEventListener('click', (e)=> {
			console.log('Coords:\n',e.clientX, e.clientY);
			console.log('Runemap scrolled:\n',window.pageXOffset, window.pageYOffset);
		}); */


		function setCoords(e) {
			if (svgLayoutObj.mouse.leftBtnHeld) {
				/* console.log(e); */
				this.offsets.rewriteCoords(e.clientX, e.clientY, null);
			}
		}
	}
};

runesObject = {
	runes: [],
	init: function() {
		/*
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
		*/
		let runeObj = {
			id: '1',
			selector: document.getElementById('rune-1')
		};
		this.runes.push(runeObj);
		runeObj = {
			id: '10',
			selector: document.getElementById('rune-10')
		};
		this.runes.push(runeObj);

		for (let i = 0; i < this.runes.length; i++) {
			this.runes[i].selector.addEventListener('click', setRuneClickEvent);
		}


		function setRuneClickEvent() {
			console.log(this);
		}
	}
};