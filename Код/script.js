window.onload = function () {

    const outputElement = document.getElementById("result");

    if (outputElement) {
        let a = '';                    // Первое число
        let b = '';                    // Второе число
        let expressionResult = '';     // Результат вычисления
        let selectedOperation = null;  // Выбранная операция

        const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

        function onDigitButtonClicked(digit) {
            // Если операция не выбрана — работаем с первым числом (a)
            if (!selectedOperation) {
                if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                    a += digit;
                }
                outputElement.innerHTML = a;
            }
            // Иначе — работаем со вторым числом (b)
            else {
                if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                    b += digit;
                    outputElement.innerHTML = b;
                }
            }
        }

        // ---------- Обработчики для цифровых кнопок ----------
        digitButtons.forEach(button => {
            button.onclick = function () {
                const digitValue = button.innerHTML;
                onDigitButtonClicked(digitValue);
            }
        });

        document.getElementById("btn_op_mult").onclick = function () {
            if (a === '') return;
            selectedOperation = 'x';
        }
        document.getElementById("btn_op_plus").onclick = function () {
            if (a === '') return;
            selectedOperation = '+';
        }
        document.getElementById("btn_op_minus").onclick = function () {
            if (a === '') return;
            selectedOperation = '-';
        }
        document.getElementById("btn_op_div").onclick = function () {
            if (a === '') return;
            selectedOperation = '/';
        }

        const squareBtn = document.getElementById("btn_op_square");
        if (squareBtn) {
            squareBtn.onclick = function () {
                if (a === '') return;                  
                const num = Number(a);                 
                const squared = num * num;             
                a = squared.toString();                
                b = '';                                
                selectedOperation = null;              
                outputElement.innerHTML = a;           
            }
        }

        
        document.getElementById("btn_op_clear").onclick = function () {
            a = '';
            b = '';
            selectedOperation = null;
            expressionResult = '';
            outputElement.innerHTML = 0;
        }

        
        const signBtn = document.getElementById("btn_op_sign");
        if (signBtn) {
            signBtn.onclick = function () {
                if (!selectedOperation) {
                    if (a === '') return;
                    a = (Number(a) * -1).toString();
                    outputElement.innerHTML = a;
                } 
                else {
                    if (b === '') return;
                    b = (Number(b) * -1).toString();
                    outputElement.innerHTML = b;
                }
            }
        }

        const percentBtn = document.getElementById("btn_op_percent");
        if (percentBtn) {
            percentBtn.onclick = function () {
                if (!selectedOperation) {
                    if (a === '') return;
                    a = (Number(a) / 100).toString();
                    outputElement.innerHTML = a;
                } else {
                    if (b === '') return;
                    b = (Number(b) / 100).toString();
                    outputElement.innerHTML = b;
                }
            }
        }

        document.getElementById("btn_op_equal").onclick = function () {
            if (a === '' || b === '' || !selectedOperation) return;

            switch (selectedOperation) {
                case 'x':
                    expressionResult = (+a) * (+b);
                    break;
                case '+':
                    expressionResult = (+a) + (+b);
                    break;
                case '-':
                    expressionResult = (+a) - (+b);
                    break;
                case '/':
                    expressionResult = (+a) / (+b);
                    break;
                default:
                    break;
            }

            a = expressionResult.toString();
            b = '';
            selectedOperation = null;
            outputElement.innerHTML = a;
        };
    }


    
    const booksMock = [
        {
            id: 1,
            title: "Тень горы",
            text: "Продолжение культового романа «Шантарам» о жизни и свободе.",
            genre: "Роман",
            age: "18+",
            price: 890,
            cover: "linear-gradient(135deg, #27ae60, #1e8449)"
        },
        {
            id: 2,
            title: "Дюна",
            text: "Легендарная сага о пустынной планете Арракас и специи.",
            genre: "Фантастика",
            age: "16+",
            price: 1250,
            cover: "linear-gradient(135deg, #3498db, #2980b9)"
        },
        {
            id: 3,
            title: "Мастер и Маргарита",
            text: "Мистический роман Михаила Булгакова о любви и свободе.",
            genre: "Классика",
            age: "16+",
            price: 720,
            cover: "linear-gradient(135deg, #e67e22, #d35400)"
        },
        {
            id: 4,
            title: "Гарри Поттер и философский камень",
            text: "Первая книга о юном волшебнике и школе Хогвартс.",
            genre: "Фэнтези",
            age: "6+",
            price: 980,
            cover: "linear-gradient(135deg, #9b59b6, #8e44ad)"
        },
        {
            id: 5,
            title: "1984",
            text: "Антиутопия Джорджа Оруэлла о тотальном контроле и свободе мысли.",
            genre: "Антиутопия",
            age: "16+",
            price: 640,
            cover: "linear-gradient(135deg, #e74c3c, #c0392b)"
        },
        {
            id: 6,
            title: "Sapiens. Краткая история человечества",
            text: "Как Homo sapiens стал господствующим видом на Земле.",
            genre: "Научпоп",
            age: "12+",
            price: 1100,
            cover: "linear-gradient(135deg, #1abc9c, #16a085)"
        },
        {
            id: 7,
            title: "Маленький принц",
            text: "Философская сказка о добре, дружбе и ответственности.",
            genre: "Сказка",
            age: "6+",
            price: 550,
            cover: "linear-gradient(135deg, #f39c12, #e67e22)"
        },
        {
            id: 8,
            title: "Шантарам",
            text: "История беглеца, нашедшего дом в сердце Бомбея.",
            genre: "Роман",
            age: "18+",
            price: 950,
            cover: "linear-gradient(135deg, #34495e, #2c3e50)"
        }
    ];

    const catalogState = {
        books: [...booksMock],
        filterText: "",
        mode: "list"        
    };

    const catalogGrid     = document.getElementById("catalog-grid");
    const catalogSearch   = document.getElementById("catalog-search");
    const catalogAddBtn   = document.getElementById("catalog-add");
    const catalogProduct  = document.getElementById("catalog-product");
    const catalogListWrap = document.getElementById("catalog-list-wrap");

    if (catalogGrid && catalogSearch && catalogAddBtn) {

     
        function renderCatalog() {
            if (catalogState.mode !== "list") return;

            catalogListWrap.style.display = "";
            catalogProduct.style.display = "none";

            catalogGrid.innerHTML = "";

            const query = catalogState.filterText.trim().toLowerCase();
            const filtered = catalogState.books.filter(function (book) {
                return (
                    book.title.toLowerCase().includes(query) ||
                    book.genre.toLowerCase().includes(query) ||
                    book.text.toLowerCase().includes(query)
                );
            });

            if (filtered.length === 0) {
                catalogGrid.innerHTML =
                    '<div class="catalog-empty">Ничего не найдено</div>';
                return;
            }

            filtered.forEach(function (book) {
                const card = document.createElement("div");
                card.className = "book-card";
                card.dataset.id = book.id;
                card.innerHTML = `
                    <div class="book-cover" style="background: ${book.cover};">
                        <span class="book-cover-title">${book.title}</span>
                    </div>
                    <div class="book-info">
                        <h3 class="book-title">${book.title}</h3>
                        <p class="book-desc">${book.text}</p>
                        <div class="book-meta">
                            <span class="book-genre">${book.genre}</span>
                            <span class="book-age">${book.age}</span>
                        </div>
                        <div class="book-price">${book.price} ₽</div>
                        <div class="card-actions">
                            <button class="btn-ast btn-open" data-id="${book.id}">
                                Подробнее
                            </button>
                            <button class="btn-danger-ast btn-delete" data-id="${book.id}">
                                Удалить
                            </button>
                        </div>
                    </div>
                `;
                catalogGrid.appendChild(card);
            });

            // Обработчики кнопок внутри карточек
            catalogGrid.querySelectorAll(".btn-open").forEach(function (btn) {
                btn.addEventListener("click", function (e) {
                    e.stopPropagation();
                    openProduct(Number(btn.dataset.id));
                });
            });

            catalogGrid.querySelectorAll(".btn-delete").forEach(function (btn) {
                btn.addEventListener("click", function (e) {
                    e.stopPropagation();
                    deleteBook(Number(btn.dataset.id));
                });
            });
        }

        // ---------- Фильтрация ----------
        catalogSearch.addEventListener("input", function (e) {
            catalogState.filterText = e.target.value;
            renderCatalog();
        });

        // ---------- Добавить книгу (копия первой) ----------
        catalogAddBtn.addEventListener("click", function () {
            if (catalogState.books.length === 0) return;

            const first = catalogState.books[0];
            const maxId = catalogState.books.reduce(function (max, b) {
                return Math.max(max, b.id);
            }, 0);

            catalogState.books.push(Object.assign({}, first, {
                id: maxId + 1,
                title: first.title + " (копия)"
            }));

            renderCatalog();
        });

        // ---------- Удалить книгу ----------
        function deleteBook(id) {
            catalogState.books = catalogState.books.filter(function (b) {
                return b.id !== id;
            });
            renderCatalog();
        }

        // ---------- Открыть страницу подробнее ----------
        function openProduct(id) {
            const book = catalogState.books.find(function (b) {
                return b.id === id;
            });
            if (!book) return;

            catalogState.mode = "product";
            catalogListWrap.style.display = "none";
            catalogProduct.style.display = "";

            catalogProduct.innerHTML = `
                <button id="catalog-back" class="btn-ast-outline" type="button">
                    ← Домой
                </button>

                <div class="product-card-wrap">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <div class="product-cover" style="background: ${book.cover};">
                                ${book.title}
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h3 class="card-title" style="color:#1e8449;">${book.title}</h3>
                                <p class="card-text">${book.text}</p>
                                <div class="book-meta" style="justify-content:flex-start; gap:10px;">
                                    <span class="book-genre">${book.genre}</span>
                                    <span class="book-age">${book.age}</span>
                                </div>
                                <div class="book-price" style="text-align:left; border:none; padding-top:0;">
                                    ${book.price} ₽
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById("catalog-back").addEventListener("click", function () {
                catalogState.mode = "list";
                renderCatalog();
            });
        }

        renderCatalog();
    }
};
