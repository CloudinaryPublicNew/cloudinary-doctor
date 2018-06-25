const ACCEPTED_DPR = 2,
	STYLE_ID = "__cld-ext-doctor-style__ver1",
	// OVERLAY_ID = "__cld-ext-doctor-overlay__ver1",
	// EXPOSE_CONTAINER_CLS = "__cld-ext-doctor-img-cont-expose__ver1",
	EXPOSE_IMG_CLS = "__cld-ext-doctor-img-expose__ver1";


//todo: need to look at css images
//todo: advanced usage - like :after/:before

let imagesData = [];

const getImageAbsolutePosition = (img) => {
	const rect = img.getBoundingClientRect(),
		offsetParent = img.offsetParent,
		offsetRect = offsetParent ? offsetParent.getBoundingClientRect() : rect;

	return {
		boundWidth: rect.width,
		boundHeight: rect.height,
		offsetBoundWidth: offsetRect.width,
		offsetBoundHeight: offsetRect.height,
		left: window.scrollX + rect.left,
		top: window.scrollY + rect.top,
		offsetParent,
	};
};

const getImageData = (img) => {

	const imgData = {
		img,
		src: img.src,
		imageProps: {
			width: img.width,
			height: img.height,
			naturalWidth: img.naturalWidth,
			naturalHeight: img.naturalHeight,
			...getImageAbsolutePosition(img),
		},
		// containerProps: {width: 0, height: 0},
		meta: {
			isCloudinary: true,
			id: img.id,
			className: img.className
		},
	};
	// console.log("found image !!!!!!!! ", imgData, img);

	return imgData;
};

const exposeImage = (imgData) => {
	// const imgExposeContainer = document.createElement("div");
	// 	imgExposeContainer.className = EXPOSE_CONTAINER_CLS;
	//
	// imgExposeContainer.style = `top: ${imgData.imageProps.top}px;
	// 	left: ${imgData.imageProps.left}px;
	// 	width: ${imgData.imageProps.width}px;
	// 	height: ${imgData.imageProps.height}px;`;
	//
	// const exposedImg = document.createElement("img");
	// exposedImg.src = imgData.src;
	// imgExposeContainer.appendChild(exposedImg);
	//
	// document.body.appendChild(imgExposeContainer);
	const props = imgData.imageProps;

	// let highlightElm =  (props.offsetBoundHeight > props.boundHeight || props.offsetBoundWidth > props.boundWidth) ?
	// 	props.offsetParent : imgData.img;
	//
	// if (highlightElm.childNodes.)

	//highlightElm.border

	imgData.img.className += ` ${EXPOSE_IMG_CLS}`;

};

const listAndExposeImages = () => {
	const images = document.getElementsByTagName("img");

	imagesData = Array.prototype.map.call(images, (img) => {

		const imgData = getImageData(img);

		chrome.runtime.sendMessage(chrome.runtime.id, {
			type: "image-info",
			data: imgData
		}, null, (response) => {

			console.log("response for image !!!!!!!!!! ", response);

		}); //string extensionId, any message, object options, function responseCallback)

		exposeImage(imgData);

		return imgData;
	});
};


// /**
//  * show mask on page with highlight for images
//  */
// const exposeImages = () => {
//
// 	const overlay = document.createElement("div");
// 	overlay.setAttribute("id", OVERLAY_ID);
// 	document.body.appendChild(overlay);
//
// 	imagesData.forEach((img)=>{
//
// 		const imgExposeContainer = document.createElement("div");
// 		imgExposeContainer.className = EXPOSE_CONTAINER_CLS;
// 		imgExposeContainer.style = `top: ${img.imageProps.top}px;
// 		left: ${img.imageProps.left}px;
// 		width: ${img.imageProps.width}px;
// 		height: ${img.imageProps.height}px;`;
//
// 		const exposedImg = document.createElement("img");
// 		exposedImg.src = img.src;
// 		imgExposeContainer.appendChild(exposedImg);
//
// 		document.body.appendChild(imgExposeContainer);
// 	});
// };
// const addOverlay = () =>{
// 	const overlay = document.createElement("div");
// 	overlay.setAttribute("id", OVERLAY_ID);
// 	document.body.appendChild(overlay);
//
// 	return overlay;
// };

const injectExtCss = () => {

	const style = document.createElement("style");
	style.setAttribute("id", STYLE_ID);
	style.setAttribute("type", "text/css");

// 	#${OVERLAY_ID} {position: fixed; top: 0; bottom: 0; left: 0; right: 0; background-color: #212020d4; z-index: 1000;}
// .${EXPOSE_CONTAINER_CLS} {position: absolute; z-index: 1001; background-color: #fff;}

	style.innerHTML = `		
		.${EXPOSE_IMG_CLS} {border: 2px solid #1c69e8; box-shadow: 0px 0px 26px 5px rgba(76,131,199,1); }
	`;

	const head = document.querySelector("head");

	if (head) {
		head.appendChild(style);
	}
};

const init = () => {
	injectExtCss();

	// const overlay = addOverlay();

	listAndExposeImages();
};


init();


// var bgWindowObject = chrome.extension.getBackgroundPage();

// console.log(bgWindowObject);


chrome.runtime.onMessage.addListener((request) => {
	console.log(request);
	// if(port.name == "cloudinary") {
	//     port.onMessage.addListener(function(msg) {
	//         switch(msg.type) {
	//             case "state-change":
	//                 console.log(msg);
	//             return;

	//         }
	//     });
	// }
});


// chrome.storage.local.get(['state', 'tabId'], function(result) {
//
//     const cldImages = selectCloudinaryImages(result.state, result.tabId);
//     const pageImageTag = document.getElementsByTagName("img");
//
//     const cldElements = [];
//
//     _.forEach(pageImageTag, (img) => {
//         const match = _.find(cldImages,{url : img.getAttribute("src")});
//         if(match) {
//             cldElements.push(img);
//             img.style.border = "10px solid red";
//         }
//     });
//
//
//
// });


// chrome.extension.onRequest.addListener(function(message, sender, sendResponse) {
//     if(message.storeUpdated) {
//
//     }
// });

// const getPageImages = () => {
//
// }


