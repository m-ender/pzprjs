/* test_view.js */

ui.debug.addDebugData('view', {
	url : '5/5/m401g3g2g101m',
	failcheck : [
		['caSameNum',  "pzprv3/view/5/5/. . . . . /. . 4 0 1 /. 3 . 2 . /1 0 1 . . /. . . . . /- - - . . /- - . . . /. . - . . /. . . . . /. 0 . . . /"],
		['nmSumViewNe',"pzprv3/view/5/5/. . . . . /. . 4 0 1 /. 3 . 2 . /1 0 1 . . /. . . . . /- - - . + /- - . . . /+ . - . - /. . . + + /- + + . . /"],
		['nmDivide',   "pzprv3/view/5/5/. . . . . /. . 4 0 1 /. 3 . 4 . /1 0 2 . . /. . . . . /- - - + + /- - . . . /+ . - . - /. . . . + /- + + . . /"],
		['ceSuspend',  "pzprv3/view/5/5/. . . . . /. . 4 0 1 /. 3 . 2 . /1 0 1 . . /. . . . . /- - - + + /- - . . . /2 . - . - /. . . 0 + /- + + + . /"],
		[null,         "pzprv3/view/5/5/. . . . . /. . 4 0 1 /. 3 . 2 . /1 0 1 . . /. . . . . /- - - 3 0 /- - . . . /2 . - . - /. . . 0 2 /- 1 0 1 . /"]
	],
	inputs : [
		/* 問題入力, 回答入力はsukoroとほぼ同じなので省略 */
	]
});
