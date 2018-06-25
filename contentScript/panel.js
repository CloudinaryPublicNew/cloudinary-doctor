class Panel {
    constructor(className = "", styles = {}) {
        this.panel = createElement("div", `cld-ext-panel ${className}`, styles);
        this.head = createElement("div", "cld-ext-pa3 cld-ext-pointer");
        this.body = createElement("div", "cld-ext-panel-body");

        this.head.addEventListener("click", () => {
            if(this.body.style.display === "none") {
                this.show();
            } else {
                this.hide();
            }
        })

        this.head.innerHTML = `<div class="cld-ext-panel-head cld-ext-flex cld-ext-items-center">
            <div class="cld-ext-mr2 cld-ext-flex cld-ext-items-center cld-ext-head-arrow" style="width: 20px; height: 20px;">${ICONS.ARROW_RIGHT}</div>
            <div class="cld-ext-flex cld-ext-items-center cld-ext-head-content"></div>
        </div>`;

        this.arrow = this.head.getElementsByClassName("cld-ext-head-arrow")[0];
             
        this.panel.appendChild(this.head);
        this.panel.appendChild(this.body);


        this.hide();
    }

    updateHead(total, icon, title) {
        const renderTo = this.head.getElementsByClassName("cld-ext-head-content")[0];
        renderTo.innerHTML = `
            <div class="cld-ext-mr2">${total}</div>
            <div class="cld-ext-mr2 cld-ext-flex cld-ext-items-center cld-ext-panel-head-icon" style="width: 16px; height: 16px;">${icon}</div>
            <div class="cld-ext-mr2">${title}</div>
        `;

        
        if(total === 0 || !total) {
            hideElement(this.arrow);
        } else {
            showElement(this.arrow, "flex");
        }
    }

    updateBody(html) {
        this.body.innerHTML = html;
    }


    show() {
        showElement(this.body);
        this.arrow.innerHTML = ICONS.ARROW_BOTTOM;
    }

    hide() {
        hideElement(this.body);
        this.arrow.innerHTML = ICONS.ARROW_RIGHT;
    }
} 