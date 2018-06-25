const ACCEPTED_DPR = 2,
	STYLE_ID = "__cld-ext-doctor-style__ver1",
	// OVERLAY_ID = "__cld-ext-doctor-overlay__ver1",
	// EXPOSE_CONTAINER_CLS = "__cld-ext-doctor-img-cont-expose__ver1",
	EXPOSE_IMG_CLS = "__cld-ext-doctor-img-expose__ver1",
	EXPOSE_IMG_HELPER_ID = "__cld-ext-doctor-img-helper__ver1",
	HELPER_IS_CLD_CLS = "__cld-ext-doctor-img-helper-is-cld__ver1";


//todo: need to look at css images
//todo: advanced usage - like :after/:before

let scrapedData = [];

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

const getImageData = (img) => ({
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
		// isCloudinary: true,
		id: img.id,
		className: img.className
	},
	inspection: {
		status: "pending"
	}
});

const positionImageHelper = (helper, imgData) => {

	helper.style.left = imgData.imageProps.left + "px";

	const bottomPos = imgData.imageProps.top + imgData.imageProps.height + 5,
		pageBottom = window.scrollY + window.innerHeight,
		placeBelow = (pageBottom - 40) > bottomPos; //40 is the height of the helper

	helper.style.top = placeBelow ?
		bottomPos + "px" :  //position below the image
		(imgData.imageProps.top - 45) + "px"; //position above the image
};

const addImageHelper = (imgData) => {

	const stHandler = setTimeout(() => {
		removeImageHelper(imgData);

		const helper = document.createElement("div");
		helper.setAttribute("id", EXPOSE_IMG_HELPER_ID);

		if (imgData.imageProps.width > 50) {
			helper.style.width = imgData.imageProps.width + "px";
		}

		positionImageHelper(helper, imgData);

		document.body.appendChild(helper);

	}, 400);

	imgData.img.dataset["cldDrHelperHandler"] = stHandler;
};

const removeImageHelper = (imgData) => {

	const stHandler = imgData.img.dataset["cldDrHelperHandler"];

	if (stHandler) {
		clearTimeout(parseInt(stHandler));

		const helper = document.getElementById(EXPOSE_IMG_HELPER_ID);

		if (helper) {
			helper.parentNode.removeChild(helper);
		}
	}
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
	// const props = imgData.imageProps;
	// let highlightElm =  (props.offsetBoundHeight > props.boundHeight || props.offsetBoundWidth > props.boundWidth) ?
	// 	props.offsetParent : imgData.img;
	//
	// if (highlightElm.childNodes.)
	//highlightElm.border

	if (imgData.meta.isCloudinary) {
		imgData.img.className += ` ${EXPOSE_IMG_CLS}`; //we only highlight cloudinary images
	}

	imgData.img.addEventListener("mouseover", (e) => {
		addImageHelper(imgData);
		e.stopPropagation();
	});

	imgData.img.addEventListener("mouseleave", (e) => {
		// removeImageHelper(imgData);
		e.stopPropagation();
	});

	imgData.img.addEventListener("click", (e) => {
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
};

const listAndExposeImages = () => {
	const images = document.getElementsByTagName("img");

	scrapedData = Array.prototype.map.call(images, (img) => {

		const imgData = getImageData(img);

		chrome.runtime.sendMessage(chrome.runtime.id, {
			type: "image-info",
			data: imgData
		}, null, (response) => {

			if (response && response.type === "state") {
				console.log("response for image !!!!!!!!!! ", response);

				imgData.inspection.hasWarnings = true; //response.data.warnings.length;
				imgData.inspection.error = true;

				imgData.inspection.status = "done";

				exposeImage(imgData);
			}
		});

		// exposeImage(imgData);

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
		.${EXPOSE_IMG_CLS} {border: 2px solid #1c69e8; box-shadow: 0px 0px 26px 5px rgba(76,131,199,1); cursor: pointer; }
		#${EXPOSE_IMG_HELPER_ID} {border-radius: 4px; height: 40px; min-width: 120px; box-shadow: 0px 1px 16px 5px rgba(0,0,0,0.5); position: absolute; background-color: #fff; padding: 4px; display:flex;}
		#${EXPOSE_IMG_HELPER_ID}.${HELPER_IS_CLD_CLS}:before {background-image: url('https://cloudinary-res.cloudinary.com/image/upload/c_scale,w_86/v1/logo/for_white_bg/cloudinary_icon_for_white_bg.svg'); content: ""; width: 28px; height: 28px; display: inline-block; position:relative; }
	`;

	const head = document.querySelector("head");

	if (head) {
		head.appendChild(style);
	}
};


const listenToDataMessage = ()=>{

	chrome.runtime.onMessage.addListener((msg) => {

		if (msg && msg.type === "image-state"){

		}


		// console.log(request);
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
};

const init = () => {
	injectExtCss();

	listenToDataMessage();

	listAndExposeImages();
};


init();


// var bgWindowObject = chrome.extension.getBackgroundPage();

// console.log(bgWindowObject);





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


