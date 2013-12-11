$(document).ready(function() {
	//the dropdown menu
	$('.ui.selection.dropdown')
  	.dropdown();

	$('.ui.checkbox')
  	.checkbox();

	var validInput = true;

	$("#device_manufacturer").change(function(){
		switch($(this).val())
		{
			case "0": //yeelink
				$("div.yeelink").show();
				$("div.diy").hide();
				break;
			case "1":	//diy
				$("div.yeelink").hide();
				$("div.diy").show();
				break;
			default:
				break;
		}
	});

	Gmap();
	function Gmap() {
		var centerMarker = null; // 中心标记
		var center = new google.maps.LatLng(36.071883,120.4339423);
		var initOptions = {
			zoom: 10,
			center: center,
			mapTypeControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var map = new google.maps.Map(document.getElementById("locmap"), initOptions);

		google.maps.event.addListener(map, "click", function(event) {
			if(centerMarker == null)
			{
				centerMarker = new google.maps.Marker( {position:new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()), draggable:true, map:map} );
				google.maps.event.addListener(centerMarker, "dragend", function(event) {
					var centerMarkerPos = centerMarker.getPosition();
					$("#device_lng").val(centerMarkerPos.lng());
					$("#device_lat").val(centerMarkerPos.lat());
				});
			}
			else
			{
				centerMarker.setPosition(new google.maps.LatLng(event.latLng.lat(),event.latLng.lng()));
			}
			$("#device_lng").val(event.latLng.lng());
			$("#device_lat").val(event.latLng.lat());
		});

		if($(".locmap").attr('edit_device') == "true")
		{
			centerMarker = new google.maps.Marker( {position:new google.maps.LatLng($("#device_lat").val(), $("#device_lng").val()), draggable:true, map:map} );
			google.maps.event.addListener(centerMarker, "dragend", function(event) {
				var centerMarkerPos = centerMarker.getPosition();
				$("#device_lng").val(centerMarkerPos.lng());
				$("#device_lat").val(centerMarkerPos.lat());
			});
		}
	}

	$("form").submit(function(e) {
		validInput = true;

		$("#device_title").blur();

		switch($("#device_manufacturer").val())
		{
			case "0":
				$("#device_tags").blur();
				$("#device_loc_name").blur();
			break;
			case "1":
				$("#device_tags").blur();
				$("#device_loc_name").blur();
				lat();
			break;
		}
		$("#device_about").blur();
		if(!validInput) {
			e.preventDefault();
		}
	});
});
