document.addEventListener("DOMContentLoaded", () => {
  userLoggedIn();
  saveFavPlants();
  heart();
});

const burger = document.querySelector("#mobile-icon");
const navMobile = document.getElementById("nav_mobile");
console.log(burger);

function toggleMobileNav(evt) {
  navMobile.classList.toggle("is-active");
}
burger.addEventListener("click", toggleMobileNav);

// const allPlants = document.getElementById("allPlants");
var grid = document.getElementById("grid");
var container = document.getElementById("container");
var user;

/*user is loggedIn*/

function userLoggedIn() {
  axios
    .post("/user")
    .then(dbRes => {
      if (dbRes.data === true) {
        return (user = true);
      }
      if (dbRes.data === false) {
        return (user = false);
      }
    })
    .catch(err => console.log(err));
}

function plantMini(plant, grid) {
  if (user === true) {
    grid.innerHTML += `
    <div class="plant-mini grid-item">
  <i class="fav fas fa-heart white" data-id="${plant._id}"></i>
    <a class="plantsInfo" href="/plants/${plant._id}"> <div>
      <span>${plant.name}</span>
  </div></a>
  <div class="plant-mini-img">
   <img src="${plant.avatar}" alt="plant-img">
  </div>
</div>`;
  } else {
    grid.innerHTML += `
    <div class="plant-mini grid-item">
    <a class="plantsInfo" href="/plants/${plant._id}"> <div>
      <span>${plant.name}</span>
  </div></a>
  <div class="plant-mini-img">
   <img src="${plant.avatar}" alt="plant-img">
  </div>
</div>`;
  }
}

/*filters*/

const filters = document.getElementById("filter").querySelectorAll("input");
filters.forEach(filter => {
  filter.onchange = function({ target }) {
    let outside = [];
    let lighting = [];
    let humidity = [];
    let animals = [];
    let type = [];
    filters.forEach(label => {
      if (label.checked) {
        console.log("label", label.value);
        if (label.name === "outside") {
          outside.push(label.value);
        }
        if (label.name === "lighting") {
          lighting.push(label.value);
        }
        if (label.name === "humidity") {
          humidity.push(label.value);
        }
        if (label.name === "animals") {
          animals.push(label.value);
        }
        if (label.name === "type_of_plant") {
          type.push(label.value);
        }
      }
    });
    axios
      .post("/plants/filter", {
        outside: outside,
        lighting: lighting,
        humidity: humidity,
        animals: animals,
        type: type
      })
      .then(dbRes => {
        grid.innerHTML = "";
        grid.innerHTML = `<div class="grid-sizer"></div>
        <div class="gutter-sizer"></div>`;
        dbRes.data.forEach(plant => {
          plantMini(plant, grid);
          const msnry = new Masonry(grid, {
            itemSelector: ".grid-item",
            columnWidth: ".grid-sizer",
            gutter: ".gutter-sizer",
            percentPosition: true
          });
          imagesLoaded(grid).on("progress", function() {
            // layout Masonry after each image loads
            msnry.layout();
          });
        });
        saveFavPlants();
        heart();
      })
      .catch(error => console.log(error));
  };
});

/*search bar*/

const searchBtn = document.getElementById("searchBtn");
console.log(searchBtn);
searchBtn.onclick = () => {
  console.log("coucou");
  const search = document.getElementById("search").value;
  axios
    .post("/plants/search", { search: search })
    .then(dbRes => {
      grid.innerHTML = "";
      grid.innerHTML = `<div class="grid-sizer"></div>
        <div class="gutter-sizer"></div>`;
      console.log(dbRes);
      dbRes.data.forEach(plant => {
        plantMini(plant, grid);
        const mas = new Masonry(grid, {
          itemSelector: ".grid-item",
          columnWidth: ".grid-sizer",
          gutter: ".gutter-sizer",
          percentPosition: true
        });
        imagesLoaded(grid).on("progress", function() {
          // layout Masonry after each image loads
          mas.layout();
        });
      });
      saveFavPlants();
      heart();
    })
    .catch(err => console.log(err));
};

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

/*add to favorites*/

function favoritesPlant(target) {
  target.classList.toggle("is-active");
  let favarr = [];
  document.querySelectorAll(".fav").forEach(heart => {
    if (heart.classList.contains("is-active")) {
      favarr.push(heart.dataset.id);
    }
  });
  axios
    .post("/plants/fav", { hearts: favarr })
    .then(dbRes => console.log(dbRes))
    .catch(err => console.log(err));
}

function heart() {
  document.querySelectorAll(".fav").forEach(fav => {
    fav.onclick = function({ target }) {
      favoritesPlant(target);
    };
  });
}

/* Masonery Grid*/

var msnry = new Masonry(grid, {
  itemSelector: ".grid-item",
  columnWidth: ".grid-sizer",
  gutter: ".gutter-sizer",
  percentPosition: true
});

imagesLoaded(grid).on("progress", function() {
  // layout Masonry after each image loads
  msnry.layout();
});
