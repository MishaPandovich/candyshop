'use strict';

var GOODS__NAMES = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
var GOODS__IMG = ['img/cards/gum-cedar.jpg', 'img/cards/gum-chile.jpg', 'img/cards/gum-eggplant.jpg', 'img/cards/gum-mustard.jpg', 'img/cards/gum-portwine.jpg', 'img/cards/gum-wasabi.jpg', 'img/cards/ice-cucumber.jpg', 'img/cards/ice-eggplant.jpg','img/cards/ice-garlic.jpg', 'img/cards/ice-italian.jpg', 'img/cards/ice-mushroom.jpg', 'img/cards/ice-pig.jpg','img/cards/marmalade-beer.jpg', 'img/cards/marmalade-caviar.jpg','img/cards/marmalade-corn.jpg', 'img/cards/marmalade-new-year.jpg', 'img/cards/marmalade-sour.jpg', 'img/cards/marshmallow-bacon.jpg', 'img/cards/marshmallow-beer.jpg', 'img/cards/marshmallow-shrimp.jpg', 'img/cards/marshmallow-spicy.jpg',
'img/cards/marshmallow-wine.jpg', 'img/cards/soda-bacon.jpg', 'img/cards/soda-celery.jpg', 'img/cards/soda-cob.jpg', 'img/cards/soda-garlic.jpg', 'img/cards/soda-peanut-grapes.jpg', 'img/cards/soda-russian.jpg'];
var GOODS__CONTENT__ITEM = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
var GOODS__COUNT = 26;

