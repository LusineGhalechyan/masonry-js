function Masonry(className, layoutOptions) {
  this.className = className;
  this.layoutOptions = layoutOptions;
  this.containerImgs(className);
  this.getMinHeightImgAndIndex(className);
  this.render(className, layoutOptions);
}

// var images = JSON.parse(localStorage.getItem("images"));

Masonry.prototype.containerImgs = function (className) {
  var container = document.querySelector(className);
  if (container) {
    return container.querySelectorAll("img");
  }
};

Masonry.prototype.getMinHeightImgAndIndex = function (className) {
  var allImgs = Masonry.prototype.containerImgs(className);
  if (allImgs) {
    var minHeight = allImgs[0].clientHeight;
    var minHeightImage = allImgs[0];
    var minImgAndIndex = {};
  }

  if (allImgs) {
    for (i = 1; i < allImgs.length; i++) {
      if (allImgs[i].clientHeight < minHeight) {
        minHeight = allImgs[i].clientHeight;
        minHeightImage = allImgs[i];
        minImgAndIndex[`${i}`] = minHeightImage;
      }
    }
  }

  return minImgAndIndex;
};

Masonry.prototype.render = function (className, layoutOptions) {
  var innerWidth = window.innerWidth;
  var columnQty = parseInt(innerWidth / layoutOptions.columnWidth);

  document.addEventListener("DOMContentLoaded", function () {
    var allImgs = Masonry.prototype.containerImgs(className);
    var imgWidth = parseInt(innerWidth / columnQty);
    allImgs.forEach((img) => img.setAttribute("width", imgWidth));
  });

  window.addEventListener(
    "resize",
    () => {
      const handle = setTimeout(() => {
        var allImgs = Masonry.prototype.containerImgs(className);
        var columnQty = parseInt(innerWidth / layoutOptions.columnWidth);

        for (let i = 0; i < allImgs.length; i++) {
          var getMinHeightImgAndIndex =
            masonry.__proto__.getMinHeightImgAndIndex(className);

          var getMinHeightImgKey =
            getMinHeightImgAndIndex && Object.keys(getMinHeightImgAndIndex)[0];
          var getAllImgs = Masonry.prototype.containerImgs(className);

          var getMinHeightImg = getAllImgs[getMinHeightImgKey];

          var getRightestEl = getAllImgs[columnQty - 1];

          // getMinHeightImg.after(getRightestEl);
        }
      }, 1000);

      return () => {
        clearTimeout(handle);
      };
    },
    layoutOptions.autoResize
  );
};
