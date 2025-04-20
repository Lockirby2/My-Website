import { closeNavigatorOnRefocus } from "./helpers.js";

class NavigatorToggle extends HTMLElement {
    constructor() {
        super();
    }
    
    toggleNavigator() {
        const navigator = document.querySelector("c-navigator");
        
        if (navigator.isOpen()) {
            navigator.close();
        } else {
            navigator.open();
        }
    }
    
    handleKeydown(e) {
        switch(e.key) {
            case "Enter":
                this.toggleNavigator();
                break;
        }
    }
    
    handleFocusOut(e) {
        closeNavigatorOnRefocus(e);
    }
    
    connectedCallback() {
        this.innerHTML = `
            <div
                class="maintain-navigator-focus navigator-toggle fully-centered mobile-only"
                tabindex="0"
                role="button"
                aria-label="Open Navigator"
                onclick="this.parentNode.toggleNavigator()"
                onkeydown="this.parentNode.handleKeydown(event)"
                onfocusout="this.parentNode.handleFocusOut(event)"
            >
                ☰
            </div>
        `;
    }
}

customElements.define('c-navigator-toggle', NavigatorToggle);