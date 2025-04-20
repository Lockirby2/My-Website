class Breadcrumbs extends HTMLElement {
    constructor() {
      super();
    }
    
    getBreadcrumbs(children) {
        let breadcrumbs = [];
        
        for (let child of children) {
            breadcrumbs.push(child.outerHTML);
        }
        
        return breadcrumbs.join('<span> \> </span>');
    }

    connectedCallback() {
        this.innerHTML = `
            ${this.getBreadcrumbs(this.children)}
        `;
    }
}

customElements.define('c-breadcrumbs', Breadcrumbs);