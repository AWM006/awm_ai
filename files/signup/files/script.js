let check = document.querySelector(".tick");
let password = document.querySelector(".pass");
let password2 = document.querySelector(".repass");
let form = document.querySelector(".mainform");
const pupils = document.querySelectorAll(".eye .pupil");
let submit = document.querySelector(".submit");


 let checkpassword = () =>{
  if(password.value === password2.value && password.value !== ""){
    submit.disabled = false;
    console.log("matched");
  }
  else{
    submit.disabled = true;
    console.log("not matched");
  }
} 
password.addEventListener('input',()=>{
  checkpassword();
});
password2.addEventListener('input',()=>{
 checkpassword();
});

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
        password2.type = "text";
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
      password2.type = "password";
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

