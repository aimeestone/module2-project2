var gridProfile = document.getElementById("gridProfile");

/* Masonery Grid*/

var msnry = new Masonry(gridProfile, {
  itemSelector: ".grid-item",
  columnWidth: ".grid-sizer",
  gutter: ".gutter-sizer",
  percentPosition: true
});

imagesLoaded(gridProfile).on("progress", function() {
  // layout Masonry after each image loads
  msnry.layout();
});
