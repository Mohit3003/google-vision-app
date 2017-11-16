$(function() {
  var client = ZAFClient.init();
  client.invoke('resize', { width: '100%', height: '120px' });
 
  var tv_model,requestData;
 /*
  client.get('ticket.customField:custom_field_114099896612').then(
	function(data) {
		tv_model = data['ticket.customField:custom_field_114099896612'];
		console.log(tv_model);//B01GA3Z1M2
        showInfo(tv_model,client);
	}
  );*/
});
/*
'use strict';

const bucketName = 'artifacts-image';
const fileName = 'houston-home-insurance-claims.jpg';

var gcloud = require('google-cloud');

const vision = gcloud.vision();

module.exports = async function (context) {
	
	const request = {
	source: {
		imageUri: `gs://${bucketName}/${fileName}`
		//filename: fileName
		}
	};
	vision.webDetection(request)
	.then((results) => {
		const webDetection = results[0].webDetection;
		if (webDetection.fullMatchingImages.length) {
			console.log(`Full matches found: ${webDetection.fullMatchingImages.length}`);
			webDetection.fullMatchingImages.forEach((image) => {
			console.log(`  URL: ${image.url}`);
			console.log(`  Score: ${image.score}`);
        });
      }
	  if (webDetection.partialMatchingImages.length) {
        console.log(`Partial matches found: ${webDetection.partialMatchingImages.length}`);
        webDetection.partialMatchingImages.forEach((image) => {
          console.log(`  URL: ${image.url}`);
          console.log(`  Score: ${image.score}`);
        });
      }
	  if(webDetection.fullMatchingImages.length > 0 && webDetection.partialMatchingImages.length > 0)
		console.log('duplicate image');
		return {
				status: 200,
				body: {
					text: webDetection.fullMatchingImages.length
				},
				headers: {
					'Content-Type': 'application/json'
				}
			};
	
	
	}).catch((err) =>{
		console.error('ERROR:', err);
	});  

	
	/*
	 //const body = context.request.body;
	 //console.log(body);
	 var tv_id= 'B01GA3Z1M2';//B00YENF36K, B01GA3Z1M2,B0007KLH9G
	 
	 var uri='https://www.amazon.co.uk/dp/' + tv_id;
	    try {
			
			priceFinder.findItemPrice(uri, function(err, tv_price) {
				console.log(tv_price);
			return {
				status: 200,
				body: {
					text: tv_price
				},
				headers: {
					'Content-Type': 'application/json'
				}
			};
			});		
		}catch (e) {
			console.error(e);
			return {
				status: 500,
				body: e
			};
    }
	 
}*/