var fps = 60;
var bps = 5000000;
//var codecs = 'avc1.420028';
var codecs = 'h264';
navigator.mediaDevices.getDisplayMedia({'video':{'frameRate':fps}}).then(function(s) {
	var recorder = new MediaRecorder(s, {"videoBitsPerSecond":bps,"mimeType":"video/webm;codecs=" + codecs});
	var chunks = [];
	recorder.ondataavailable = function(e) {
		chunks.push(e.data);
	}
	recorder.onstop = function(e) {
		var blob = new Blob(chunks, { type:'octet/stream'});
		var url = URL.createObjectURL(blob);
		var anchor = document.createElement("a");
		anchor.href = url;
		anchor.download = "blob.webm";
		document.body.appendChild(anchor);
		anchor.click();
		anchor.remove();
    }
	recorder.start(10);
	window.setTimeout(function() {
		recorder.stop();
		s.getTracks().forEach(function(t) {
			t.stop();
		});
	}, 60000);
});
