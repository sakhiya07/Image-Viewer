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
  document.querySelector(".right").innerHTML = `
  <img
        src=${printImage[0].previewImage}
        alt="loading"
      />
      <h4>${printImage[0].title}</h4>
  `;
};

const renderDefault = () => {
  const main = document.querySelector(".main");
  imageArray.forEach((item, index) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("left");
    newDiv.classList.add(`image-${index}`);
    crtImage === index ? (newDiv.style.background = "blue") : "";
    const divContent = `
    <img
          src=${item.previewImage}
          alt="loading"
        />
        <h4>${item.title}</h4>
    `;
    newDiv.innerHTML = divContent;
    main.appendChild(newDiv);
    console.log(main);
    newDiv.addEventListener("click", function () {
      switchImage(index);
    });

    //     console.log(newDiv);
    if (crtImage === index) {
      const newDiv = document.createElement("div");
      newDiv.classList.add("right");
      const divContent = `
     <img
           src=${item.previewImage}
           alt="loading"
         />
         <h4>${item.title}</h4>
     `;
      newDiv.innerHTML = divContent;
      //  console.log(newDiv);
      main.appendChild(newDiv);
    }
  });
};

renderDefault();

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && crtImage > 0) {
    switchImage(crtImage - 1);
  }
  if (event.key === "ArrowDown" && crtImage < imageArray.length - 1) {
    switchImage(crtImage + 1);
  }
});
