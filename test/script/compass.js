ui.debug.addDebugData("compass", {
	url: "5/5/l2.21g.2.4m.4.3g.1..l",
	failcheck: [
		[
			"bkNumGe2",
			"pzprv3/compass/5/5/. . . . . /. 1,-1,2,2 . 4,2,-1,-1 . /. . . . . /. 3,4,-1,-1 . -1,1,-1,-1 . /. . . . . /0 0 0 0 /0 0 0 0 /0 0 0 0 /0 0 0 0 /0 0 0 0 /0 0 0 0 0 /0 0 0 0 0 /0 0 0 0 0 /0 0 0 0 0 /"
		],
		[
			"bkNoNum",
			"pzprv3/compass/5/5/. . . . . /. 1,-1,2,2 . 4,2,-1,-1 . /. . . . . /. 3,4,-1,-1 . -1,1,-1,-1 . /. . . . . /0 0 1 0 /0 0 1 0 /0 0 1 0 /0 0 1 0 /0 0 1 0 /0 0 0 0 0 /1 1 1 1 1 /0 0 0 1 1 /0 0 0 0 0 /"
		],
		[
			"ceDirection",
			"pzprv3/compass/5/5/. . . . . /. 1,-1,2,2 . 4,2,-1,-1 . /. . . . . /. 3,4,-1,-1 . -1,1,-1,-1 . /. . . . . /0 0 1 0 /0 0 1 0 /0 0 1 0 /0 0 1 0 /0 0 1 0 /0 0 0 0 0 /1 1 1 1 1 /0 0 0 0 0 /0 0 0 0 0 /"
		],
		[
			null,
			"pzprv3/compass/5/5/. . . . . /. 1,-1,2,2 . 4,2,-1,-1 . /. . . . . /. 3,4,-1,-1 . -1,1,-1,-1 . /. . . . . /0 1 0 0 /0 0 1 0 /0 0 0 1 /1 1 0 1 /1 -1 -1 -1 /0 0 1 0 0 /1 1 1 1 0 /0 1 0 0 -1 /0 0 1 1 1 /"
		]
	],
	inputs: [
		/* ensure that erasing a clue wipes the directions (#111) */
		{
			input: ["newboard,3,3", "editmode"],
			result:
				"pzprv3/compass/3/3/. . . /. . . /. . . /0 0 /0 0 /0 0 /0 0 0 /0 0 0 /"
		},
		{
			input: ["cursor,3,3", "key,q"],
			result:
				"pzprv3/compass/3/3/. . . /. -1,-1,-1,-1 . /. . . /0 0 /0 0 /0 0 /0 0 0 /0 0 0 /"
		},
		{
			input: ["key,shift,0,shift,1,shift,2,shift,3"],
			result:
				"pzprv3/compass/3/3/. . . /. 0,1,2,3 . /. . . /0 0 /0 0 /0 0 /0 0 0 /0 0 0 /"
		},
		{
			input: ["key,q"],
			result:
				"pzprv3/compass/3/3/. . . /. . . /. . . /0 0 /0 0 /0 0 /0 0 0 /0 0 0 /"
		},
		{
			input: ["key,q"],
			result:
				"pzprv3/compass/3/3/. . . /. -1,-1,-1,-1 . /. . . /0 0 /0 0 /0 0 /0 0 0 /0 0 0 /"
		}
	]
});
