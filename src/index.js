import 'bootstrap/dist/css/bootstrap.min.css'
import './modules/auth'
import { card_template } from './modules/templates'
import './css/index.css'

function load_images() {
    $.get("get-file-list/", function(data_tmp) {
        var result = ''
        for (var i = 0; i < data_tmp['result'].length; i++) {
            result += card_template(data_tmp['result'][i])
        }
        $("#image-list").append(result)
    })
}

function images_history_load(image_id) {
    $("#history-block").html('')
    $.get("image-history/", {image_id: image_id}, function(data_tmp) {
        var result = ''
        for (var i = 0; i < data_tmp['result'].length; i++) {
          result += card_template(data_tmp['result'][i], false)
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
              var tmp = card_template({
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
    var input_field = $(card).find('.customFile')

    var url = $(this).data('href')
    var image_id = $(this).data('image-id')
    var fd = new FormData();
    var files = $(input_field)[0].files

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
              var tmp = card_template({
                upload_file: response['upload_file'] ,
                uploaded_by: response['uploaded_by'] ,
                date: response['date'] ,
                image_id: response['image_id'] ,
              })
              card.replaceWith(tmp)
              images_history_load(image_id)
              input_field.val('')
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