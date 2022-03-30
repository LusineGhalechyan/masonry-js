function Masonry(className, layoutOptions) {
  this.className = className;
  this.layoutOptions = layoutOptions;
  this.render();
  if (this.layoutOptions.autoResize) {
    window.addEventListener("resize", this.onResize);
  }
}

// var images = JSON.parse(localStorage.getItem("images"));

Masonry.prototype.onResize = function () {
  clearTimeout(this.resizeTimer);
  this.resizeTimer = setTimeout(() => {
    this.render();
  }, 300);
};

Masonry.prototype.destroy = function () {
  if (this.layoutOptions.autoResize) {
    window.removeEventListener("resize", this.onResize);
  }
};

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
      if (allImgs[i].clientHeight < minHeight) {
        minHeight = allImgs[i].clientHeight;
        minHeightImage = allImgs[i];
        minHeightImg[`${i}`] = [minHeightImage, minHeight];
      }
    }
  }

  return minHeightImg;
};

Masonry.prototype.render = function () {
  layoutOptions = this.layoutOptions;
  columnWidth = layoutOptions.columnWidth;
  innerWidth = window.innerWidth;
  allImgs = this.containerImgs();

  document.addEventListener(
    "DOMContentLoaded",
    function () {
      imgWidth = columnWidth;
      allImgs.forEach((img) => img.setAttribute("width", imgWidth));
    },
    { once: true }
  );

  return;

  var handle;
  if (this.layoutOptions.autoResize) {
    window.addEventListener(
      "resize",
      () => {
        clearTimeout(handle);
        handle = setTimeout(() => {
          this.positionGridImages();
          columnQty = parseInt(innerWidth / layoutOptions.columnWidth);

          for (let i = 0; i < allImgs.length; i++) {
            getMinHeightImg = this.getMinHeightImgAndIndex();

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

            // getMinHeightImg.after(getRightestEl);
          }
        }, 300);
      }
      // layoutOptions.autoResize
    );
  }
};
