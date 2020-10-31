let cards = document.querySelectorAll('.cards'), // получаем все наши карточки
    firstCard,
    secondCard,
    flipped = false, // переменная, которая означает что карточки еще не перевернуты
    counter = 0,
    flipCounter = document.querySelector('.scoreZone'),
    blocked = false, // переменная, которая показывает заблокирована карточка или нет
    btn = document.querySelector('button'),
    time = document.querySelector('.timerZone'),
    interval, // переменная для времени
    timer, // счетчик таймера
    gameOver = document.querySelector('.gameOver'),
    victory = document.querySelector('.victory'),
    newArr = []; //массив для проверки длины (количества) открытых карточек. Это надо для того, чтоб после того как будут открыты все карточки завершить игру;

btn.addEventListener('click', newGame);

function newGame() {
    flipCounter.innerText = '0' // обнуляем счетчик
    resetCards(); // обнуляем все
    timer = 60;
    counter = 0;
    newArr = []
    cards.forEach(item => {
        let index = Math.floor(Math.random() * cards.length); // получаем случайный порядок для карточки
        item.style.order = index // добавляем через стили новый порядковый номер карточки 
        item.classList.remove('flip') // удаляем класс, чтоб при нажатии на новую игру карточки переворачивались рубашкой вверх
        // item.classList.remove('trueCard') // обнуляем классы, которые добавляются ко всем выйгрышным карточкам, чтоб потом, когда все карточки будут с этим классом, вывести заставку "Вы выйграли"
    });
    cards.forEach(item => { //перебираем все наши карточки и "слушаем" на какую карточку нажал пользователь
        item.addEventListener('click', flipCard); // если пользователь нажал на карточку, тогда запускааем функцию flipCard()
    })
    interval = setInterval(timerMinus, 1000); // отсчитывает время
    // allCards()
}

cards.forEach(item => { //перебираем все наши карточки и "слушаем" на какую карточку нажал пользователь
    item.addEventListener('click', flipCard); // если пользователь нажал на карточку, тогда запускааем функцию flipCard()
})


function flipCard(e) { // функция поворота карточки
    if (blocked) return // если bloсked мы выходим из функции
    let elem = e.target.parentElement; //получаем саму карточку
    if (elem == firstCard) return;
    elem.classList.add('flip'); //добавляем класс для .cards

    if (!flipped) {
        firstCard = elem; //записываем значение перевернутой карточки в переменную
        flipped = true // означает что карточка уже перевернута
    } else {
        secondCard = elem; // после того, как нажали на следующую карточку, она минуя первое условие (if) попадает в переменную seconadCard
        flipped = false; // возвращаем flipped в исходное положение для следующих карточек
        checkCards() // функция проверки карточек
    }
}

function checkCards() { // функция которая проверяет совпадает ли data атрибут первой и второй карточки
    if (firstCard.dataset.card == secondCard.dataset.card) {
        blockCards() //блокирует выбывшие карточки

    } else {
        unflipCards() //переворачиваем обратно
    }
}

function blockCards() { // функция блокировки карточки
    firstCard.removeEventListener('click', flipCard) //запрещаем кликать по открывшейся первой карточке
    secondCard.removeEventListener('click', flipCard) //запрещаем кликать по открывшейся второй карточке
    // firstCard.classList.add('trueCard') // добавляем класс 'trueCard' чтоб потом, когда все карточки будут с этим классом вывести заставку "Вы выйграли"
    // secondCard.classList.add('trueCard') // добавляем класс 'trueCard' чтоб потом, когда все карточки будут с этим классом вывести заставку "Вы выйграли"
    counter++;
    newArr += 1
    console.log(newArr)
    setTimeout(() => {
        flipCounter.innerText = counter;
    }, 300) // задержка времени нужна для того, чтоб счет дописывался после открытия карточки. Если не задавать эту функцию setTimeout, тогда очки дописываються раньше, до открытия правильной карточки
    if (newArr.length == 10) { // проверка длины (количества) открытых карточек. Это надо для того, чтоб после того как будут открыты все карточки завершить игру;
        clearInterval(interval);
        victory.classList.add('victoryScreen')
        setTimeout(() => {
            victory.classList.remove('victoryScreen')
        }, 7000)
    }
}

function unflipCards() {
    blocked = true; // включаем блокировку осталных карточек, чтоб их нельзя было открыть
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        resetCards(); // Обнуляет все переменные
    }, 800) // задержка времени нужна для того, чтоб карточка вторая успевала появиться прежде чем перевернуться назад
}

// ------таймер-------

function timerMinus() {
    timer--;
    time.innerText = `00:${timer}`;
    if (timer == 0) {
        clearInterval(interval) //функция которая останавливает setInterval
        newGame
        gameOver.classList.add('allScreen') // добавляет заставку на экран "Вы проиграли"
    }
}

document.addEventListener('click', () => {
    if (gameOver.classList.contains('allScreen')) {
        // удаляет заставку с экрана "Вы проиграли" и "Вы вайграли"
        gameOver.classList.remove('allScreen');
    }
})


function resetCards() { // Обнуляет все переменные
    blocked = flipped = false; // равносильно как  blocked = false; flipped = false
    firstCard = secondCard = null;
}