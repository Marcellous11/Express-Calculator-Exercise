const express = require('express');
const ss = require('simple-statistics');
const app = express();
const fs = require('fs');
const ExpressErr = require('./appError');

app.use(express.json());

app.get('/mean', (req, res, next) => {
	let total = 0;
	let count = 0;
	try {
		let numArr = req.query.nums.split(',');
		let realNum = numArr.map((num) => {
			console.log('Number before PARSE ----->' + num);
			console.log(' TYPE  of before PARSE ----->' + typeof num);
			let pnum = parseInt(num);
			console.log('Number after PARSE ----->' + pnum);
			console.log('TYPE of after PARSE ---->' + typeof pnum);
			if (isNaN(pnum)) throw new ExpressErr("You've entered a value that is NOT a number", 404);
			return pnum;
		});

		res.send({
			operation: 'Mean',
			value: ss.mean(realNum)
		});
	} catch (e) {
		next(e);
	}
});
app.get('/median', (req, res, next) => {
	let numArr = req.query.nums.split(',');
	let realNum = numArr.map((num) => {
		let pnum = parseInt(num);
		if (isNaN(pnum)) throw new ExpressErr("You've entered a value that is NOT a number", 404);
		return pnum;
	});

	res.send({
		operation: 'Median',
		value: ss.median(realNum)
	});
});

app.get('/mode', (req, res, next) => {
	let numArr = req.query.nums.split(',');
	let realNum = numArr.map((num) => {
		let pnum = parseInt(num);
		if (isNaN(pnum)) throw new ExpressErr("You've entered a value that is NOT a number", 404);
		return pnum;
	});

	res.send({
		operation: 'Mode',
		value: ss.mode(realNum)
	});
});

app.get('/all', (req, res, next) => {
	let numArr = req.query.nums.split(',');
	let realNum = numArr.map((num) => {
		let pnum = parseInt(num);
		if (isNaN(pnum)) throw new ExpressErr("You've entered a value that is NOT a number", 404);
		return pnum;
	});
	let mean = ss.mean(realNum);
	let median = ss.median(realNum);
	let mode = ss.mode(realNum);

	let answer = {
		response: {
			operation: 'All',
			mean,
			median,
			mode
		}
	};

	return res.json(answer);
});

app.use((error, req, res, next) => {
	console.log(error.msg);
	res.send(error.msg);
});

app.listen(3000, function() {
	console.log('You are now connected to post 3000');
});
