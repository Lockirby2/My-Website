class VideoLoader extends HTMLElement {
    constructor() {
      super();
    }
    
    removeOldRipples() {
        const ripple = document.getElementsByClassName("ripple")[0];
        
        if (ripple) {
            ripple.remove();
        }
    }
    
    createRipple(event) {
        const button = event.currentTarget;
        
        let clickX = event.clientX;
        let clickY = event.clientY;
        
        // Handle click coming from keyboard
        if (clickX === 0) {
            clickX = button.offsetLeft + (button.clientWidth / 2);
        }
        if (clickY === 0) {
            clickY = button.offsetTop + (button.clientHeight / 2);
        }
        
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${clickX - button.offsetLeft - radius}px`;
        circle.style.top = `${clickY - button.offsetTop - radius}px`;
        circle.classList.add("ripple");
        
        this.removeOldRipples();
        
        button.appendChild(circle);
    }
    
    loadVideos() {
        const videos = document.querySelectorAll("c-video");
        
        for (let video of videos) {
            video.loadVideo();
        }
    }
    
    connectedCallback() {
        this.innerHTML = `
            <button class="video-loader" tabindex="0">
                <p id="video-loader-text" class="button-text video-loader-text">Load all videos</p>
            </button>
        `;
        
        this.addEventListener("click", this.loadVideos);
        this.addEventListener("click", this.createRipple);
        window.addEventListener('resize', this.removeOldRipples);
    }
}

customElements.define('c-video-loader', VideoLoader);