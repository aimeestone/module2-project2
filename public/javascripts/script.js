document.addEventListener("DOMContentLoaded", () => {});

const allPlants = document.getElementById("allPlants");

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
      .post("http://localhost:3000/plants/filter", {
        outside: outside,
        lighting: lighting,
        humidity: humidity,
        animals: animals,
        type: type
      })
      .then(dbRes => {
        allPlants.innerHTML = "";
        dbRes.data.forEach(plant => {
          allPlants.innerHTML += `<div class="plant-mini">
      <div class="plant-mini-img">
        <a href="/plants/${plant._id}"><img src="${plant.avatar}" alt="${plant.name}"></a>
      </div>
      <a href="/plants/${plant._id}">
        <h4>${plant.name}</h4>
      </a>
    </div>`;
        });
      })
      .catch(error => console.log(error));
  };
});

const heart = document.querySelectorAll(".fav");

heart.forEach(fav => {
  fav.onclick = function({ target }) {
    target.classList.toggle("is-active");
    let favarr = [];
    document.querySelectorAll(".fav").forEach(heart => {
      if (heart.classList.contains("is-active")) {
        favarr.push(heart.dataset.id);
      }
    });
    axios
      .post("http://localhost:3000/plants/fav", { hearts: favarr })
      .then(dbRes => console.log(dbRes))
      .catch(err => console.log(err));
  };
});
