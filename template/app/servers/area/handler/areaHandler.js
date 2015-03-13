'use strict';

var Q = require('q');

var Handler = function(app){
	this.app = app;
};

var proto = Handler.prototype;

proto.create = function(msg, session, next){
	var opts = msg.opts;

	var self = this;
	Q.fcall(function(){
		return self.app.controllers.area.create(opts);
	})
	.nodeify(next);
};

proto.remove = function(msg, session, next){
	var areaId = msg.areaId || session.uid;
	if(!areaId){
		return next(new Error('areaId is missing'));
	}

	var self = this;
	Q.fcall(function(){
		return self.app.controllers.area.remove(areaId);
	})
	.nodeify(next);
};

proto.join = function(msg, session, next){
	var playerId = session.uid;
	var areaId = msg.areaId;
	if(!playerId || !areaId){
		return next(new Error('playerId or areaId is missing'));
	}

	var self = this;
	Q.fcall(function(){
		return self.app.controllers.area.join(areaId, playerId);
	})
	.nodeify(next);
};

proto.quit = function(msg, session, next){
	var playerId = session.uid;
	var areaId = msg.areaId;
	if(!playerId || !areaId){
		return next(new Error('playerId or areaId is missing'));
	}

	var self = this;
	Q.fcall(function(){
		return self.app.controllers.area.quit(areaId, playerId);
	})
	.nodeify(next);
};

proto.push = function(msg, session, next){
	var areaId = msg.areaId;
	if(!areaId){
		return next(new Error('areaId is missing'));
	}

	var self = this;
	Q.fcall(function(){
		return self.app.controllers.area.push(areaId, msg.playerIds, msg.route, msg.msg, msg.persistent);
	})
	.nodeify(next);
};

proto.getMsgs = function(msg, session, next){
	var areaId = msg.areaId;
	if(!areaId){
		return next(new Error('areaId is missing'));
	}

	var self = this;
	Q.fcall(function(){
		return self.app.controllers.area.getMsgs(areaId, msg.seq, msg.count);
	})
	.nodeify(next);
};

module.exports = function(app){
	return new Handler(app);
};