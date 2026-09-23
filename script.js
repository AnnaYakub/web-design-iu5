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

    const carousel = document.getElementById("carousel");
    const prevBtn  = document.getElementById("btn_prev");
    const nextBtn  = document.getElementById("btn_next");

    if (carousel && prevBtn && nextBtn) {
        const cards = carousel.querySelectorAll(".book-card");

        function getScrollStep() {
            if (cards.length < 2) return carousel.clientWidth;
            const card = cards[0];
            const style = window.getComputedStyle(carousel);
            const gap = parseFloat(style.columnGap || style.gap) || 20;
            return card.offsetWidth + gap;
        }

        function scrollByCards(direction) {
            carousel.scrollBy({
                left: direction * getScrollStep(),
                behavior: "smooth"
            });
        }

        prevBtn.onclick = () => scrollByCards(-1);
        nextBtn.onclick = () => scrollByCards(1);

        function updateArrows() {
            prevBtn.disabled = carousel.scrollLeft <= 5;
            nextBtn.disabled =
                carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 5;
        }

        carousel.addEventListener("scroll", updateArrows);
        window.addEventListener("resize", updateArrows);
        updateArrows();


        // Управление стрелками клавиатуры
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft")  scrollByCards(-1);
            if (e.key === "ArrowRight") scrollByCards(1);
        });
    }
};