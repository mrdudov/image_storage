$('#sign-up-btn').on('click', function(){
    url = $(this).data('href')
    email = $('#InputEmail').val()
    passwd = $('#InputPassword').val()

    $.post(url, { email: email, passwd: passwd } )
    .done(function(data){
        if('error' in data){
            location.reload();
        }
        else{
            $('#error-field').text(JSON.stringify(data, null, 4))
        }
    })
})

$('#sign-in-btn').on('click', function(){
    url = $(this).data('href')
    email = $('#InputEmail').val()
    passwd = $('#InputPassword').val()

    $.post(url, {email: email, passwd: passwd })
    .done(function(data) {
        if(data['error'] == undefined) {
            location.reload();
        }
        else{
            $('#error-field').text(JSON.stringify(data, null, 4))
        }
    })

})

$('#log-out-btn').on('click', function() {

    url = $(this).data('href')
    $.post(url).done(function(data) {
        if(data['error'] == undefined) {
            location.reload()
        }
        else {
            $('#error-field').text(JSON.stringify(data, null, 4))
        }
    })
})
