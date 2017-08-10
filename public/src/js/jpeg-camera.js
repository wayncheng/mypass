if (window.JpegCamera) {
  var camera; // Initialized at the end
  hide_snapshot_controls();
  // $("#confirmation-wrap").hide();

  function update_stream_stats(stats) {
    $("#stream_stats").html(
      "Mean luminance = " + stats.mean + "; Standard Deviation = " + stats.std
    );

    setTimeout(function() {
      camera.get_stats(update_stream_stats);
    }, 1000);
  }
  
// wayne's shutter_test function
  function shutter_test() {
    var snapshot = camera.capture();
    if (JpegCamera.canvas_supported()) {
      discard_snapshot();
      snapshot.get_canvas(add_snapshot);
    } else { // <canvas> is not supported in this browser. We'll use anonymous graphic instead.
      var image = document.createElement("img");
      image.src = "no_canvas_photo.jpg";
      add_snapshot.call(snapshot, image);
    }

  }
// by Priyanka ==================================================
var images = [];
var canvases = [];
var measuresSet = false;
function shutter() {
    var snapshot = camera.capture();
    images.push(snapshot);

    snapshot.get_canvas(updateView);


  }

function setCanvasMeasures(canvas) {
    measures.height = canvas.height * 200 / canvas.width;
  }

function updateView(canvas) {
    canvas.selected = true;
    canvases.push(canvas);

    // s

    // updateGallery(canvas);
    takeSnapshot(canvas);
  }

  function shutter_test() {
    var snapshot = camera.capture();

    if (JpegCamera.canvas_supported()) {
      console.log("JpegCamera.canvas_supported");
      var canvas = snapshot.get_canvas(add_snapshot);
      //var link=document.createElement("a");
      //link.href=add_snapshot(snapshot).toDataURL('image/jpg');
      //link.download = 'screenshot.jpg';
      //link.click();
    } else {
      // <canvas> is not supported in this browser. We'll use anonymous
      // graphic instead.
      var image = document.createElement("img");
      image.src = "no_canvas_photo.jpg";
      add_snapshot.call(snapshot, image);
    }
  }

function takeSnapshot(video) {
    // Here we're using a trick that involves a hidden canvas element.

    var hidden_canvas = $('canvas');
    // var hidden_canvas = document.getElementById("myCanvas");
    var context = hidden_canvas.getContext("2d");

    var width = "300",
      height = "400";

    if (width && height) {
      // Setup a canvas with the same dimensions as the video.
      hidden_canvas.width = width;
      hidden_canvas.height = height;

      // Make a copy of the current frame in the video on the canvas.
      context.fillRect(0, 0, width, height);
      context.drawImage(video, 0, 0, width, height);

      var img = document.getElementById("myImg");
      img.src = video.toDataURL();

      var dl = document.createElement("a");
      dl.href = video.toDataURL();
      dl.innerHTML = "Download Image!";
      dl.download = true; // Make sure the browser downloads the image
      document.body.appendChild(dl); // Needs to be added to the DOM to work
      dl.click(); // Trigger the click

      // Turn the canvas image into a dataURL that can be used as a src for our photo.
      return hidden_canvas.toDataURL("image/png");
    }
  }
function add_snapshot(element) {
    $(element).data("snapshot", this).addClass("item");

    var $container = $("#camera-wrap").append(element);
    var $camera = $("#camera");
    var camera_ratio = $camera.innerWidth() / $camera.innerHeight();

    var height = $container.height();
    element.style.height = "" + height + "px";
    element.style.width = "" + Math.round(camera_ratio * height) + "px";

    var scroll = $container[0].scrollWidth - $container.innerWidth();

    $container.animate( { scrollLeft: scroll }, 200 );

    select_snapshot();
  }
/////////////// end Priyanka's code

function select_snapshot() {
    $(".item").removeClass("selected");
    var snapshot = $("#camera-wrap canvas")
      .addClass("selected")
      .data("snapshot");
    $("#confirmation-wrap").show();
    $("#api_url").show();
    snapshot.show();
    $("#show_stream").show();
  }

function clear_upload_data() {
    $("#upload_status, #upload_result").html("");
  }
var globalUsername = "";
function upload_snapshot() {
    // var api_url = $("#api_url").val();
    hide_snapshot_controls();
    var username = $("#username").val();
    globalUsername = username;
    if(username == null || username == undefined || username == "" || username == " "){
      alert("Please enter the username");
      $("#upload_status").html("Please enter the username");
      return;
    }
    var formAction = $("#main-form").attr("action");  
    var api_url = formAction+ "/" + username;
    console.log("API_URL ===",api_url);

    // if (!api_url.length) {
    //   $("#upload_status").html("Please provide URL for the upload");
    //   return;
    // }
    clear_upload_data();
    $("#loader").show();
    $("#accept").prop("disabled", true);

    var snapshot = $(".item.selected").data("snapshot");
    console.log("Before Uploading Image");
    snapshot.upload({ api_url: api_url }).done(upload_done).fail(upload_fail);
  }

function upload_done(response) {
    $("#accept").prop("disabled", false);
    $("#loader").hide();
    $("#upload_status").html("Upload successful");
    $("#upload_result").css("color","green");
    console.log("RESPONSE === ", response);
    $("#upload_result").html(response);

    var apiPhase = $("#apiPhase").text();

    if(apiPhase == "signup"){

      responsiveVoice.speak("Step 2 Completed");

      var currentURL = window.location.origin;
      var redirectURL = currentURL + "/signup/voice/" + globalUsername;

      window.location.replace(redirectURL);
  } else{
    //Successfully Logged In Page
      responsiveVoice.speak("Welcome "+ globalUsername + "To MyPass");

      var currentURL = window.location.origin;
      var redirectURL = currentURL + "/loginSuccess/" + globalUsername;

      window.location.replace(redirectURL);
  }
  }

function upload_fail(code, error, response) {
    console.log("FAIL RESPONSE === ", response);

    $("#accept").prop("disabled", false);
    $("#loader").hide();
    $("#upload_status").html(
      "Upload failed with status " + code + " (" + error + ")"
    );
    $("#upload_result").css("color","red");
    $("#upload_result").html(response);
    // alert("Image Uploading Failed");

  }

function discard_snapshot() {
    var element = $(".item.selected").removeClass("item selected");

    hide_snapshot_controls();

    element.data("snapshot").discard();

    element.hide("slow", function() {
      $(this).remove();
    });
  }

function show_stream() {
    $(this).hide();
    $(".item").removeClass("selected");
    hide_snapshot_controls();
    clear_upload_data();
    camera.show_stream();
  }

function hide_snapshot_controls() {
    $("#confirmation-wrap").hide();
    $("#api_url").hide();
    $("#upload_result, #upload_status").html("");
    $("#show_stream").hide();
  }

$("#shutter").click(function() {
  // shutter();
  shutter_test();
});
$("#camera-wrap").on("click", ".item", select_snapshot);
$("#accept").click(upload_snapshot);
$("#deny").click(discard_snapshot);
$("#show_stream").click(show_stream);

var options = {
  // shutter_ogg_url: "jpeg_camera/shutter.ogg",
  shutter_mp3_url: "jpeg_camera/shutter.mp3",
  swf_url: "jpeg_camera/jpeg_camera.swf"
};

camera = new JpegCamera("#camera", options).ready(function(info) {
  $("#shutter").show();

  $("#camera_info").html(
    "Camera resolution: " + info.video_width + "x" + info.video_height
  );

  this.get_stats(update_stream_stats);
});
}
