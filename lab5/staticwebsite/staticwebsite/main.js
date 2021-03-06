// requires API_ENDPOINT_URL_STR in window scope

var
	$breed_select = $("[data-role='breed_select']");
	$filter_type = $("[data-role='filter_type']"),
	$cat_info = $("[data-role='cat_info']");

function g_ajaxer(url_str, params, ok_cb, fail_cb){
	$.ajax({
		url: url_str,
		type: "POST",
		data: JSON.stringify(params),
		crossDomain: true,
		contentType: "application/json",
		dataType: "json",
		success: ok_cb,
		error: fail_cb,
		timeout: 3000
	});
}
function clearFilter(){
	$breed_select.val("All");
	$cat_info.html("");
	$cat_info
		.attr("data-showing", "not_showing")
	$filter_type.text("Showing all cats");
	//do new search
	postRequest("all");
}
function handleFailure(fe){
	console.log("FAIL");
	if(fe.status === 405){
		$filter_type.text("No API to call");
	}else{
		$filter_type.text("Failed due to CORS");
	}
}
function handleSuccess(data_arr){
	var 
		filter_str = $breed_select.val();
	if(data_arr.length === 0){
		$filter_type.text("No " + filter_str.toLowerCase() + " cats found");
		$cat_info
			.attr("data-showing", "not_showing")
	}
	showCats(data_arr);
}
function postRequest(breed_str){
	showSearching();
	var params = {
		breed_str: breed_str
	};
	g_ajaxer(window.API_ENDPOINT_URL_STR, params, handleSuccess, handleFailure);
}
function showCats(data_arr){
	var 
		html_str = '',
		petname_str = "",
		notable_features_str = "",
		gender_str = "",
		// date_str = "",
		filter_str = $breed_select.val();
	for(var i_int = 0; i_int < data_arr.length; i_int += 1){
		petname_str = data_arr[i_int].petname.S || data_arr[i_int].petname;
		gender_str = data_arr[i_int].gender.S || data_arr[i_int].gender;
		notable_features_str = data_arr[i_int].notable_features.S || data_arr[i_int].notable_features;
		// date_str = new Date(data_arr[i_int].data_found.S).toLocaleDateString();
		html_str += '<article>';
		html_str += 	'<h4>' + petname_str + ' : ' + gender_str + '</h4>';
		// html_str += '<h5>Found:' + date_str + '</h5>';
		html_str += 	'<figure>';
		html_str += 		'<img alt="this is a picture of ' +  petname_str + ' " src="images/' + petname_str.toLowerCase() + '.png" width="300" height="300" />'; 
		html_str += 		'<figcaption>' + notable_features_str + '</figcaption>';
		html_str += 	'</figure>';
		html_str += '</article>';
	}
	$filter_type.text("Showing " + filter_str.toLowerCase() + " cats");
	$cat_info
		.attr("data-showing", "showing")
		.append(html_str);
	if(data_arr.length === 0){
		$cat_info.html('<h6>No cats found!</h6>');
	}

}
function showSearching(){
	var 
		filter_str = $breed_select.val();
	$filter_type.text("Searching database for " + filter_str.toLowerCase() + " cats...");
	$cat_info.attr("data-showing", "not_showing").html("");
}
function submitBreed(se){
	se.preventDefault();
	//validate todo
	postRequest($breed_select.val());
}

// handlers
$(document).on("change", "[data-action='choose_breed']", submitBreed);


//onm load
postRequest("All");