const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;
let initialCount = 5;
const apiKey = "sXRDUvJrxBPCl8r84uvTbDnq2N27B_2XPsh41KfbED0";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function updateAPIUrlWithNewCount(picCount) {
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper Function to Set Attributes on DOM Elements

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
// Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    // Create <img> for photo
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    // Put <img> inside <a>, then put both inside image-container Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    if (isInitialLoad) {
      updateAPIUrlWithNewCount(30);
      isInitialLoad = false;
    }
  } catch (error) {
    console.log(error);
  }
}

// Check to see if scrolling near bottom of page, Load More Photos

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
getPhotos();
