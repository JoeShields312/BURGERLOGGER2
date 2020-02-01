$(function() {
    $(".create-form").on("submit", function(event) {
      event.preventDefault();
  //creates new burger
      let newBurger = {
        burger_name: $("#newburger")
          .val()
          .trim(),
        devoured: 0
      };

      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(function() {
        console.log("Added new burger");
        location.reload();
      });
    });
  
    $(".eatburger").on("click", function(event) {
      event.preventDefault();

      let id = $(this).data("id");
      let devouredState = {
        devoured: 1
      };
      //Updates if the burger was devoured or not
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: devouredState
      }).then(function() {
        console.log("Burger devoured");
        location.reload();
      });
    });
  
    $(".destroyburger").on("click", function(event) {
      event.preventDefault();
      
      let id = $(this).data("id");
  
      // creates the delete action
      $.ajax({
        type: "DELETE",
        url: "/api/burgers/" + id
      }).then(location.reload());
    });
  });