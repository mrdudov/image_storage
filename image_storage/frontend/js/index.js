function load_images() {
    $.get( "get-file-list/", function( data ) {
        result = '<div class="card-group">'
        for (item of data['result']) {

          result += '<div class="card" style="width: 18rem;"> ' +
            '<img class="card-img" src="' + item['upload_file'] + '" width="100" height="120">' +
            '<div class="card-body">' +
              '<h5 class="card-title">owner ' + item['uploaded_by'] + '</h5>' +
              '<p class="card-text">' + item['upload_file'] + '</p>' +
            '</div>' +
            '<div class="card-footer">' +
              '<small class="text-muted">upload time ' + item['date'] + '</small>' +
           ' </div>' +
          '</div>'


        }
        result += '</div>'
        $("#image-list").html(result);
    });
}


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

    if(files.length > 0) {
       fd.append('upload_file',files[0]);

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
    }
    else {
       alert("Please select a file.");
    }


})



$(document).ready(function() {
    load_images()
});