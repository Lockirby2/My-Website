class MainBody extends HTMLElement {
    constructor() {
        super();
    }
    
    getChildrenHTML(children) {
        let currentHTML = '';
        for (let child of children) {
            currentHTML += child.outerHTML;
        }
        return currentHTML;
    }
    
    connectedCallback() {
        this.innerHTML = `
            <div class="main-body">
                <div class="transparent-when-navigating">
                    <div class="centered mobile-only">
                        <c-video-loader></c-video-loader>
                    </div>
                    
                    ${this.getChildrenHTML(this.children)}
                    
                    <a href="https://neocities.org" class="neocities centered" title="Neocities.org">
                        <img src="/components/images/neocities.png" alt="Neocities.org">
                    </a>
                </div>
            </div>
        `;
    }
}

customElements.define('c-main-body', MainBody);