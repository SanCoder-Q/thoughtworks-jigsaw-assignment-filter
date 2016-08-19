let contains = (arr, row) => {
  let href = $(row).find(".name a").attr('href');
  return arr && arr.find(_ => href && href.endsWith("/"+_));
};
let coreLable =
    "<span class='core-symbol' style='display: inline; float: right; font-size: .9em; padding: 0'>Ⓒ</span>";

(function ($) {
  chrome.storage.sync.get(["core", "dedicated"], data => {
    if(data.core && data.dedicated) {
      var table = $("table#assignment");
      table.find("tbody tr")
        .map((i, l) => {
          if (contains(data.core, l)) {
            $(l).children(":first").append(coreLable);
          }
          return l;
        })
        .filter((i, l) => !contains(data.core.concat(data.dedicated), l))
        .each((i, l) => $(l).hide());
    }
  });
})(window.$);
