// server.js
// Простой Node.js-сервер на Express.
// Отдаёт статику и генерирует страницы книг «на лету».

const express = require("express");
const fs = require("fs");
const path = require("path");
const { booksMock } = require("./books.js");

const app = express();
const PORT = 3000;

// ---------- 1. Раздача статики ----------
// Все файлы из корня проекта (laba1.css, script.js, logo.jpg, opening.html, laba1.html, books.js)
// будут доступны по своим именам: http://localhost:3000/laba1.css и т.д.
app.use(express.static(__dirname));

// ---------- 2. Утилита: слаг из названия ----------
// Нужна на случай, если slug не задан в books.js.
// «Тень горы» -> «ten-gory» (транслит + нижний регистр + дефисы).
function slugify(str) {
    const map = {
        а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e",
        ж: "zh", з: "z", и: "i", й: "y", к: "k", л: "l", м: "m",
        н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u",
        ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch",
        ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
        " ": "-", _: "-"
    };

    return str
        .toLowerCase()
        .split("")
        .map(ch => map[ch] !== undefined ? map[ch] : ch)
        .join("")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

// ---------- 3. Шаблон страницы книги ----------
const TEMPLATE_PATH = path.join(__dirname, "product-template.html");

function renderProductPage(book) {
    let html = fs.readFileSync(TEMPLATE_PATH, "utf-8");

    // Экранирование простых спецсимволов (на всякий случай)
    const esc = (s) => String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

    html = html
        .replace(/\{\{TITLE\}\}/g, esc(book.title))
        .replace(/\{\{TEXT\}\}/g,  esc(book.text))
        .replace(/\{\{GENRE\}\}/g, esc(book.genre))
        .replace(/\{\{AGE\}\}/g,   esc(book.age))
        .replace(/\{\{PRICE\}\}/g, esc(book.price))
        .replace(/\{\{COVER\}\}/g, book.cover); // cover — это CSS, не экранируем

    return html;
}

// ---------- 4. Генерация страниц книг «на лету» ----------
// Паттерн: /opening.html/<slug>.html
app.get("/opening.html/:slug.html", (req, res) => {
    const slug = req.params.slug;

    const book = booksMock.find(b => {
        const bookSlug = b.slug || slugify(b.title);
        return bookSlug === slug;
    });

    if (!book) {
        res.status(404).send(`
            <!DOCTYPE html>
            <html lang="ru">
            <head>
                <meta charset="UTF-8">
                <title>Книга не найдена</title>
                <link rel="stylesheet" href="/laba1.css">
            </head>
            <body>
                <section class="catalog-section" style="margin-top:120px;">
                    <div class="catalog-header">
                        <h2>Книга не найдена</h2>
                        <p class="catalog-subtitle">Такой книги нет в каталоге</p>
                    </div>
                    <div style="text-align:center;">
                        <a href="/opening.html" class="btn-ast-outline"
                           style="text-decoration:none; display:inline-block;">
                            ← Домой
                        </a>
                    </div>
                </section>
            </body>
            </html>
        `);
        return;
    }

    const html = renderProductPage(book);
    res.status(200).send(html);
});

// ---------- 5. Запуск ----------
app.listen(PORT, () => {
    console.log(`✅ Сервер запущен: http://localhost:${PORT}/opening.html`);
    console.log(`   Проверь страницу книги, например:`);
    console.log(`   http://localhost:${PORT}/opening.html/${booksMock[0].slug || slugify(booksMock[0].title)}.html`);
});