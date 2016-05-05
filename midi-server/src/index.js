var server = require('http').createServer();
var io = require('socket.io')(server);

var synth = null;

io.on('connection', function(socket) {
	console.log('client connected');
	socket.on('iamthesynth', function() {
		console.log('synth connected');
		synth = socket;
	});
	socket.on('note', function(data) {
		console.log('note', data);
		if (synth === null) {
			return;
		}
		synth.emit('note', data);
	});
});

server.listen(80, function() {
	console.log('listening on port 80');
});
