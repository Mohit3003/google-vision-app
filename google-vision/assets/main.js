$(function() {
  var client = ZAFClient.init();
  client.invoke('resize', { width: '100%', height: '225px' });
  
  
  client.get('ticket.customField:custom_field_114101729171').then(
	function(data) {		
		if(data['ticket.customField:custom_field_114101729171']!=""){
			var imageName = data['ticket.customField:custom_field_114101729171'];
			showImageData(imageName,client);
		}
	}
  ); 
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
			sendData(response, imageName);
		}
	)
}

function sendData(data, imageName){		
	var isHighRisk= false, isMediumRisk= false;isLowRisk= false;
	
	if(data.responses[0].webDetection.fullMatchingImages!=null && data.responses[0].webDetection.fullMatchingImages !="undefined"){
		if(data.responses[0].webDetection.fullMatchingImages.length>0){
			isHighRisk = true;
		}
	}
	else if(data.responses[0].webDetection.partialMatchingImages!=null && data.responses[0].webDetection.partialMatchingImages !="undefined"){
		if(data.responses[0].webDetection.partialMatchingImages.length>0){		
			isMediumRisk=  true;
		}
	}else{
		isLowRisk = true;
	}

	var imagePath = "https://storage.googleapis.com/artifacts-image/" + imageName;
	
	var requester_data = {
		'imagePath' : imagePath,
		'isHighRisk' :isHighRisk,
		'isMediumRisk': isMediumRisk,
		'isLowRisk' : isLowRisk		
	};
	
	var source = $("#requester-template").html();
	var template = Handlebars.compile(source);
	var html = template(requester_data);
	$("#content").html(html);	
}