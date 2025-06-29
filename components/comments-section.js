class CommentsSection extends HTMLElement {
    constructor() {
      super();
    }
    
    handleCommentsResize(e) {
        // Here we have to check the content of the message event for safety purposes. The event data contains the message sent from the iframe page.
        if (e.data.hasOwnProperty("frameHeight")) {
            document.querySelector(".blog-comments").height = e.data.frameHeight;
        }
    }
    
    connectedCallback() {
        this.innerHTML = `
            <iframe class="blog-comments" src='https://lockirby2-comments.blogspot.com/2025/06/httpslockirby2neocitiesorgblogrpg.html?from_my_site=true'></iframe>
        `;
        
        window.addEventListener('message', e => this.handleCommentsResize(e));
    }
}

customElements.define('c-comments-section', CommentsSection);