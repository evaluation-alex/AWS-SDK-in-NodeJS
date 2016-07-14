var socket = io.connect("/");

$(document).ready(function() {

  var files;
  $('input[type=file]').on('change', prepareUpload);
  $('form').on('submit', uploadFiles);

  // Grab the files and set them to our variable
  function prepareUpload(event) {
    files = event.target.files;
    $("#status pre").append('\n$ File ready. Press submit.');
  }

  // Catch the form submit and upload the files
  function uploadFiles(event) {

    event.stopPropagation();
    event.preventDefault();

    //Checking if the file is selected or not.
    if(typeof files === 'undefined') {
      $("#status pre").append('\n$ Please select a file and then hit enter.');
    } else {
      $("#status pre").append('\n$ Upload processing. Please Wait.');
    }

    // Create a formdata object and add the files
    var data = new FormData();
    $.each(files, function(key, value) {
      data.append("fileUploaded", value);
    });

    //Getting UserId for database
    var userId = $("#userId").val();
    data.append("userId", userId);

    $.ajax({
      url: '//localhost:8080/upload_file',
      type: 'POST',
      data: data,
      cache: false,
      dataType: 'json',
      processData: false, // Don't process the files
      contentType: false,
      success: function(data, textStatus, jqXHR) {
        if(typeof data.error === 'undefined') {
          // Success
          $("#status pre").append('\n$ ' + data.success);
        } else {
          $("#status pre").append("\n$ Error: " + data.error);
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        $("#status pre").append("\n$ Error: " + textStatus);
      }
    });
  }

});
