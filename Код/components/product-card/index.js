// lab3/components/product-card/index.js
// Компонент карточки книги. Вся вёрстка — в getHTML().

export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card h-100 shadow-sm border-0 book-card" data-id="${data.id}">
                <div class="book-cover" style="background: ${data.cover};">
                    <span class="book-cover-title">${data.title}</span>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text text-muted small flex-grow-1">${data.text}</p>

                    <div class="d-flex justify-content-between mb-2">
                        <span class="badge bg-success">${data.genre}</span>
                        <span class="badge bg-secondary">${data.age}</span>
                    </div>

                    <div class="book-price mb-3">${data.price} ₽</div>

                    <div class="d-flex gap-2">
                        <button class="btn btn-ast flex-fill btn-open"
                                data-id="${data.id}">Подробнее</button>
                        <button class="btn btn-danger-ast btn-delete"
                                data-id="${data.id}">Удалить</button>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(data, onOpen, onDelete) {
        const card = this.parent.querySelector(
            `.book-card[data-id="${data.id}"]`
        );
        if (!card) return;

        card.querySelector(".btn-open").addEventListener("click", (e) => {
            e.stopPropagation();
            onOpen(data.id);
        });

        card.querySelector(".btn-delete").addEventListener("click", (e) => {
            e.stopPropagation();
            onDelete(data.id);
        });
    }

    render(data, onOpen, onDelete) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML("beforeend", html);
        this.addListeners(data, onOpen, onDelete);
    }
}