import { closeNavigatorOnRefocus } from "./helpers.js";

class NavigatorButton extends HTMLElement {
    constructor() {
        super();
    }
    
    navigate() {
        location.href = `#${this.headingId}`;
        document.querySelector("c-navigator").close();
    }
    
    handleKeydown(e) {
        switch(e.key) {
            case "Enter":
                this.navigate();
                break;
        } 
    }

    connectedCallback() {
        this.headingId = this.attributes["heading-id"].value;
        const customNavigatorText = this.attributes["custom-navigator-text"];
        
        const heading = document.getElementById(this.headingId);
        const navigatorText = !!customNavigatorText ? customNavigatorText.value : heading.textContent;
        
        this.innerHTML = `
            <div class="navigator-button">
                <div class="vertically-centered">
                    <p class="navigator-text" aria-hidden="true"><strong>\>\></strong></p>
                </div>
                <div class="vertically-centered">
                    <p class="navigator-text">
                        ${navigatorText}
                    </p>
                </div>
            </div>
        `;
        
        this.addEventListener('click', this.navigate);
        this.addEventListener('keydown', this.handleKeydown);
        this.addEventListener('focusout', e => closeNavigatorOnRefocus(e));
    }
}

customElements.define('c-navigator-button', NavigatorButton);