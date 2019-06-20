const searchForm = document.querySelector("#searchform");
const movie = document.querySelector("#movies");


function apiSearch(event){
	event.preventDefault();
	const searchText = searchForm.querySelector("#searchText").value, 
	server = "https://api.themoviedb.org/3/search/multi?api_key=bbe6ec69f82d143a332ccce50dbd14e8&language=en-US&query=" + searchText;
	

	movie.innerHTML = "Loading";

	fetch(server)
		.then(function(value){
			return value.json();
		})
		.then(function(output){
			let inner = "";
			output.results.forEach(function(item){
			let nameItem = item.name || item.title;
			inner += `<div class="col-12 col-md-4 col-sm-3 col-xl-3">${nameItem}</div>`; 
			});
			movie.innerHTML = inner; 
		})
		.catch(function(err){
			movie.innerHTML = "Something wrong";
			console.log('error: '+ err.status);
		});
}

searchForm.addEventListener("submit", apiSearch);
