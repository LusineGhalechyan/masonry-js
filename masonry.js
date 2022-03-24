function Masonry(layoutOptions) {
  this.render(layoutOptions);
}

// var images = JSON.parse(localStorage.getItem("images"));

function getImgMinHeight() {
  var allImgs = document.querySelectorAll("img");
  var minHeight = allImgs[0].clientHeight;
  var minHeightImage = allImgs[0];

  for (i = 1; i < allImgs.length; i++) {
    if (allImgs[i].clientHeight < minHeight) {
      minHeight = allImgs[i].clientHeight;
      minHeightImage = allImgs[i];
    }
  }
  return minHeightImage;
}

Masonry.prototype.render = function (layoutOptions) {
  var innerWidth = window.innerWidth;
  var innerHeight = window.innerHeight;
  console.log(`innerHeight`, innerHeight);
  var columnQty = parseInt(innerWidth / layoutOptions.columnWidth);
  console.log(`columnQty`, columnQty);

  document.addEventListener("DOMContentLoaded", function () {
    var allImgs = document.querySelectorAll("img");
    var imgWidth = parseInt(innerWidth / columnQty);
    allImgs.forEach((img) => img.setAttribute("width", imgWidth));
  });

  console.log(`INNER_columnQty`, columnQty);

  window.addEventListener(
    "resize",
    () => {
      const res = getImgMinHeight();
      console.log(`RES__`, res);
    },
    layoutOptions.autoResize
  );
};
