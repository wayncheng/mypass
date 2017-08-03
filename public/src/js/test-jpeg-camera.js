if (window.JpegCamera) {
  var camera; // Initialized at the end
  hide_snapshot_controls();
  $("#confirmation-wrap").hide();

  function update_stream_stats(stats) {
    $("#stream_stats").html(
      "Mean luminance = " + stats.mean + "; Standard Deviation = " + stats.std
    );
    setTimeout(function() {
      camera.get_stats(update_stream_stats);
    }, 1000);
  }
  
function shutter_test() {
	console.log('shutter_test');
    var snapshot = camera.capture();
    if (JpegCamera.canvas_supported()) {
      snapshot.get_canvas(add_snapshot);
    } else { // <canvas> is not supported in this browser. We'll use anonymous graphic instead.
      var image = document.createElement("img");
      image.src = "no_canvas_photo.jpg";
      add_snapshot(snapshot, image);
    }
  }

function add_snapshot(element) {
	console.log('add_snapshot()');
	$(element).data("snapshot", this).addClass("item");

	var $container = $("#camera-wrap").append(element);
	var $camera = $("#camera");
	var camera_ratio = $camera.innerWidth() / $camera.innerHeight();
	var height = $container.height();
	var scroll = $container[0].scrollWidth - $container.innerWidth();

	element.style.height = "" + height + "px";
	element.style.width = "" + Math.round(camera_ratio * height) + "px";

	$container.animate( { scrollLeft: scroll }, 200 );

	select_snapshot();
}


function select_snapshot() {
	console.log('select_snapshot()');
	$(".item").removeClass("selected");
	var snapshot = $("canvas.item").addClass("selected");
	snapshot.attr('name','snapshot');
	// var snapData = snapshot.data("snapshot");
	// var imgData = snapshot.get_blob();
	// console.log('imgData',imgData);
	$("#confirmation-wrap").show();
	$("#dump").show();
	// snapshot.show();
}

var fd = new FormData();   
function choose_snapshot() {
	console.log('choose_snapshot()');
		// $("#accept").prop("disabled", true);

		var username = $('#username').val().trim();
    var endpoint = '/test-endpoint';
    var snap = $(".item.selected").data("snapshot");
		// snap.upload({api_url: '/test-endpoint'});
		$('.item.selected').attr('id','blob-source');
		var $canvas = document.getElementById('blob-source');
		var b64 = $canvas.toDataURL("image/jpeg");
		// fd.append('test key','test value');
		fd.append('image', b64);
		fd.append('username', username);
		// for (var pair of fd.entries()) {
		// 		console.log(pair[0]+ ', ' + pair[1]); 
		// }
}


$('#submit').on('click', function(ev) {
	ev.preventDefault();
	var oReq = new XMLHttpRequest();
	oReq.open("POST", "/test-endpoint", true);
	oReq.onload = function(oEvent) {
		if (oReq.status == 200) { console.log('uploaded'); }
		else { console.log('error'); }
	};
	oReq.send(fd);
})

function discard_snapshot() {
	console.log('discard_snapshot()');
    hide_snapshot_controls();
    var element = $(".item.selected").removeClass("item selected");
    element.data("snapshot").discard();
    element.hide("slow", function() { $(this).remove(); });
}

function hide_snapshot_controls() {
	console.log('hide_snapshot_controls()');
	$("#confirmation-wrap").hide();
	$("#dump").hide();
	$("#upload_result, #upload_status").html("");
	$("#show_stream").hide();
}

$("#shutter").on('click',shutter_test);
$("#camera-wrap").on("click", ".item", select_snapshot);
$("#accept").on('click', choose_snapshot);
$("#deny").on('click', discard_snapshot);
// $("#show_stream").on('click', show_stream);


// Initiate Camera
camera = new JpegCamera("#camera").ready(function(info) {
  $("#shutter").show();
  $("#camera_info").html( "Camera resolution: " + info.video_width + "x" + info.video_height );
  this.get_stats(update_stream_stats);
});
}
