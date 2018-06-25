const appendModal = () => {
    const body = document.getElementsByTagName("body")[0];
    
    const modalElement = createElement("div", "shadow-2",{
        display: "flex",
        boxShadow: "0 2px 4px 0 rgba(0,0,0,0.14), 0 3px 4px 0 rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)",
        position: "fixed",
        top: "10px",
        right: "10px",
        backgroundColor: "#FFF",
        borderRadius: 8,
        height: "700px",
        width: "350px",
        zIndex: 100000,
        overflowY: "auto",
        overflowX: "hidden"
    });

    modalElement.innerHTML = `
        <div class="cld-ext-w-100 cld-ext-modal-wrap">
            <div class="cld-ext-flex cld-ext-items-center cld-ext-justify-between cld-ext-logo-wrap">
                <div class="cld-ext-flex cld-ext-items-center">
                    <img width="32" src="https://cloudinary-res.cloudinary.com/image/upload/fl_attachment/v1/logo/for_white_bg/cloudinary_icon_for_white_bg.svg"/>
                    <span class="cld-ext-pl3">Cloudinary <span>X-RAY</span></span>
                </div>
                <div class="cld-ext-close">${ICONS.CLOSE}</div>
            </div>

        </div>
    `;

    modalElement.getElementsByClassName("cld-ext-close")[0].addEventListener("click", () => {
        modalElement.style.display = "none";
    });
    
    modalElement.getElementsByTagName("DIV")[0].appendChild(unoptimizedPanel.panel);
    modalElement.getElementsByTagName("DIV")[0].appendChild(cloudinaryPanel.panel);

    cloudinaryPanel.body.appendChild(errorPanel.panel);
    cloudinaryPanel.body.appendChild(warningPanel.panel);
    cloudinaryPanel.body.appendChild(tipsPanel.panel);
    cloudinaryPanel.body.appendChild(successPanel.panel);
    
    
    body.appendChild(modalElement);
    
    cloudinaryPanel.show();
}

const unoptimizedPanel = new Panel("", {
    borderBottom: "1px solid #D4D4D4"
});
const cloudinaryPanel = new Panel();
const errorPanel = new Panel("error");
const tipsPanel = new Panel("tips");
const successPanel = new Panel("success");
const warningPanel = new Panel("warning");

const updateData = (data) => {

	const optimizedCount = data.filter((item)=>item.isCloudinary).length,
		unoptimizedCount = data.length - optimizedCount;


    cloudinaryPanel.updateHead(optimizedCount,
        `<img width="100%" src="https://cloudinary-res.cloudinary.com/image/upload/fl_attachment/v1/logo/for_white_bg/cloudinary_icon_for_white_bg.svg"/>`, 
        `<span style="color: #0071CE; font-weight: bold;">Powered By Cloudinary`
    );
   
    updateSuccess(data);
    updateWarning(data);
    updateTips(data);
    updateError(data);
    updateUnoptimized(data)
}

const updateError = (data) => {

    const elements = data
	    .filter((item)=>item.error)
	    .map((item) => {
	        const imageUrl = item.url;
	        const imageName = _.truncate(imageUrl, {
	            'length': 25,
	            'omission': ' [...]'
	          });

        return `<div class="cld-ext-tip-row" style="margin-bottom: 10px">
            <div class="cld-ext-flex cld-ext-justify-between cld-ext-items-center" style="margin-bottom: 5px">
                <div style="margin-left: 5px;"><b>${imageName}</b></div>
                <div class="cld-ext-flex" style="align-items: flex-end;">
                    <a href="#" class="cld-ext-icon-16" style="margin-right: 8px;">${ICONS.LAUNCH}</a>
                    <a href="#" class="cld-ext-icon-16" style="margin-right: 8px;">${ICONS.WEB}</a>
                </div>
            </div>
            <div style="margin-bottom: 5px">
                Failed
            </div>
        </div>`
    });

    errorPanel.updateHead(elements.length, ICONS.ERROR, "Error");
    errorPanel.updateBody(elements.join(""));
}

