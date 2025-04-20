const MAINTAIN_NAVIGATOR_FOCUS = "maintain-navigator-focus";

export function closeNavigatorOnRefocus(e) {
    const navigatorTags = ["C-NAVIGATOR", "C-NAVIGATOR-BUTTON"];
    
    if (e.relatedTarget === null) {
        closeNavigator();
        return;
    }
    
    if (!navigatorTags.includes(e.relatedTarget.tagName) &&
            !e.relatedTarget.classList.contains(MAINTAIN_NAVIGATOR_FOCUS)) {
            
        closeNavigator();
        return;
    }
}

function closeNavigator() {
    document.querySelector("c-navigator").close();
}