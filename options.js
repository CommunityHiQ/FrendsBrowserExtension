/*  function saveOptions(e) {
  e.preventDefault();
  chrome.storage.local.set({
    color: document.querySelector("#color").value
  });
}

*/

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#color").value = result.color || "vanilla";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }
chrome.storage.local.get("color", function(items){
          console.log(`Current color theme: ${items.color}`);
});

  // var getting = chrome.storage.local.get("color");
  // getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
// document.querySelector("form").addEventListener("submit", saveOptions);


document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('vanillaColor');
    // onClick's logic below:
    button.addEventListener('click', function() {
		chrome.storage.local.set({"color" : "vanilla"});


    });
});

document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('darkColor');
    // onClick's logic below:
    button.addEventListener('click', function() {
		chrome.storage.local.set({"color" : "dark"});


    });
});


document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('lightColor');
    // onClick's logic below:
    button.addEventListener('click', function() {
		chrome.storage.local.set({"color" : "light"});


    });
});