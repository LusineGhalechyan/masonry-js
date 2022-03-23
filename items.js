const IMAGES = [];
const IMAGE_QTY = 30;

for (let i = 1; i <= IMAGE_QTY; i++) {
  IMAGES.push({ image: `./images/${i}.jpeg` });
}

// console.log(`IMAGES`, IMAGES);
localStorage.setItem("images", JSON.stringify(IMAGES));
