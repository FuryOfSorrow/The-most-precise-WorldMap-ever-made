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
		minimalScale: 1,
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
				else if (this.z <= this.minimalScale)
					this.z = this.minimalScale;

				var de = document.documentElement;
				var xTrans = (de.clientWidth * this.z - de.clientWidth) / 2;
				var yTrans = (de.clientHeight * this.z - de.clientHeight) / 2;

				document.body.style.transform = `matrix(${this.z}, 0, 0, ${this.z}, ${xTrans}, ${yTrans})`;
			}

			window.scrollTo(this.x, this.y);

			setTimeout(() => {
				mapModal.htmlEl.style.transform = `matrix(${1 / this.z}, 0, 0, ${1 / this.z}, ${window.pageXOffset / this.z}, ${window.pageYOffset / this.z})`;
			}, 0);
		}
	},
	init: function() {
		this.initted = true;
		this.htmlEl = document.getElementById('layout');
		this.setCanvas();
	},
	setCanvas: function() {
		var map = this.htmlEl;

		map.addEventListener('mousedown', (e) => {
			svgLayoutObj.mouse.leftBtnHeld = true;
		});
		map.addEventListener('mouseup', (e) => {
			svgLayoutObj.mouse.leftBtnHeld = false;
			svgLayoutObj.offsets.prev.x = undefined;
			svgLayoutObj.offsets.prev.y = undefined;
		});
		map.addEventListener('mousemove', (e) => {
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
			if (svgLayoutObj.mouse.leftBtnHeld)
				this.offsets.rewriteCoords(e.clientX, e.clientY, null);
		}
	}
};

var capitalsObject = {
	cities: [],
	citiesLayer: undefined,
	init: function() {
		this.setMap();

		var matchInDataArr;
		for (var i = 0; i < this.citiesLayer.children.length; i++) {
			this.citiesLayer.children[i].classList.add('uninitialized');

			matchInDataArr = data.find((el) => {
				if (el.id === this.citiesLayer.children[i].id)
					return el;
			});

			if (matchInDataArr)
				createCityInCollection(matchInDataArr, this.citiesLayer.children[i]);
		}

		function createCityInCollection(matchedObj, domSelector) {
			var City = {
				constructor: function(selector, name, country, population) {
					this.domElem = selector;
					this.name = name;
					this.country = country;
					this.population = population;
	
					return this;
				},
				showText: function() {
					var caption = 'You have clicked on ' + this.name + ', the capital of ' + this.country + '.\nIt has population of ' + this.population + ' citizens.';
					mapModal.show(caption);
					return;
				}
			};

			var city = Object.create(City).constructor(
				domSelector,
				matchedObj.name,
				matchedObj.country,
				matchedObj.population
			);

			city.domElem.classList.remove('uninitialized');
			city.domElem.classList.add('normal');
			city.domElem.addEventListener('click', function() {
				city.showText();
			});

			capitalsObject.cities.push(city);
		}
	},
	setMap: function() {
		console.log('Map is set');
		this.citiesLayer = document.getElementById('capitals');
	}
};


var mapModal = {
	active: false,
	htmlEl: undefined,
	init: function() {
		this.htmlEl = document.getElementById('map-modal');
		var closeBtn = document.getElementById('close-modal-btn');

		closeBtn.addEventListener('click', () => {
			this.hide();
		});
	},
	show: function(txt) {
		this.active = true;
		this.htmlEl.classList.add('active');
		this.htmlEl.querySelector('#caption').textContent = txt;
	},
	hide: function() {
		this.active = false;
		this.htmlEl.classList.remove('active');
	}
};


var data = [
	{
		id: 'moscow',
		name: 'Moscow',
		country: 'Russia',
		population: 11925525
	},
	{
		id: 'jerusalem',
		name: 'Jerusalem',
		country: 'Israel',
		population: 874186
	},
	{
		id: 'tokyo',
		name: 'Tokyo',
		country: 'Japan',
		population: 9273938
	},
	{
		id: 'beijing',
		name: 'Beijing',
		country: 'China',
		population: 21543267
	},
	{
		id: 'paris',
		name: 'Paris',
		country: 'France',
		population: 2148925
	},
	{
		id: 'berlin',
		name: 'Berlin',
		country: 'Germany',
		population: 3769954
	},
	{
		id: 'washington',
		name: 'Washington City',
		country: 'United States of America',
		population: 705749
	},
	{
		id: 'mexico',
		name: 'Mexico City',
		country: 'Mexico',
		population: 21398267
	}
];