// lab3/components/back-button/index.js
// Компонент кнопки «Домой».

export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <button id="back-button" class="btn btn-ast-outline mb-3" type="button">
                ← Домой
            </button>
        `;
    }

    addListeners(listener) {
        document
            .getElementById("back-button")
            .addEventListener("click", listener);
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);
        this.addListeners(listener);
    }
}