/*функция для получения элемента массива*/
var getRandomElement = function(arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

/*функция для получения числа*/
var getRandomInteger = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*функция для получения строки содержание*/
var getRandomStroke = function(arr) {
  var count = Math.floor(Math.random() * (10 - 4 + 1)) + 4;
  var resultStroke = '';
  for (var i = 0; i < count; i++) {
    var contentIndex = Math.floor(Math.random() * ((arr.length - 1) - 0 + 1)) + 0;
    resultStroke += arr[contentIndex] + ', ';
  }
  return resultStroke;
}

/*функция для получения обьектов*/
function GetObject() {
  this.name = getRandomElement(GOODS__NAMES);
  this.picture = getRandomElement(GOODS__IMG);
  this.amount = getRandomInteger(0, 20);
  this.price = getRandomInteger(100, 1500);
  this.weight = getRandomInteger(30, 300);
  this.rating = {
    value: getRandomInteger(1, 5),
    number: getRandomInteger(10, 900)
  };
  this.nutritionFacts = {
    sugar: getRandomInteger(0, 1),
    energy: getRandomInteger(70, 500),
    contents: getRandomStroke(GOODS__CONTENT__ITEM)
  }
}

var goods = [];
function getArr(){
  for (var i = 0; i < GOODS__COUNT; i++) {
    goods[i] = new GetObject();
  }

  return goods;
}
getArr();

/*Уберите у блока catalog__cards класс catalog__cards--load и скройте, добавлением класса visually-hidden блок catalog__load.*/
var parentElement = document.querySelector('.catalog__cards');
parentElement.classList.remove('catalog__cards--load');
var catalogLoad = document.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');

/*нахожу шаблон*/
var goodsTemplate = document.querySelector('#card').content.querySelector('.catalog__card');

/*создаем товары по по шаблону*/
var createGoods = function(goods) {
  var goodsElement = goodsTemplate.cloneNode(true);

  goodsElement.querySelector('.card__title').textContent = goods.name;
  goodsElement.querySelector('.card__img').src = goods.picture;
  goodsElement.querySelector('.card__img').alt = goods.name;
  goodsElement.querySelector('.card__price').textContent = goods.price;

  if (goods.amount > 5) {
    goodsElement.classList.add('card--in-stock');
  } else if ((goods.amount > 1) && (goods.amount < 5)) {
    goodsElement.classList.add('card--little');
  } else {
    goodsElement.classList.add('card--soon');
  }

  /*содержимое блока card-price*/
  var spanCurrency = document.createElement('span');
  spanCurrency.classList.add('card__currency');
  spanCurrency.textContent = '₽';
  var spanWeight = document.createElement('span');
  spanWeight.classList.add('card__weight');
  spanWeight.textContent = '/ ' + goods.weight +' Г';
  goodsElement.querySelector('.card__price').appendChild(spanCurrency);
  goodsElement.querySelector('.card__price').appendChild(spanWeight);

  /*блок рейтинга*/
  var rating = goodsElement.querySelector('.stars__rating');
  rating.textContent = 'Рейтинг:' + goods.rating.value + 'звёзд';
  goodsElement.querySelector('.star__count').textContent = goods.rating.number;

  if (goods.rating.value == 1) {
    goodsElement.querySelector('.stars__rating').classList.add('stars__rating--one');
  } else if (goods.rating.value == 2) {
    rating.classList.add('stars__rating--two');
  } else if (goods.rating.value == 3) {
    rating.classList.add('stars__rating--three');
  } else if (goods.rating.value == 4) {
    rating.classList.add('stars__rating--four');
  } else if (goods.rating.value == 5) {
    rating.classList.add('stars__rating--two');
  }

  /*содержание*/
  goodsElement.querySelector('.card__composition-list').textContent = goods.nutritionFacts.contents;

  if (goods.nutritionFacts.sugar) {
    goodsElement.querySelector('.card__characteristic').textContent = 'Содержит сахар' + goods.nutritionFacts.energy;
  } else {
    goodsElement.querySelector('.card__characteristic').textContent = 'Без сахар' + goods.nutritionFacts.energy;
  }

  return goodsElement;
}

/*создаем фрагмент*/
var fragment = document.createDocumentFragment();
for (var i = 0; i < GOODS__COUNT; i++) {
  fragment.appendChild(createGoods(goods[i]));
}

parentElement.appendChild(fragment);

/*
<template id="card">
    <article class="catalog__card card card--in-stock" tabindex="0">
      <header class="card__header">
        <h3 class="card__title">Чесночные сливки</h3>
        <img class="card__img" src="img/cards/ice-garlic.jpg" alt="Мороженное со вкусом чеснока" width="265" height="264">
        <span class="card__price">230
          <span class="card__currency">₽</span>
          <span class="card__weight">/ 70 Г</span>
        </span>
      </header>
      <div class="card__main">
        <div class="card__rating">
          <button class="card__btn-composition" type="button">Состав</button>
          <div class="card__stars stars">
            <span class="stars__rating stars__rating--five">Рейтинг: 5 звёзд</span>
            <span class="star__count">(300)</span>
          </div>
        </div>
        <div class="card__composition card__composition--hidden">
          <p class="card__characteristic">Без сахара. 133 ккал</p>
          <p class="card__composition-list">Молоко, сливки, вода, арамотизатор бекона, пищевой краситель.</p>
        </div>
        <p class="card__btns-wrap">
          <a class="card__btn-favorite" href="#">Добавить в избранное</a>
          <a class="card__btn" href="#">Добавить +1</a>
        </p>
      </div>
    </article>
  </template>
*/


/*функция для получения обьектов*/
function GetObjectOrder() {
  this.name = getRandomElement(GOODS__NAMES);
  this.picture = getRandomElement(GOODS__IMG);
  this.price = getRandomInteger(100, 1500);
}

var goodsOrder = [];
function getArrOrder(){
  for (var i = 0; i < GOODS__COUNT; i++) {
    goodsOrder[i] = new GetObjectOrder();
  }

  return goodsOrder;
}
getArrOrder();

/*нахожу шаблон*/
var goodsOrderTemplate = document.querySelector('#card-order').content.querySelector('.card-order');

/*создаем товары по по шаблону*/
var createGoodsOrder = function(goods) {
  var goodsElement = goodsOrderTemplate.cloneNode(true);

  goodsElement.querySelector('.card-order__title').textContent = goods.name;
  goodsElement.querySelector('.card-order__img').src = goods.picture;
  goodsElement.querySelector('.card-order__img').alt = goods.name;
  goodsElement.querySelector('.card-order__price').textContent = goods.price;


  return goodsElement;
}

/*создаем фрагмент*/
var fragmentOrder = document.createDocumentFragment();
for (var j = 0; j < GOODS__COUNT; j++) {
  fragmentOrder.appendChild(createGoodsOrder(goods[j]));
}

var parentElementOrder = document.querySelector('.goods__cards');
parentElementOrder.appendChild(fragmentOrder);

/*Удалите у блока goods__cards класс goods__cards--empty и скройте при этом блок goods__card-empty*/
parentElementOrder.classList.remove('goods__cards--empty');
document.querySelector('.goods__card-empty').classList.add('visually-hidden');

/*
<template id="card-order">
  <article class="goods_card card-order">
    <a href="#" class="card-order__close">Удалить товар</a>
    <header class="card-order__header">
      <h3 class="card-order__title">Нинзя-удар васаби</h3>
      <img src="img/cards/gum-wasabi.jpg" alt="Жевачка со вкусом васаби" class="card-order__img" width="265" height="264">
    </header>
    <div class="card-order__main">
      <p class="card-order__price">660 ₽</p>
      <div class="card-order__amount">
        <button type="button" class="card-order__btn card-order__btn--decrease">уменьшить</button>
        <label class="card-order__label">
          <span class="visually-hidden">Количество</span>
          <input class="card-order__count" name="gum-wasabi" value="2" type="text" id="card-order__gum-wasabi">
        </label>
        <button type="button" class="card-order__btn card-order__btn--increase">увеличить</button>
      </div>
    </div>
  </article>
</template>
*/
