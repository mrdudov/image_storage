
function load_images() {
    $.get("get-file-list/", function(data) {
        result = ''
        for (item of data['result']) {
          result += card_template(item)
        }
        $("#image-list").append(result)
    })
}


$('body').on('click','#file-upload-btn', function() {
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
          tmp = card_template({
            upload_file: response['upload_file'] ,
            uploaded_by: response['uploaded_by'] ,
            date: response['date'] ,
          })
          $("#image-list").append(tmp)
          $('#customFile').val('')
      },
    })
})


$('body').on('click', '.image-reload-btn', function(event) {
    var card = $(this).parent().parent()
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
          tmp = card_template({
            upload_file: response['upload_file'] ,
            uploaded_by: response['uploaded_by'] ,
            date: response['date'] ,
            image_id: response['image_id'] ,
          })
          card.replaceWith(tmp)
          $('#customFile').val('')
      }
    })
})



$(document).ready(function() {
    load_images()
});