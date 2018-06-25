

// var bgWindowObject = chrome.extension.getBackgroundPage();

// console.log(bgWindowObject);


chrome.storage.local.get(['state', 'tabId'], function(result) {

    const cldImages = selectCloudinaryImages(result.state, result.tabId);
    const pageImageTag = document.getElementsByTagName("img");

    const cldElements = [];

    _.forEach(pageImageTag, (img) => {
        const match = _.find(cldImages,{url : img.getAttribute("src")});
        if(match) {
            cldElements.push(img);
            img.style.border = "10px solid red";
        }
    });

    

});


chrome.extension.onRequest.addListener(function(message, sender, sendResponse) {
    if(message.storeUpdated) {

    }    
});

const getPageImages = () => {
    
}


