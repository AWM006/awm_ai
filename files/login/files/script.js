let check = document.querySelector(".tick");
let password = document.querySelector(".pass");
let form = document.querySelector(".mainform");
const pupils = document.querySelectorAll(".eye .pupil");

form.addEventListener("mouseover", (e) => {
  pupils.forEach((pupil) => {
    var rect = pupil.getBoundingClientRect();
    var x = (e.pageX - rect.left) / 30 + "px";
    var y = (e.pageY - rect.top) / 30 + "px";
    pupil.style.transform = "translate3d(" + x + "," + y + ", 0px)";
  });
});

check.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
        password.type = "text";
        form.addEventListener("mouseover", (e) => {
          pupils.forEach((pupil) => {
            var rect = pupil.getBoundingClientRect();
            var x = (e.pageX - rect.left) / 30 + "px";
            var y = (e.pageY - rect.top) / 30 + "px";
            pupil.style.transform = "translate3d(" + 0 + "," + 0 + ", 0px)";
          });
        });
      } 
    
    
    
    
    else {
      password.type = "password";
      form.addEventListener("mouseover", (e) => {
        pupils.forEach((pupil) => {
          var rect = pupil.getBoundingClientRect();
          var x = (e.pageX - rect.left) / 30 + "px";
          var y = (e.pageY - rect.top) / 30 + "px";
          pupil.style.transform = "translate3d(" + x + "," + y + ", 0px)";
        });
      });
    }
  })

