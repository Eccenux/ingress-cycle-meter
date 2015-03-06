/*
(function(){
	var input = {
		res : document.getElementById('res'),
		enl : document.getElementById('enl')
	};
	
	
})()
*/

/**
	Cycle constructor.
*/
function Cycle() {
	// any start cycyle
	this.someCycleStart = (new Date(2015, 2, 7, 2, 0, 0, 0)).getTime();
	this.checkpointLength = 5 * 3600 * 1000;
	this.checkpointsPerCycle = 35;
	
	this.cycleLength = this.checkpointsPerCycle * this.checkpointLength;
	
	this.setupCurrentCycle(new Date());
}

/**
	Set start/end based on current time.
	
	@param {Date} now Current time (or whatever one considers current).
*/
Cycle.prototype.setupCurrentCycle = function (now) {
	var diff = now.getTime() - this.someCycleStart;
	var cyclesAway = Math.floor(diff / this.cycleLength);
	this.start = this.someCycleStart +  (cyclesAway) * this.cycleLength;
	this.end = this.start + this.cycleLength;
}

/**
	Calculates current checkpoint number.
*/
Cycle.prototype.getCurrentCheckpoint = function () {
	var now = new Date();
	var diff = now.getTime() - this.start;
	var checkpoint = Math.floor(diff / this.checkpointLength);
	return checkpoint;
}

/**
	Convert string to number.
	
	Works fine for numbers that cannot have non-integer parts like Ingress MU points.
*/
Cycle.prototype.strToInt = function (str) {
	return parseInt(str.replace(/[,\.\s]/g, ''));
}

/**
	Calculates ammount need for loosing faction to win.
*/
Cycle.prototype.calculateWin = function (res, enl) {
	res = this.strToInt(res);
	enl = this.strToInt(enl);
	var a = this.getCurrentCheckpoint();
	var x = Math.abs(enl - res);
	var n = this.checkpointsPerCycle;
	return a*x/(n-a);
}

/**
	Calculates current checkpoint number.
*/
Cycle.prototype.getEndDate = function () {
	var t = new Date();
	t.setTime(this.end);
	return t;
}

/**
var cycle = new Cycle();

console.log(cycle.start)
var d = new Date(); d.setTime(cycle.start); console.log(d);
var d = new Date(); d.setTime(cycle.end); console.log(d);
console.log(cycle.getCurrentCheckpoint());
console.log(cycle.calculateWin(367359, 142669));
/**/