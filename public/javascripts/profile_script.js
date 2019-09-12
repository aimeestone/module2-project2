document.addEventListener("DOMContentLoaded", () => {
  saveFavPlants();
  heart();
});

var grid = document.getElementById("gridProfile");

/* Masonery Grid*/
var masonery = new Masonry(grid, {
  itemSelector: ".favgrid-item",
  columnWidth: ".favgrid-sizer",
  gutter: ".favgutter-sizer",
  percentPosition: true
});

imagesLoaded(grid).on("progress", function() {
  // layout Masonry after each image loads
  masonery.layout();
});

/*delete fav plants*/

function saveFavPlants() {
  axios
    .post("/plants/savefav")
    .then(response => {
      response.data.favorite_plants.forEach(plant => {
        document.querySelectorAll(".fav").forEach(heart => {
          if (heart.dataset.id === plant) {
            heart.classList.toggle("is-active");
          }
        });
      });
    })
    .catch(error => console.log(error));
}

function favoritesPlant(target) {
  target.classList.toggle("is-active");
  let favarr = [];
  document.querySelectorAll(".fav").forEach(heart => {
    if (heart.classList.contains("is-active")) {
      favarr.push(heart.dataset.id);
    }
  });
  console.log(favarr);
  axios
    .post("/plants/fav/delete", { hearts: favarr })
    .then(dbRes => {
      console.log("dbRes", dbRes);
      saveFavPlants();
      grid.innerHTML = "";
      grid.innerHTML = `<div class="favgrid-sizer"></div>
        <div class="favgutter-sizer"></div>`;
      dbRes.data.favorite_plants.forEach(plant => {
        grid.innerHTML += `
        <div class="favplant-mini grid-item">
      <i class="fav fas fa-heart white" data-id="${plant._id}"></i>
        <a class="favplantsInfo" href="/plants/${plant._id}"> <div>
          <span>${plant.name}</span>
      </div></a>
      <div class="favplant-mini-img">
       <img src="${plant.avatar}" alt="plant-img">
      </div>
    </div>`;
        heart();
        var masonery = new Masonry(grid, {
          itemSelector: ".favgrid-item",
          columnWidth: ".favgrid-sizer",
          gutter: ".favgutter-sizer",
          percentPosition: true
        });
        imagesLoaded(grid).on("progress", function() {
          // layout Masonry after each image loads
          masonery.layout();
        });
      });
      if (dbRes.length === 0) {
        grid.innerHTML = "";
      }
    })
    .catch(err => console.log(err));
}

function heart() {
  document.querySelectorAll(".fav").forEach(fav => {
    fav.onclick = function({ target }) {
      favoritesPlant(target);
    };
  });
}
