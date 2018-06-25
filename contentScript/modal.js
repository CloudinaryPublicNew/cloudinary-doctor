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

const updateData = (state) => {
    unoptimizedPanel.updateHead(100, ICONS.IMAGE, "Unoptimized");
    cloudinaryPanel.updateHead(102, 
        `<img width="100%" src="https://cloudinary-res.cloudinary.com/image/upload/fl_attachment/v1/logo/for_white_bg/cloudinary_icon_for_white_bg.svg"/>`, 
        `<span style="color: #0071CE; font-weight: bold;">Powered By Cloudinary`
    );
   
    updateSuccess(state);
    updateWarning(state);
    updateTips(state);
    updateError(state);
}

const updateError = (state) => {
    const images = [
        {
            url: "https://res-3.cloudinary.com/cloudinary/image/upload/c_pad,dpr_auto,h_40,w_110/hmwjugkbeo8qvrf7cvvu.png",
            msg: "sdsdssd"
        },
        {
            url: "https://res-3.cloudinary.com/cloudinary/image/upload/c_pad,dpr_auto,h_40,w_110/hmwjugkbeo8qvrf7cvvu.png",
            msg: "sdsdssd"
        },
    ];

    const html = images.map((item) => {
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
                ${item.msg}
            </div>
        </div>`
    }).join("");

    errorPanel.updateHead(105, ICONS.ERROR, "Error");
    errorPanel.updateBody(html);
}

const updateWarning = (state) => {
    const warnings = [
        {
            url: "https://res-3.cloudinary.com/cloudinary/image/upload/c_pad,dpr_auto,h_40,w_110/hmwjugkbeo8qvrf7cvvu.png",
            msg: ["sddsdsddsd"]
        },
        {
            url: "https://res-3.cloudinary.com/cloudinary/image/upload/c_pad,dpr_auto,h_40,w_110/hmwjugkbeo8qvrf7cvvu.png",
            msg: ["sddsdsddsd"]
        },
    ];

    const html = warnings.map((item) => {
        const imageUrl = item.url;
        const msg = item.msg; 

        return `<div class="cld-ext-tip-row" style="margin-bottom: 10px">
            <div class="cld-ext-flex cld-ext-justify-between cld-ext-items-center" style="margin-bottom: 5px">
                <img src="${imageUrl}" width="24" height="24">
                <div class="cld-ext-flex" style="align-items: flex-end;">
                    <a href="#" class="cld-ext-icon-16" style="margin-right: 8px;">${ICONS.LAUNCH}</a>
                    <a href="#" class="cld-ext-icon-16" style="margin-right: 8px;">${ICONS.WEB}</a>
                </div>
            </div>
            <div>${msg}</div>
        </div>`
    }).join("");

    warningPanel.updateHead(105, ICONS.NOTIFICATION, "Warning");
    warningPanel.updateBody(html);
}

const updateTips = (state) => {
    const tips = [
        {
            url: "https://res-3.cloudinary.com/cloudinary/image/upload/c_pad,dpr_auto,h_40,w_110/hmwjugkbeo8qvrf7cvvu.png",
            tips: ["sdsdsd", "sdsdsd", "sdsdsds"]
        },
        {
            url: "https://res-3.cloudinary.com/cloudinary/image/upload/c_pad,dpr_auto,h_40,w_110/hmwjugkbeo8qvrf7cvvu.png",
            tips: ["1111", "111"]
        }
    ];

    const html = tips.map((tip) => {
        const imageName = tip.url;
        const imageUrl = tip.url;
        const tips = tip.tips.join("<br/>"); 

        return `<div class="cld-ext-tip-row" style="margin-bottom: 10px">
            <div class="cld-ext-flex cld-ext-justify-between cld-ext-items-center" style="margin-bottom: 5px">
                <img src="${imageUrl}" width="24" height="24">
                <div class="cld-ext-flex" style="align-items: flex-end;">
                    <a href="#" class="cld-ext-icon-16" style="margin-right: 8px;">${ICONS.LAUNCH}</a>
                    <a href="#" class="cld-ext-icon-16" style="margin-right: 8px;">${ICONS.WEB}</a>
                </div>
            </div>
            <div>${tips}</div>
        </div>`
    }).join("");

    tipsPanel.updateHead(50, ICONS.HIGHLIGHT, "Tips");
    tipsPanel.updateBody(html);
}

const updateSuccess = (state) => {
    const images = [
        {
            url: "https://res-3.cloudinary.com/cloudinary/image/upload/c_pad,dpr_auto,h_40,w_110/hmwjugkbeo8qvrf7cvvu.png",
        },
        {
            url: "https://res-3.cloudinary.com/cloudinary/image/upload/c_pad,dpr_auto,h_40,w_110/hmwjugkbeo8qvrf7cvvu.png",
        },
    ];

    const html = images.map((item) => {
        const imageUrl = item.url;
        const imageName = _.truncate(imageUrl, {
            'length': 10,
            'omission': ' [...]'
          });

        return `<div class="cld-ext-tip-row" style="margin-bottom: 10px">
            <div class="cld-ext-flex cld-ext-justify-between cld-ext-items-center" style="margin-bottom: 5px">
                <img src="${imageUrl}" width="24" height="24">
                <div class="cld-ext-flex" style="align-items: flex-end;">
                    <a href="#" class="cld-ext-icon-16" style="margin-right: 8px;">${ICONS.LAUNCH}</a>
                    <a href="#" class="cld-ext-icon-16" style="margin-right: 8px;">${ICONS.WEB}</a>
                </div>
            </div>
        </div>`
    }).join("");

    successPanel.updateHead(50, ICONS.THUMB_UP, "Perfect Use Images");
    successPanel.updateBody(html);
}

appendModal();
updateData();