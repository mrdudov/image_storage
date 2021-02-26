$('#sign-up-btn').on('click', function(){
    url = $(this).data('href')
    email = $('#InputEmail').val()
    passwd = $('#InputPassword').val()

    $.post(url, { email: email, passwd: passwd } )
    .done(function(data){
        if(data['error'] == undefined){
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


$('#file-upload-btn').on('click', function() {

    url = $(this).data('href')

    var fd = new FormData();
    var files = $('#customFile')[0].files;

    if(files.length > 0 ) {
       fd.append('file',files[0]);

       $.ajax({
          url: url,
          type: 'post',
          data: fd,
          contentType: false,
          processData: false,
          success: function(response){
            console.log(response)
          },
       });
    }else{
       alert("Please select a file.");
    }


})