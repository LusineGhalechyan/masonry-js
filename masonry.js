function Masonry(className, layoutOptions) {
  this.className = className;
  this.layoutOptions = layoutOptions;
  this.render();
  this.onResize();
  this.destroy();
}

Masonry.prototype.containerImgs = function () {
  if (this.allImgs) {
    return this.allImgs;
  }
  var container = document.querySelector(this.className);
  if (container) {
    this.allImgs = container.querySelectorAll("img");
    return this.allImgs;
  }
};

Masonry.prototype.getMinHeightIndexes = function (arr) {
  var array = [...arr];
  var indexes = [];
  for (let i = 0; i < array.length; i++) {
    var min = 10000;
    var minIndex = 0;
    for (let j = 0; j < array.length; j++) {
      if (array[j] < min && array[j] > 0) {
        min = array[j];
        minIndex = j;
      }
    }
    indexes.push(minIndex);
    array[minIndex] = -1;
  }
  return indexes;
};

Masonry.prototype.render = function () {
  var { layoutOptions } = this;
  var imgWidth = layoutOptions.columnWidth;
  var innerWidth =
    document.querySelector(this.className).clientWidth || window.innerWidth;
  var allImgs = Array.from(this.containerImgs());
  this.columnQty = parseInt(innerWidth / imgWidth);

  this.sliceImgs = allImgs.slice(0, this.columnQty);

  this.sliceImgs.forEach((img, index) => {
    img.setAttribute("width", imgWidth);
    img.style["position"] = "absolute";
    img.style["left"] = `${index * imgWidth}px`;
    img.style["top"] = `0px`;
  });

  var iterImgHeights = this.sliceImgs.map((e) => e.clientHeight);
  for (let j = 0; j < allImgs.length; j += this.columnQty) {
    var indexes = this.getMinHeightIndexes(iterImgHeights);
    for (let i = 0; i < indexes.length; i++) {
      var currEl = allImgs[i + j + this.columnQty];
      if (!currEl) continue;
      currEl.setAttribute("width", imgWidth);
      currEl.style["position"] = "absolute";
      currEl.style["left"] = `${indexes[i] * imgWidth}px`;
      currEl.style["top"] = `${iterImgHeights[indexes[i]]}px`;
      iterImgHeights[indexes[i]] += currEl.clientHeight;
    }
  }
};

Masonry.prototype.onResize = function () {
  clearTimeout(this.resizeTimer);
  this.resizeTimer = setTimeout(() => {
    if (this.layoutOptions.autoResize) {
      window.addEventListener("resize", () => {
        this.render();
      });
    }
  }, 300);
};

Masonry.prototype.destroy = function () {
  if (this.layoutOptions.autoResize) {
    window.removeEventListener("resize", this.onResize);
  }
};
