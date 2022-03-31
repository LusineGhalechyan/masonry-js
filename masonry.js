function Masonry(className, layoutOptions) {
  this.className = className;
  this.layoutOptions = layoutOptions;
  this.render();
}

Masonry.prototype.containerImgs = function () {
  if (this.allImgs) {
    return this.allImgs;
  }
  container = document.querySelector(this.className);
  if (container) {
    this.allImgs = container.querySelectorAll("img");
    return this.allImgs;
  }
};

Masonry.prototype.getMinHeightImgAndIndex = function () {
  allImgs = this.containerImgs();
  if (allImgs) {
    minHeight = allImgs[0].clientHeight;
    minHeightImage = allImgs[0];
    minHeightImg = {};
  }

  if (allImgs) {
    for (i = 1; i < allImgs.length; i++) {
      if (columnQtyImgs[i].clientHeight < minHeight) {
        minHeight = allImgs[i].clientHeight;
        minHeightImage = allImgs[i];
        minHeightImg[`${i}`] = [minHeightImage, minHeight];
      }
    }
  }
  return minHeightImg;
};

Masonry.prototype.getMinValueIndex = function (arr) {
  minEl = arr[0];
  index = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < minEl) {
      minEl = arr[i];
      index = i;
    }
  }
  return index;
};

Masonry.prototype.render = function () {
  self = this;
  layoutOptions = this.layoutOptions;
  columnWidth = layoutOptions.columnWidth;
  innerWidth = window.innerWidth;
  allImgs = Array.from(this.containerImgs());

  document.addEventListener(
    "DOMContentLoaded",
    function () {
      imgWidth = columnWidth;
      allImgs.forEach((img) => img.setAttribute("width", imgWidth));
      columnQty = parseInt(innerWidth / layoutOptions.columnWidth);
      imgHeights = allImgs.map((img) => img.clientHeight);

      iterImgHeights = [];
      for (let j = 0; j < imgHeights.length; j += columnQty) {
        for (let i = 0; i < columnQty; i++) {
          iterImgHeights.push(imgHeights[i + j]);
        }
        for (let i = 0; i < columnQty; i++) {
          minIndex = self.getMinValueIndex(iterImgHeights);
          if (allImgs[i + j + columnQty]) {
            allImgs[i + j + columnQty].style["position"] = "absolute";
            allImgs[i + j + columnQty].style[
              "top"
            ] = `${iterImgHeights[minIndex]}px`;
            allImgs[i + j + columnQty].style["left"] = `${
              minIndex * imgWidth
            }px`;
            iterImgHeights[minIndex] =
              iterImgHeights[minIndex] +
              allImgs[i + j + columnQty].clientHeight;
          }
        }
      }
    },
    { once: true }
  );

  Masonry.prototype.onResize = function () {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.render();
    }, 300);
  };

  if (this.layoutOptions.autoResize) {
    window.addEventListener("resize", () => {
      this.onResize;
    });
  }

  Masonry.prototype.destroy = function () {
    if (this.layoutOptions.autoResize) {
      window.removeEventListener("resize", this.onResize);
    }
  };

  return;

  var handle;
  if (this.layoutOptions.autoResize) {
    window.addEventListener("resize", () => {
      clearTimeout(handle);
      handle = setTimeout(() => {
        this.positionGridImages();
        columnQty = parseInt(innerWidth / layoutOptions.columnWidth);

        for (let i = 0; i < allImgs.length; i++) {
          getMinHeightImg = this.getMinHeightImgAndIndex();
          console.log(`getMinHeightImg`, getMinHeightImg);

          getMinHeightImgKey =
            getMinHeightImg && Object.keys(getMinHeightImg)[0];

          console.log(`getMinHeightImgKey`, getMinHeightImgKey);
          getPrevImgsWidth = getMinHeightImgKey * columnWidth;
          sumTheWidthOfMinHeightImgPrevImgs = getPrevImgsWidth.toString();
          getMinHeight = getMinHeightImg[getMinHeightImgKey][1].toString();
          getRightestEl = allImgs[columnQty - 1];

          getRightestEl.style["position"] = "relative";
          getRightestEl.style[
            "left"
          ] = `${sumTheWidthOfMinHeightImgPrevImgs}px`;
          getRightestEl.style["top"] = `${getMinHeight}px`;
        }
      }, 300);
    });
  }
};
