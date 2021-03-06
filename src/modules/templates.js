
export function card_template(item, history_reload_btn=true) {
    var result = '' +
    '<div class="col">' +
        '<div class="card shadow-sm">' +
            '<img class="bd-placeholder-img card-img-top" width="100%" height="225" src="' + item['upload_file'] + '" width="100" height="120">' +
            '<div class="card-body">' +
                '<p class="card-text">Owner ' + item['uploaded_by'] + '</p>' +
                '<div class="d-flex justify-content-between align-items-center">' +
                    '<div class="btn-group">'


    if (history_reload_btn == true){
          result += ''+
          '<button class="image-history-btn btn btn-sm btn-outline-secondary" data-href="image-history/" data-image-id="' +
          item['image_id'] + '" type="button">image history</button>'



    }
    result += ''+


                    '</div>' +
                        '<small class="text-muted">' + item['date'] + '</small>' +
                    '</div>'
    if (history_reload_btn == true){
          result += ''+
                 '<p class="card-text"><div class="d-flex justify-content-between align-items-center">' +

                 '<div class="input-group mb-3">' +
                 '   <input type="file" class="form-control customFile" accept="image/*," />' +
                    '<button data-image-id="' + item['image_id'] + '" data-href="image-reload/" type="button" class="btn btn-secondary image-reload-btn">reload image</button>' +
                '</div>' +

                '</div></p>'
    }
    result += ''+

                '</div>' +
            '</div>' +
        '</div>' +
    '</div>'
    return result
}


