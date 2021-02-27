
function card_template(item) {
    result = '<div class="card" style="width: 18rem;"> ' +
    '<img class="card-img" src="' + item['upload_file'] + '" width="100" height="120">' +
    '<div class="card-body">' +
      '<h5 class="card-title">owner ' + item['uploaded_by'] + '</h5>' +
      '<p class="card-text">' + item['upload_file'] + '</p>' +
      '<button class="image-reload-btn btn btn-primary" data-href="image-reload/" data-image-id="' + item['image_id'] + '" type="button">image reload</button>' +
    '</div>' +
    '<div class="card-footer">' +
      '<small class="text-muted">upload time ' + item['date'] + '</small>' +
    ' </div>' +
    '</div>'


    return result
}

function load_images() {
    $.get( "get-file-list/", function( data ) {
//        result = '<div class="card-group">'
        result = ''
        for (item of data['result']) {
          result += card_template(item)
        }
//        result += '</div>'
        $("#image-list").append(result);
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
    var url = $(this).data('href')
    var fd = new FormData();
    var files = $('#customFile')[0].files;
    if(files.length > 0) {
       fd.append('upload_file',files[0]);
       $.ajax({
          url: url, type: 'post', data: fd, contentType: false, processData: false,
          success: function(response){
          tmp = card_template({
            upload_file: response['upload_file'] ,
            uploaded_by: response['uploaded_by'] ,
            date: response['date'] ,
          })
          $("#image-list").append(tmp);
          },
       });
    }
    else {
       alert("Please select a file.");
    }
})


$('.image-reload-btn').on('click', function() {
    console.log($(this))
    var url = $(this).data('href')
    var image_id = $(this).data('image-id')
    var fd = new FormData();
    var files = $('#customFile')[0].files;

    if(files.length = 0) {
        alert("Please select a file.");
        return ''
    }
    fd.append('upload_file', files[0]);
    fd.append('image_id', image_id);
    $.ajax({
      url: url, type: 'post', data: fd, contentType: false, processData: false,
      success: function(response){
          tmp = card_template({
            upload_file: response['upload_file'] ,
            uploaded_by: response['uploaded_by'] ,
            date: response['date'] ,
          })
          $("#image-list").append(tmp);
          $(this).remove()
      },
    });
})



$(document).ready(function() {
    load_images()
});