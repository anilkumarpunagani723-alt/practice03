(function () {
  "use strict";
  const form=document.querySelector(".demo-form");
  if(form)form.addEventListener("submit",event=>{event.preventDefault();if(!form.reportValidity())return;const output=form.querySelector(".form-notice");output.textContent=form.dataset.message;form.reset();});
})();
