// lab3/components/product/index.js
// Компонент подробной информации о книге.

export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card border-0 shadow-sm mb-4">
                <div class="row g-0">
                    <div class="col-md-4">
                        <div class="product-cover" style="background: ${data.cover};">
                            ${data.title}
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body p-4">
                            <h2 class="mb-3 text-success">${data.title}</h2>
                            <p class="text-muted">${data.text}</p>

                            <div class="d-flex gap-2 mb-3">
                                <span class="badge bg-success">${data.genre}</span>
                                <span class="badge bg-secondary">${data.age}</span>
                            </div>

                            <div class="h4 text-success mb-0">${data.price} ₽</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML("beforeend", html);
    }
}