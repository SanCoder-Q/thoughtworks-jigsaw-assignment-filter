var NAME_DATA_URL = "https://docs.google.com/spreadsheets/d/1b4lNSqjw9dvROSuLfmc1abpouiEDZywyvbkyuQWcjqw/edit#gid=0";

$(function() {
    var whitelist = localStorage["jigsaw-filter"];
    if(whitelist && whitelist.length > 0) {
        $("#whitelist").val(JSON.parse(whitelist).join("\n"));
    }
});

$("#whitelist").focusin(function() {
    $(".message").css('visibility', 'hidden');
});

$("#save_btn").click(function() {
    var text = $("#whitelist").val();
    var list = text
        .split(/[\n\r|,]+/)
        .map(_ => _.trim())
        .filter(_ => _.length > 0);
    if(list && list.length > 0) {
        localStorage["jigsaw-filter"] = JSON.stringify(list);
        $(".message").css('visibility', 'visible');
    }
});
