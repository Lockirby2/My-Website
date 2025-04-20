class FileText extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        const filepath = this.attributes.filepath.value;
        
        fetch(filepath)
            .then(response => response.text())
            .then(text => this.innerHTML = `
                <p class="standard-text">${text}</p>
            `).then(() => {
                document.querySelector("c-top-bar").elementLoaded();
            });
    }
}

customElements.define('c-file-text', FileText);