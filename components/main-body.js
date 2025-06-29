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
                    
                    <div class="centered">
                        <b><p class="rss-text">If you want updates for this website, subscribe to <a href="https://lockirby2.neocities.org/rss.txt">my RSS feed</a>.</p></b>
                    </div>
                    <div class="attribution-section">
                        <a class="attribution-link" href="https://neocities.org" title="Neocities.org">
                            <img class="attribution" src="/components/images/neocities.png" alt="Neocities.org">
                        </a>
                        <a class="attribution-link" href="https://blogger.com" title="Blogger.com">
                            <img class="attribution" src="/components/images/blogger.png" alt="Blogger.org">
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('c-main-body', MainBody);