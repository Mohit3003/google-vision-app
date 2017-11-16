$(function() {
  var client = ZAFClient.init();
  client.invoke('resize', { width: '100%', height: '150px' });
  
  
  client.get('ticket.customField:custom_field_114101729171').then(
	function(data) {		
	if(data['ticket.customField:custom_field_114101729171']!=""){
		var imageName = data['ticket.customField:custom_field_114101729171'];
        showImageData(imageName,client);
	}
	}
  );
  
  /*client.get('ticket.customField:custom_field_114101655912').then(
	function(data) {
		var imageName = data['ticket.customField:custom_field_114101655912'];
		console.log(imageName);
        showImageData(imageName,client);
		//console.log("responseTwo = " +  responseTwo);
	}
  ); */ 
});

function showImageData(imageName, client){
	var parameters = {
	  "requests": [
		{
		  "image": {
			"source": {
			  "gcsImageUri": "gs://artifacts-image/" + imageName
			}
		  },
		  "features": [
			{
			  "type": "WEB_DETECTION"
			}
		  ]
		}
	  ]
	}
	var settings = {
		url: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBbdLJcEoSgXvM7dsrv409bBr3n1oKdVOo',
		data: JSON.stringify(parameters),
		type: 'POST',
		contentType: 'application/json'
	};
	client.request(settings).then(
		function(response) {
			sendData(response);
		}
	)
}

function sendData(data){
		
	var riskFactorOne="", descriptionOne="",riskFactorTwo="", descriptionTwo="";
	
	if(data.responses[0].webDetection.fullMatchingImages.length>0){
		riskFactorOne="High";
		descriptionOne = "Exact image has been found over the internet";
	}else if(data.responses[0].webDetection.partialMatchingImages.length>0){
		riskFactorOne="Medium";
		descriptionOne = "A similiar image has been found over the internet";
	}else{
		riskFactorOne="Low";
		descriptionOne = "This image has not been found over the internet";
	}
	
	
	var requester_data = {
		'riskFactorOne': riskFactorOne,
		'descriptionOne': descriptionOne
	};  
	var source = $("#requester-template").html();
	var template = Handlebars.compile(source);
	var html = template(requester_data);
	$("#content").html(html);	
}