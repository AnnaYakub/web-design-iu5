// lab3/pages/product/index.js
// Страница подробной информации о книге.

import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { booksMock } from "../../mocks/books.js";

export class ProductPage {
    constructor(parent, id, books = booksMock) {
        this.parent = parent;
        this.id = id;
        this.books = books;
    }

    getData() {
        return this.books.find(b => b.id === Number(this.id));
    }

    get pageRoot() {
        return document.getElementById("product-page");
    }

    getHTML() {
        return `<div id="product-page"></div>`;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = "";
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();

        if (!data) {
            this.pageRoot.insertAdjacentHTML(
                "beforeend",
                `<div class="catalog-empty">Книга не найдена</div>`
            );
            return;
        }

        const product = new ProductComponent(this.pageRoot);
        product.render(data);
    }
}