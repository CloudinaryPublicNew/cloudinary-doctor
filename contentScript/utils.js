const addStyles = (element, styles) => {    
    Object.keys(styles).forEach((key) => { 
         element.style[key] = styles[key];
    });
 }
 
 const showElement = (element, display = "block") => {    
     element.style.display = display;
 }
 
 const hideElement = (element) => {    
     element.style.display = "none";
 }
 
 const createElement = (tag = "div",classes = "", styles = {}) => {
     const element = document.createElement(tag);
     element.className = classes;
     addStyles(element, styles);
 
     return element;
 }