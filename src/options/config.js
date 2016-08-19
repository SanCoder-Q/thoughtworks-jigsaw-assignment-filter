let $ = require('jquery');

let updateTextArea = () => {
  chrome.storage.sync.get(["core", "dedicated"], function(data) {
    if(data.core && data.dedicated) {
      $("#core_whitelist").val(data.core.join(", "));
      $("#dedicated_whitelist").val(data.dedicated.join(", "));
    }
  });
};

$(updateTextArea);

$("#core_whitelist, #dedicated_whitelist").focusin(function() {
  $(".message").css('visibility', 'hidden');
});

$("#save_btn").click(() => {
  var [core_list, dedicated_list] = ["#core_whitelist", "#dedicated_whitelist"]
    .map(_ => $(_).val())
    .map(_ => _.split(/[\n\r|,]+/).map(_ => _.trim()).filter(_ => _.length > 0));
  if(core_list && dedicated_list) {
    chrome.storage.sync.set({core: core_list, dedicated: dedicated_list});
    updateTextArea();
    $(".message").css('visibility', 'visible');
  }
});
