window.onload = function() {
    if (window.jQuery) {  
        console.log('All set');
        $("#getFeeds").click(function () {
            console.log('clicked');
            $.ajax({
                    url: '/route',
                    type: 'GET'
                })
                .then((response) => {
                    console.log('in then');
                    var html = `Here was the response: ${response}`;
                    $("#results").append(html);
                });
        });
    } else {
     location.reload();
    }
 }