/* tentaisho.js */

ui.debug.addDebugData("tentaisho", {
	url: "5/5/6fl94fi65en8dbf10000",
	failcheck: [
		[
			"bdPassStar",
			"pzprv3/tentaisho/5/5/1...2...X/........./2....1..2/........./.1...2..1/........./......1../..2....../2.....2../1 0 0 0 /1 0 0 0 /1 0 0 0 /1 0 0 0 /1 0 0 0 /0 0 0 0 0 /0 0 0 0 0 /0 0 0 0 0 /0 0 0 0 0 /0 0 0 0 0 /0 0 0 0 0 /0 0 0 0 0 /0 0 0 0 0 /0 0 0 0 0 /"
		],
		[
			"bkNoStar",
			"pzprv3/tentaisho/5/5/1...2...X/........./2....1..2/........./.1...2..1/........./......1../..2....../2.....2../1 1 0 0 /1 1 0 0 /0 0 0 0 /0 0 0 0 /0 0 0 0 /0 0 0 0 0 /0 1 0 0 0 /0 0 0 0 0 /0 0 0 0 0 /0 0 0 0 0 /0 0 0 0 0 /0 0 0 0 0 /0 0 0 0 0 /0 0 0 0 0 /"
		],
		[
			"bkNotSymSt",
			"pzprv3/tentaisho/5/5/1...2...X/........./2....1..2/........./.1...2..1/........./......1../..2....../2.....2../1 0 0 0 /1 1 0 0 /0 1 0 0 /0 0 0 0 /0 0 0 0 /1 1 0 0 0 /1 0 0 0 0 /1 1 0 0 0 /0 0 0 0 0 /1 0 0 0 0 /2 1 0 0 0 /1 1 0 0 0 /0 0 0 0 0 /0 0 0 0 0 /"
		],
		[
			"bkPlStar",
			"pzprv3/tentaisho/5/5/1...2...X/........./2....1..2/........./.1...2..1/........./......1../..2....../2.....2../1 0 0 0 /1 1 0 0 /0 1 0 0 /1 1 0 0 /1 1 0 0 /1 1 0 0 0 /1 0 0 0 0 /0 1 0 0 0 /1 0 0 0 0 /1 0 0 0 0 /2 1 0 0 0 /1 1 0 0 0 /1 2 0 0 0 /2 2 0 0 0 /"
		],
		[
			null,
			"pzprv3/tentaisho/5/5/1...2...X/........./2....1..2/........./.1...2..1/........./......1../..2....../2.....2../1 0 0 1 /1 1 0 1 /0 1 0 1 /1 1 0 0 /1 1 0 0 /1 1 1 1 1 /1 0 1 1 1 /0 1 1 1 1 /1 0 1 1 1 /1 2 2 2 1 /2 1 1 1 2 /1 1 2 2 1 /1 2 1 1 1 /2 2 2 2 2 /"
		]
	],
	inputs: [
		/* 問題入力テスト */
		{ input: ["newboard,5,1", "editmode"] },
		{
			input: ["mouse,right, 1,1, 7,1"],
			result: "pzprv3/tentaisho/1/5/........./0 0 0 0 /3 3 3 3 0 /"
		},
		{
			input: ["mouse,right, 1,1, 5,1"],
			result: "pzprv3/tentaisho/1/5/........./0 0 0 0 /0 0 0 3 0 /"
		},
		{ input: ["newboard,2,2", "editmode"] },
		{
			input: [
				"cursor,1,1",
				"key,1",
				"key,right,2",
				"key,right,3",
				"cursor,1,2",
				"key,2",
				"key,right,1"
			],
			result: "pzprv3/tentaisho/2/2/12./21./.../0 /0 /0 0 /0 0 /0 0 /"
		},
		{
			input: ["cursor,1,2", "key,3", "key,right, "],
			result: "pzprv3/tentaisho/2/2/12./.../.../0 /0 /0 0 /0 0 /0 0 /"
		},
		{ input: ["newboard,2,2", "editmode"] },
		{
			input: [
				"cursor,0,0",
				"mouse,left, 1,2",
				"mouse,leftx2, 2,2",
				"mouse,leftx3, 3,2"
			],
			result: "pzprv3/tentaisho/2/2/.../12./.../0 /0 /0 0 /0 0 /0 0 /"
		}
		/* 回答入力はpaintareaと同じなので省略 */
	]
});
