
function load_images() {
    $.get("get-file-list/", function(data) {
        result = ''
        for (item of data['result']) {
          result += card_template(item)
        }
        $("#image-list").append(result)
    })
}

function images_history_load(image_id) {
    $("#history-block").html('')
    $.get("image-history/", {image_id: image_id}, function(data) {
        result = ''
        for (item of data['result']) {
          result += card_template(item, history_reload_btn=false)
        }
        $("#history-block").append(result)
    })
}

$('body').on('click','#file-upload-btn', function() {
    $('#error-field').text('')
    var url = $(this).data('href')
    var fd = new FormData()
    var files = $('#customFile')[0].files

    if(files.length == 0) {
        alert("Please select a file.")
        return ''
    }
    fd.append('upload_file',files[0])
    $.ajax({
      url: url, type: 'post', data: fd, contentType: false, processData: false,
      success: function(response) {
          if(response['error']){
            $('#error-field').text(JSON.stringify(response, null, 4))
          }
          else {
              tmp = card_template({
                  upload_file: response['upload_file'] ,
                  uploaded_by: response['uploaded_by'] ,
                  date: response['date'] ,
              })
              $("#image-list").append(tmp)
              $('#customFile').val('')
          }
      },
    })
})


$('body').on('click', '.image-reload-btn', function(event) {
    $('#error-field').text('')
    var card = $(this).parent().parent().parent().parent()
    var url = $(this).data('href')
    var image_id = $(this).data('image-id')
    var fd = new FormData();
    var files = $('#customFile')[0].files

    if(files.length == 0) {
        alert("Please select a file.")
        return ''
    }
    fd.append('upload_file', files[0])
    fd.append('image_id', image_id)
    $.ajax({
      url: url, type: 'post', data: fd, contentType: false, processData: false,
      success: function(response) {
          if(response['error']){
            $('#error-field').text(JSON.stringify(response, null, 4))
          }
          else {
              tmp = card_template({
                upload_file: response['upload_file'] ,
                uploaded_by: response['uploaded_by'] ,
                date: response['date'] ,
                image_id: response['image_id'] ,
              })
              card.replaceWith(tmp)
              $('#customFile').val('')
          }
      }
    })
})

$('body').on('click', '.image-history-btn', function(event) {
    var image_id = $(this).data('image-id')
    images_history_load(image_id)
})


$('body').on('click', '#history-clear-btn', function() {
    $('#history-block').html('')
})


$(document).ready(function() {
    $('#customFile').val('')
    load_images()
});