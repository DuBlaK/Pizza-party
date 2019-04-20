let btn = document.getElementById("load-btn");
let app = document.getElementById("app");

btn.addEventListener("click", () => {
	fetch("https://gp-js-test.herokuapp.com/pizza")
		.then(response => {
			if(response.ok){
				app.innerHTML = ""
				btn.classList.remove("loading")
				return response.json()
			}
		})
		.then(data => numberOfParticipants(data))
	app.innerHTML = `<p>waiting...</p>`
	btn.classList.add("loading")
});

function numberOfParticipants(data){
	let eaters = data.party.filter( obj => obj.eatsPizza )
	app.textContent = `The number of party participants: ${data.party.length}. Pizza eaters: ${eaters.length}`;
	showPizzaSlice(eaters);
}

function showPizzaSlice(slices){
	let sliceWrapper  = document.querySelector('#app #slice-wrapper');
	if (sliceWrapper) {
		sliceWrapper.remove();
	}
	sliceWrapper = document.createElement("ul");
	sliceWrapper.id = 'slice-wrapper';
	app.appendChild(sliceWrapper);

	const segmentation = 360/slices.length;
	let rotate = segmentation;
	const skew = (360/slices.length)+90;
	
	slices.map( () => {
		let liElem = document.createElement('li');
		liElem.style.cssText = `transform: rotate(${rotate}deg) skewY(${skew}deg); border: 1px solid grey;`
		let divElem = document.createElement('div');
		divElem.classList.add('slice');
		divElem.style.cssText = `background: white`;
		liElem.appendChild(divElem);
		sliceWrapper.appendChild(liElem);
		rotate += segmentation;
	})
}  