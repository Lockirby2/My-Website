const BREADCRUMB_CLASS_NAME = "breadcrumb";

class TopBar extends HTMLElement {
    constructor() {
        super();
    }
    
    getBreadcrumbs(children) {
        let breadcrumbs = [];
        
        for (let child of children) {
            if (child.className === BREADCRUMB_CLASS_NAME) {
                breadcrumbs.push(child.outerHTML);
            }
        }
        
        return breadcrumbs.join("\n");
    }
    
    // Sometimes the window loads first and sometimes the external data loads first. Need to scroll after both since the default behaviour will scroll before everything is loaded.
    scrollToHeader() {
        if(!!window.location.hash) {
            setTimeout(() => { location.href = location.href }, 0);
        }
        
        // Don't enable smooth scrolling until both the window and all the elements are loaded.
        this.scrollCount++;
        if (this.scrollCount === 2) {
            setTimeout(() => { document.documentElement.style = 'scroll-behavior: smooth;' }, 0);
        }
    }
    
    elementLoaded() {
        this.elementsToLoad--;
        if (this.elementsToLoad === 0) {
            this.scrollToHeader();
        }
    }
    
    connectedCallback() {
        this.innerHTML = `
            <div id="top-bar" class="top-bar">
                <div class="breadcrumb-container">
                    <c-breadcrumbs>
                        ${this.getBreadcrumbs(this.children)}
                    </c-breadcrumbs>
                </div>
                <div class="site-name-container">
                    <a class="site-name-link" href="https://lockirby2.neocities.org" title="Lockirby2.neocities.org">
                        <img class="site-name" src="/components/images/Lockirby2.neocities.org.svg" alt="Lockirby2.neocities.org">
                    </a>
                </div>
                <div class="site-icon-container">
                    <img class="site-icon" src="/components/images/locke-sprite.png" alt="Locke's sprite">
                    <img class="site-icon" src="/components/images/kirby-sprite.png" alt="Kirby's sprite">
                </div>
            </div>
        `;
        
        this.scrollCount = 0;
        this.elementsToLoad = document.querySelectorAll("c-file-text").length;
        window.addEventListener("load", () => { this.scrollToHeader(this) });
    }
}

customElements.define('c-top-bar', TopBar);