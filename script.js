import imageArray from "./modules/content.js";
// console.log(imageArray);

let crtImage = 0; // by default first image of array

const switchImage = (imageClass) => {
  console.log(imageClass);
  let newImageClass = `image-${imageClass.toString()}`;
  let crtImageClass = `image-${crtImage.toString()}`;
  document.querySelector("." + crtImageClass).style.background = "white";
  crtImage = imageClass;
  document.querySelector("." + newImageClass).style.background = "blue";
  const printImage = imageArray.filter((item, index) => index === imageClass);
  console.log(printImage);
  document.querySelector(".rightChild").innerHTML = `
  <img
        src=${printImage[0].previewImage}
        alt="loading"
      />
      <h4>${printImage[0].title}</h4>
  `;
};

// Rendered accroding to imageArray
const renderDefault = () => {
  const left = document.querySelector(".left");
  const right = document.querySelector(".right");
  imageArray.forEach((item, index) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("leftChild");
    newDiv.classList.add(`image-${index}`);
    crtImage === index ? (newDiv.style.background = "blue") : "";
    const divContent = `
    <img
          src=${item.previewImage}
          alt="loading"
        />
        <h4>${
          item.title.length > 33
            ? item.title.slice(0, 16) +
              "..." +
              item.title.slice(item.title.length - 15)
            : item.title
        }</h4>
    `;
    newDiv.innerHTML = divContent;
    left.appendChild(newDiv);
    newDiv.addEventListener("click", function () {
      switchImage(index);
    });

    //     console.log(newDiv);
    if (crtImage === index) {
      const newDiv = document.createElement("div");
      newDiv.classList.add("rightChild");
      const divContent = `
        <img
           src=${item.previewImage}
           alt="loading"
         />
         <h4>${item.title}</h4>
     `;
      newDiv.innerHTML = divContent;
      console.log(newDiv);
      right.appendChild(newDiv);
    }
  });
};

renderDefault();

// For ARROW KEY added event listener.
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && crtImage > 0) {
    switchImage(crtImage - 1);
  }
  if (event.key === "ArrowDown" && crtImage < imageArray.length - 1) {
    switchImage(crtImage + 1);
  }
});
