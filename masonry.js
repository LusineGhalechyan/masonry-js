function Masonry(layoutOptions) {
  this.render(layoutOptions);
}

Masonry.prototype.render = function () {
  var innerWidth = window.innerWidth;
  var columnQty = parseInt(innerWidth / layoutOptions.columnWidth);
  console.log(`columnQty`, columnQty);
};

// console.log(`MASONRY`, masonry);
