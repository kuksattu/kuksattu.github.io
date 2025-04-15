document.querySelectorAll(".slider_page.first").forEach(element => { 
    element.onclick = clickEvent;
});

document.querySelectorAll(".slider").forEach(slider => {
  slider.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && e.target.classList.contains("slider")) {
      e.preventDefault();
      slider.querySelector(".slider_page.first").click();
    }
  });
});

function clickEvent (e) {
  const element = e.target.closest(".slider");
  const width = element.offsetWidth;

  document.querySelectorAll("ol.slider").forEach(slider => {
    closeAndClear(slider);
  });

  Array.from(element.children).forEach(element => {
    element.style.transform = `translate(${-width}px)`;
    element.querySelectorAll("input").forEach(input => {
      input.removeAttribute("tabindex");
    });
  });
}


function goBack(button){
  const slider = button.closest(".slider")
  const inputs = Array.from(button.form.children).filter(input => input.getAttribute("type") === "text");
  const templateName = button.getAttribute("template");
  var substitutions = {};
  var failed = false;

  inputs.forEach(input => {
    var isValid = /^[a-zA-Z0-9_]+$/.test(input.value);
    if(!isValid) failed = true;
    substitutions[input.name] = input.value;
  })

  if(failed) {
    return;
  }

  console.log(templateName, substitutions);

  closeAndClear(slider);
  download(templateName, substitutions);
}

function closeAndClear(slider){
    const inputs = Array.from(slider.querySelector("form").children);
    inputs.forEach(input => {
      if (input.getAttribute("type") === "text") input.value = "";
      input.setAttribute("tabindex", -1);
    });
    Array.from(slider.children).forEach(page => {
        page.style.transform = "";
    })
}