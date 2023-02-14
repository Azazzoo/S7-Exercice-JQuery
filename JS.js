$(document).ready(function (){
    let desc = location.search.substring(1);
    let descData = desc.split('description=')[1];
    let dataDesc = descData.split('&')[0]
    $('#postit').append('<div id="postit"> <p>' + dataDesc + '</p> </div>');




})