function Masonry(className, layoutOptions) {
  this.className = className;
  this.layoutOptions = layoutOptions;
  Masonry.prototype.render(className, layoutOptions);
}

// var images = JSON.parse(localStorage.getItem("images"));

function getMinHeightImgAndIndex() {
  var allImgs = document.querySelectorAll("img");
  var minHeight = allImgs[0].clientHeight;
  var minHeightImage = allImgs[0];
  var minImgAndIndex = {};

  for (i = 1; i < allImgs.length; i++) {
    if (allImgs[i].clientHeight < minHeight) {
      minHeight = allImgs[i].clientHeight;
      minHeightImage = allImgs[i];
      minImgAndIndex[`${i}`] = minHeightImage;
    }
  }
  return minImgAndIndex;
}

Masonry.prototype.render = function (className, layoutOptions) {
  var innerWidth = window.innerWidth;
  var columnQty = parseInt(innerWidth / layoutOptions.columnWidth);

  document.addEventListener("DOMContentLoaded", function () {
    var allImgs = document.querySelectorAll("img");

    var imgWidth = parseInt(innerWidth / columnQty);
    allImgs.forEach((img) => img.setAttribute("width", imgWidth));
  });

  window.addEventListener(
    "resize",
    () => {
      var allImgs = document.querySelectorAll("img");
      var columnQty = parseInt(innerWidth / layoutOptions.columnWidth);

      for (let i = 0; i < allImgs.length; i++) {
        var res = getMinHeightImgAndIndex();
        var getResKey = Object.keys(res)[0];
        var getMinHeightImg = document.querySelectorAll("img")[getResKey];
        var getRightestEl = document.querySelectorAll("img")[columnQty - 1];

        getMinHeightImg.after(getRightestEl);
      }
    },
    layoutOptions.autoResize
  );
};
