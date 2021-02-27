function card_template(item, history_reload_btn=true) {
    result = '' +
    '<div class="card" style="width: 18rem;"> ' +
    '<img class="card-img" src="' + item['upload_file'] + '" width="100" height="120">' +
    '<div class="card-body">' +
      '<h5 class="card-title">owner ' + item['uploaded_by'] + '</h5>' +
      '<p class="card-text">' + item['upload_file'] + '</p>'


      if (history_reload_btn == true){
          result += ''+
          '<button class="image-reload-btn btn btn-primary" data-href="image-reload/" data-image-id="' +
          item['image_id'] + '" type="button">image reload</button>' +
          '<button class="image-history-btn btn btn-primary" data-href="image-history/" data-image-id="' +
          item['image_id'] + '" type="button">image history</button>'
      }

      result += ''+
    '</div>' +
    '<div class="card-footer">' +
      '<small class="text-muted">upload time ' + item['date'] + '</small>' +
    ' </div>' +
    '</div>'
    return result
}