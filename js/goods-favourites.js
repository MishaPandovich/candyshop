var cardButtonFavorite = document.querySelectorAll('.card__btn-favorite');

var ButtonFavoriteClickHandler = function(element) {
  element.addEventListener('click', function(evt) {
    evt.preventDefault();
    this.classList.toggle('card__btn-favorite--selected');
  });
}

for (var countBtnFavorite=0; countBtnFavorite<cardButtonFavorite.length-1; countBtnFavorite++ ) {
  ButtonFavoriteClickHandler(cardButtonFavorite[countBtnFavorite]);
}
