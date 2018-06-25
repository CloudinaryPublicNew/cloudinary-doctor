

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

// port.onMessage.addListener(function(msg) {
// if (msg.question == "Who's there?")
//     port.postMessage({answer: "Madame"});
// else if (msg.question == "Madame who?")
//     port.postMessage({answer: "Madame... Bovary"});
// });


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


