const btn = document.getElementById("submitBtn");


btn.addEventListener("click", checkingPassword)

function checkingPassword() {
  const current_password = document.getElementById("current_password");
  const new_password = document.getElementById("new_password");
  const confirm_password = document.getElementById("confirm_password");

  //   empty(current_password)
  //   empty(new_password)
  //   empty(confirm_password)


  if (new_password.value.length < 7) return alert("Password length must be 8 characters");
  if (new_password.value !== confirm_password.value) return alert("Password doesn't match");
  
  const payLoad = {current_password: current_password.value,new_password: new_password.value,confirm_password: confirm_password.value,uuid};
  axios.post(`${url}verify`, payLoad)
  .then(res =>{
    if(res.data.message === "Password updated successfully"){
      showAlert({message: res.data.message, status: true})
    } else {
      showAlert({message: res.data.message, status: ""})
    }
  })
  .catch(err => showAlert({message: err, status: ""}))
}


function showAlert({message, status = false}){
  const color = status ? 'green' : "red"
  const alertMe = document.getElementById("alertMe")
  alertMe.innerHTML = ""
      alertMe.classList.remove("hideMe")
      alertMe.classList.add(color)
      alertMe.innerHTML = message
      setTimeout(() =>{
        alertMe.innerHTML = "";
        alertMe.classList.add("hideMe")
        alertMe.classList.remove(color)
      },4000)
}

function empty(element) {
  if (validator.isEmpty(element.value))
    return (
      (element.style.border = "1px solid red"),
      setTimeout(() => {
        (element.style.border = "none"),
        (element.style.borderBottom = "1px solid #303030");
      }, 3000),
      alert("Don't leave empty")
    );
}
