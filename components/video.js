class Video extends HTMLElement {
    constructor() {
      super();
    }
    
    getTopBarLink() {
        return `<a class="skip-link" href="#top-bar">Back to top</a>`;
    }
    
    loadVideo() {
        if (this.videoLoaded) {
            return;
        }
        
        const videoId = this.attributes["video-id"].value;
        
        this.innerHTML = `
            <div class="video-container">
                <iframe allow="fullscreen;" class="video-iframe" src="https://www.youtube.com/embed/${videoId}"></iframe>
                ${this.getTopBarLink()}
            </div>
        `;
        
        this.videoLoaded = true;
    }
    
    handleKeydown(e) {
        switch(e.key) {
            case "Enter":
                this.loadVideo();
                break;
        } 
    }
    
    connectedCallback() {
        this.innerHTML = `
            <div class="video-container">
                <div class="video-cover" role="button" title="Load video" tabindex="0">
                    <div class="video-cover-text-container">
                        <p id="video-cover-text" class="button-text" aria-hidden="true">Click to load video</p>
                    </div>
                </div>
                ${this.getTopBarLink()}
            </div>
        `;
        
        this.addEventListener("click", this.loadVideo);
        this.addEventListener("keydown", this.handleKeydown);
        this.querySelector('a').addEventListener("click", (e) => { e.stopPropagation() });
        this.querySelector('a').addEventListener("keydown", (e) => { e.stopPropagation() });
    }
}

customElements.define('c-video', Video);