const images = JSON.parse(localStorage.getItem("images"));

function Masonry() {
  // Create and Render DOM elements
  const rootContainer = document.querySelector(".masonry");
  const masonryContainer = document.createElement("div");
  masonryContainer.classList.add("masonry__container");
  rootContainer.appendChild(masonryContainer);

  // const masonryColumn = document.createElement("div");
  // masonryColumn.classList.add("masonry__column");
  // masonryContainer.appendChild(masonryColumn);

  // Create image with src attributes and render in DOM
  // const imgs = [];

  // for (let i = 0; i < images.length; i++) {
  //   imgs.push(new Image());
  //   const srcVal = images[i].image;
  //   imgs[i].setAttribute("src", srcVal);
  //   imgs[i].setAttribute("class", "masonry__image");
  //   masonryColumn.appendChild(imgs[i]);
  // }

  // rootContainer.appendChild(masonryContainer);

  function render(mainClass, layoutOptions) {
    // resize.prototype.render = function (mainClass, layoutOptions) {
    rootContainer.innerHTML = "";
    let columnWrappers = {};
    const innerWidth = window.innerWidth;
    let columnQty = parseInt(innerWidth / layoutOptions.columnWidth);
    for (let i = 0; i < columnQty; i++) {
      columnWrappers[`column${i}`] = [];
    }

    for (let i = 0; i < images.length; i++) {
      let column = i % columnQty;
      columnWrappers[`column${column}`].push(images[i]);
    }

    for (let i = 0; i < columnQty; i++) {
      let columnValues = columnWrappers[`column${i}`];
      const masonryColumn = document.createElement("div");
      masonryColumn.classList.add("masonry__column");

      columnValues.forEach((img) => {
        const image = document.createElement("img");
        image.src = img.image;
        image.classList.add("masonry__image");
        masonryColumn.appendChild(image);
      });

      rootContainer.appendChild(masonryColumn);
    }
  }
  render(4, LAYOUT_OPTIONS);
}

// resize.prototype = Masonry;

// function resize() {
//   render(mainClass, LAYOUT_OPTIONS);
// }

const COLUMN_WIDTH = 200;

const LAYOUT_OPTIONS = {
  columnWidth: COLUMN_WIDTH,
  autoResize: true | false,
};

Masonry.prototype.render = function () {
  render((masonryContainer = ".masonry"), LAYOUT_OPTIONS);
};

Masonry();
