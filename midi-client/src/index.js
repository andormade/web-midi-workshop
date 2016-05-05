var Socket = require('socket.io-client');

var MidiClient = function MidiClient(server) {
	this.socket = Socket(server);
	this.socket.on('connect', this.onConnect.bind(this));
	this.socket.on('disconnect', this.onDisconnect.bind(this));
	this.socket.on('note', this.onNote.bind(this));
	this.buffer = [];
	this.interval = null;
};

MidiClient.prototype = {
	send : function(note, channel) {
		if (typeof note === 'undefined' || typeof channel === 'undefined') {
			return;
		}

		this.buffer.push({
			note    : note,
			channel : channel
		});

		if (this.interval === null) {
			this.interval = setInterval(this.emit.bind(this), 100);
		}
	},

	onConnect : function() {
		console.log('connected');
	},

	onDisconnect : function() {
		console.log('disconnected');
	},

	onNote : function(data) {
		console.log('on note', data);
	},

	emit : function(note) {
		if (this.buffer.length > 0) {
			this.socket.emit('note', this.buffer.shift());
		}
		else {
			clearInterval(this.interval);
			this.interval = null;
		}
	}
};

module.exports = MidiClient;
