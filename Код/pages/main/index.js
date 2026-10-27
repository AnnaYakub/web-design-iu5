// lab3/pages/main/index.js
// Страница списка книг с фильтрацией, добавлением и удалением.

import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { booksMock } from "../../mocks/books.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.books = [...booksMock];
        this.filterText = "";
    }

    getData() {
        return this.books;
    }

    getFilteredData() {
        const q = this.filterText.trim().toLowerCase();
        if (!q) return this.books;

        return this.books.filter(b =>
            b.title.toLowerCase().includes(q) ||
            b.genre.toLowerCase().includes(q) ||
            b.text.toLowerCase().includes(q)
        );
    }

    get pageRoot() {
        return document.getElementById("main-page");
    }

    getHTML() {
        return `
            <div class="catalog-header">
                <h2>Каталог книг</h2>
                <p class="catalog-subtitle">Издательская группа «АСТ»</p>
            </div>

            <div class="catalog-toolbar">
                <input
                    type="text"
                    id="catalog-search"
                    class="catalog-search"
                    placeholder="Поиск по названию, жанру или описанию..."
                    value="${this.filterText}"
                />
                <button id="catalog-add" class="btn btn-ast" type="button">
                    + Добавить книгу
                </button>
            </div>

            <div id="main-page" class="row"></div>
        `;
    }

    addCard() {
        if (this.books.length === 0) return;

        const first = this.books[0];
        const maxId = this.books.reduce((max, b) => Math.max(max, b.id), 0);

        this.books.push({
            ...first,
            id: maxId + 1,
            title: `${first.title} (копия)`
        });

        this.render();
    }

    deleteCard(id) {
        this.books = this.books.filter(b => b.id !== id);
        this.render();
    }

    openProduct(id) {
        const productPage = new ProductPage(this.parent, id);
        productPage.render();
    }

    bindSearch() {
        const input = document.getElementById("catalog-search");
        if (!input) return;
        input.addEventListener("input", (e) => {
            this.filterText = e.target.value;
            this.renderCards();
        });
    }

    bindAddButton() {
        const btn = document.getElementById("catalog-add");
        if (!btn) return;
        btn.addEventListener("click", () => this.addCard());
    }

    renderCards() {
        const container = this.pageRoot;
        if (!container) return;

        container.innerHTML = "";
        const data = this.getFilteredData();

        if (data.length === 0) {
            container.insertAdjacentHTML(
                "beforeend",
                `<div class="catalog-empty">Ничего не найдено</div>`
            );
            return;
        }

        data.forEach((item) => {
            const wrapper = document.createElement("div");
            wrapper.className = "col-12 col-sm-6 col-lg-4 col-xl-3 mb-4";
            container.appendChild(wrapper);

            const card = new ProductCardComponent(wrapper);
            card.render(
                item,
                this.openProduct.bind(this),
                this.deleteCard.bind(this)
            );
        });
    }

    render() {
        this.parent.innerHTML = "";
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);

        this.bindSearch();
        this.bindAddButton();
        this.renderCards();
    }
}