const updateWarning = (data) => {
    const elements = data
	    .filter((item)=> item.warnings.length)
	    .map((item) => {
        const imageUrl = item.url;
        const msg = item.warnings.join("<br/>");

        return `<div class="cld-ext-tip-row" style="margin-bottom: 10px">
            <div class="cld-ext-flex cld-ext-justify-between cld-ext-items-center" style="margin-bottom: 5px">
                <img src="${imageUrl}" width="32">
                <div class="cld-ext-flex" style="align-items: flex-end;">
                    <a href="#" class="cld-ext-icon-16" style="margin-right: 8px;">${ICONS.LAUNCH}</a>
                    <a href="#" class="cld-ext-icon-16" style="margin-right: 8px;">${ICONS.WEB}</a>
                </div>
            </div>
            <div>${msg}</div>
        </div>`
    });

    warningPanel.updateHead(elements.length, ICONS.NOTIFICATION, "Warnings");
    warningPanel.updateBody(elements.join(""));
}

const updateTips = (data) => {

    const elements = data
	    .filter((item)=> item.tips.length)
	    .map((item)=>{


        // const imageName = item.url;
        const imageUrl = item.url;
        const tips = item.tips.join("<br/>");

        return `<div class="cld-ext-tip-row" style="margin-bottom: 10px">
            <div class="cld-ext-flex cld-ext-justify-between cld-ext-items-center" style="margin-bottom: 5px">
                <img src="${imageUrl}" width="32">
                <div class="cld-ext-flex" style="align-items: flex-end;">
                    <a href="#" class="cld-ext-icon-16" style="margin-right: 8px;">${ICONS.LAUNCH}</a>
                    <a href="#" class="cld-ext-icon-16" style="margin-right: 8px;">${ICONS.WEB}</a>
                </div>
            </div>
            <div>${tips}</div>
        </div>`
    });

    tipsPanel.updateHead(elements.length, ICONS.HIGHLIGHT, "Tips");
    tipsPanel.updateBody(elements.join(""));
}

const updateSuccess = (data) => {

    const elements = data
	    .filter((item)=>!item.warnings.length && !item.tips.length && !item.error)
	    .map((item) => {
        const imageUrl = item.url;
        // const imageName = _.truncate(imageUrl, {
        //     'length': 10,
        //     'omission': ' [...]'
        //   });

        return `<div class="cld-ext-tip-row" style="margin-bottom: 10px">
            <div class="cld-ext-flex cld-ext-justify-between cld-ext-items-center" style="margin-bottom: 5px">
                <img src="${imageUrl}" width="32">
                <div class="cld-ext-flex" style="align-items: flex-end;">
                    <a href="#" class="cld-ext-icon-16" style="margin-right: 8px;">${ICONS.LAUNCH}</a>
                    <a href="#" class="cld-ext-icon-16" style="margin-right: 8px;">${ICONS.WEB}</a>
                </div>
            </div>
        </div>`;
    });

    successPanel.updateHead(elements.length, ICONS.THUMB_UP, "Perfect Use Images");
    successPanel.updateBody(elements.join(""));
}

const updateUnoptimized = (data) => {

    const elements = data
	    .filter((item)=>!item.isCloudinary)
	    .map((item) => {
            console.log(item);
        const imageUrl = item.url;
        const imageName = _.truncate(imageUrl, {
            'length': 40,
            'omission': ' [...]'
          });

        return `<div class="cld-ext-tip-row" style="margin-bottom: 10px">
            <div class="cld-ext-flex cld-ext-justify-between cld-ext-items-center" style="margin-bottom: 5px">
                ${imageName}
            </div>
        </div>`;
    });

    
    unoptimizedPanel.updateHead(elements.length, ICONS.IMAGE, `<div class="cld-ext-flex cld-ext-items-center cld-ext-justify-between">
        <span>Unoptimized</span>
        <button class="cld-ext-speed-test-button" style="margin-left: 20px;">Web Speed Test</button>
    </div>`);
    unoptimizedPanel.updateBody(elements.join(""));
}




appendModal();

requestState(updateData);
// updateData();