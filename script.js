const searchForm = document.querySelector("#searchform");
const movie = document.querySelector("#movies");


function apiSearch(event){
	event.preventDefault();
	const searchText = searchForm.querySelector("#searchText").value, 
	server = "https://api.themoviedb.org/3/search/multi?api_key=bbe6ec69f82d143a332ccce50dbd14e8&language=en-US&query=" + searchText;
	movie.innerHTML = "Loading";
	requestApi(server)
		.then(function(result){
			const output = JSON.parse(result);
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

function requestApi(url){
	return new Promise (function(resolve, reject){
		const xhr = new XMLHttpRequest();
		xhr.open("GET", url);
		xhr.addEventListener("load", function(){
			if(xhr.status !== 200) {
				reject({ status: xhr.status });
				return;
			}

			resolve(xhr.response);

		});
		xhr.addEventListener("error", function(){
			reject({
				status: xhr.status
			});
		});
		xhr.send();
	});
	
	

	// xhr.addEventListener("readystatechange", () => {
	// 	if(xhr.readyState !== 4){
	// 		movie.innerHTML = "Loading";
	// 		return;
	// 	}
	// 	if(xhr.status !== 200){
	// 		movie.innerHTML = "Something wrong";
	// 		console.log('error: '+ xhr.status);
	// 		return;
	// 	} 
	// })
}

//https://api.themoviedb.org/3/search/multi?api_key=bbe6ec69f82d143a332ccce50dbd14e8&language=en-US&query=---&include_adult=true