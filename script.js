import imageArray from "./modules/content.js";
// console.log(imageArray);

let crtImage = 0; // by default first image of array

const switchImage = (imageClass) => {
  console.log(imageClass);
  let newImageClass = `image-${imageClass.toString()}`;
  let crtImageClass = `image-${crtImage.toString()}`;
  document.querySelector("." + crtImageClass).style.background = "white";
  // console.log(
  //   document.querySelector("." + crtImageClass).querySelector("h4").style
  // );
  document.querySelector("." + crtImageClass).querySelector("h4").style.color =
    "black";
  crtImage = imageClass;
  document.querySelector("." + newImageClass).style.background = "#1C6CFD";
  document.querySelector("." + newImageClass).querySelector("h4").style.color =
    "white";
  const printImage = imageArray.filter((item, index) => index === imageClass);
  // console.log(printImage);
  document.querySelector(".rightChild").innerHTML = `
  <div class="rightChildImage">
  <img
        src=${printImage[0].previewImage}
        alt="loading"
      />
    </img>
  </div>
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
    crtImage === index ? (newDiv.style.background = "#1C6CFD") : "";
    const divContent = `
    <img
          src=${item.previewImage}
          alt="loading"
        />
        <h4>${item.title}</h4>
    `;
    newDiv.innerHTML = divContent;
    console.log(newDiv);
    console.log(newDiv.querySelector("h4").scrollWidth);

    crtImage === index
      ? (newDiv.querySelector("h4").style.color = "white")
      : "";
    left.appendChild(newDiv);
    newDiv.addEventListener("click", function () {
      switchImage(index);
    });

    //     console.log(newDiv);
    if (crtImage === index) {
      const newDiv = document.createElement("div");
      newDiv.classList.add("rightChild");
      const divContent = `
      <div class="rightChildImage">
        <img
           src=${item.previewImage}
           alt="loading"
         />
      </div>
         <h4>${item.title}</h4>
     `;
      newDiv.innerHTML = divContent;
      // console.log(newDiv);
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

window.onload = () => {
  imageArray.forEach((item, index) => {
    let className = "image-" + index.toString();
    let scrollWidth = document
      .querySelector("." + className)
      .querySelector("h4").scrollWidth;
    let clientWidth = document
      .querySelector("." + className)
      .querySelector("h4").clientWidth;
    let maxSize = Math.floor((clientWidth / scrollWidth) * item.title.length);

    let crtTitle = item.title;
    if (clientWidth < scrollWidth) {
      crtTitle =
        crtTitle.slice(0, Math.floor((maxSize - 3) / 2)) +
        "..." +
        crtTitle.slice(crtTitle.length - Math.floor((maxSize - 3) / 2));
    }
    console.log(maxSize);
    document
      .querySelector("." + className)
      .querySelector("h4").innerText = `${crtTitle}`;
  });
};
