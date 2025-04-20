import { closeNavigatorOnRefocus } from "./helpers.js";

class Navigator extends HTMLElement {
    constructor() {
        super();
        this.opened = false;
        this.updateSelector = "c-navigator, .content, .left-margin, .navigator-toggle, .body-cover, .transparent-when-navigating";
        
        this.createButtonIndex = -1;
        this.focusedButton = 0;
    }
    
    isOpen() {
        return this.opened;
    }
    
    setTabIndex() {
        if (document.documentElement.clientWidth < 800 && !this.opened) {
            this.setAttribute('tabindex', -1);
            
            if (document.activeElement.tagName === "C-NAVIGATOR") {
                document.activeElement.blur();
            }
        } else {
            this.setAttribute('tabindex', 0);
        }
    }
    
    open() {
        const elementsToUpdate = document.querySelectorAll(this.updateSelector);
        
        for (let element of elementsToUpdate) {
            element.classList.add("navigator-open");
        }
        
        this.opened = true;
        
        this.setTabIndex();
        this.focus();
        
        document.querySelector(".navigator-toggle").setAttribute('aria-label', 'Close Navigator');
    }
    
    close() {
        const elementsToUpdate = document.querySelectorAll(this.updateSelector);
        
        for (let element of elementsToUpdate) {
            element.classList.remove("navigator-open");
        }
        
        this.opened = false;
        
        this.setTabIndex();
        document.activeElement.blur();
        
        document.querySelector(".navigator-toggle").setAttribute('aria-label', 'Open Navigator');
    }
    
    getButton(headingId, customText) {
        let customTextAttribute = "";
        if (!!customText) {
            customTextAttribute = ` custom-navigator-text="${customText}"`;
        }
        
        this.createButtonIndex++;
        const buttonId = `navigator-${this.createButtonIndex}`;
        
        return `<c-navigator-button id="${buttonId}" heading-id="${headingId}"${customTextAttribute} tabindex="-1" role="menuitem"></c-navigator-button>`;
    }
    
    getButtonsForHeadings(headings) {
        let buttons = [];
        
        buttons.push(this.getButton("top-bar", "Top of Page"));
        
        for (let heading of headings) {
            if (!heading.id) {
                continue;
            }
            
            const customText = heading.attributes["custom-navigator-text"]?.value;
            const button = this.getButton(heading.id, customText);
            buttons.push(button);
        }
        
        return buttons.join('\n');
    }
    
    buttonHasFocus(buttonIndex) {
        const buttonToCheck = `navigator-${buttonIndex}`;
        return document.getElementById(buttonToCheck) === document.activeElement;
    }
    
    refocus(buttonIndex) {
        const newFocusId = `navigator-${buttonIndex}`;
        document.getElementById(newFocusId).focus();
    }
    
    moveSelectionUp() {
        if (this.buttonHasFocus(this.focusedButton)) {
            if (this.focusedButton === 0) {
                this.focusedButton = this.createButtonIndex;
            } else {
                this.focusedButton--;
            }
        }
        
        this.refocus(this.focusedButton);
    }
    
    moveSelectionDown() {
        if (this.buttonHasFocus(this.focusedButton)) {
            if (this.focusedButton === this.createButtonIndex) {
                this.focusedButton = 0;
            } else {
                this.focusedButton++;
            }
        }
        
        this.refocus(this.focusedButton);
    }
    
    handleKeydown(e) {
        switch(e.key) {
            case "ArrowUp":
                e.preventDefault();
                this.moveSelectionUp();
                break;
            case "ArrowDown":
                e.preventDefault();
                this.moveSelectionDown();
                break;
        } 
    }
    
    setTop() {
        const topBarHeight = 53;
        const offset = Math.min(topBarHeight, window.scrollY);
        
        document.querySelector(".left-margin").style.top = (topBarHeight - offset) + "px";
    }

    connectedCallback() {
        const headings = document.querySelectorAll("h1");
        
        this.setTabIndex();
        
        this.innerHTML = `
            ${this.getButtonsForHeadings(headings)}
        `;
        
        this.addEventListener('keydown', this.handleKeydown);
        this.addEventListener('focusout', e => closeNavigatorOnRefocus(e));
        
        this.setTop();
        window.addEventListener('resize', e => this.setTabIndex());
        window.addEventListener('scroll', e => this.setTop());
    }
}

customElements.define('c-navigator', Navigator);