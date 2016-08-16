function updateTextArea() {
    var data = localStorage["jigsaw-filter"];
    if(data && data.length > 0) {
        $("#core_whitelist").val(JSON.parse(data).core.join(", "));
        $("#dedicated_whitelist").val(JSON.parse(data).dedicated.join(", "));
    }
}

$(updateTextArea);

$("#core_whitelist, #dedicated_whitelist").focusin(function() {
    $(".message").css('visibility', 'hidden');
});

$("#save_btn").click(function() {
    var core = $("#core_whitelist").val();
    var dedicated = $("#dedicated_whitelist").val();
    var [core_list, dedicated_list] = ["#core_whitelist", "#dedicated_whitelist"]
        .map(_ => $(_).val())
        .map(_ => _.split(/[\n\r|,]+/).map(_ => _.trim()).filter(_ => _.length > 0));
    if(core_list && dedicated_list) {
        localStorage["jigsaw-filter"] = JSON.stringify({core: core_list, dedicated: dedicated_list});
        updateTextArea();
        $(".message").css('visibility', 'visible');
    }
});
