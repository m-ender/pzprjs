//
// パズル固有スクリプト部 ボーダーブロック版 bdblock.js v3.4.1
//
pzpr.classmgr.makeCustom(['bdblock'], {
//---------------------------------------------------------
// マウス入力系
MouseEvent:{
	mouseinput : function(){
		if(this.owner.playmode){
			if(this.mousestart || this.mousemove){
				if(this.btn.Left && this.isBorderMode()){ this.inputborder();}
				else{ this.inputQsubLine();}
			}
		}
		else if(this.owner.editmode){
			if     (this.mousestart){ this.inputcrossMark();}
			else if(this.mouseend && this.notInputted()){ this.inputqnum();}
		}
	}
},

//---------------------------------------------------------
// キーボード入力系
KeyEvent:{
	enablemake : true
},

//---------------------------------------------------------
// 盤面管理系
Board:{
	hasborder : 1
},

AreaRoomManager:{
	enabled : true
},

//---------------------------------------------------------
// 画像表示系
Graphic:{
	gridcolor_type : "DLIGHT",

	bordercolor_func : "qans",
	borderQanscolor : "black",

	crosssize : 0.15,

	paint : function(){
		this.drawBGCells();
		this.drawDashedGrid();
		this.drawBorders();

		this.drawNumbers();
		this.drawCrossMarks();

		this.drawBorderQsubs();

		this.drawChassis();

		this.drawTarget();
	}
},

//---------------------------------------------------------
// URLエンコード/デコード処理
Encode:{
	decodePzpr : function(type){
		this.decodeCrossMark();
		this.outbstr = this.outbstr.substr(1); // /を消しておく
		this.decodeNumber16();
	},
	encodePzpr : function(type){
		this.encodeCrossMark();
		this.outbstr += "/";
		this.encodeNumber16();
	}
},
//---------------------------------------------------------
FileIO:{
	decodeData : function(){
		this.decodeCellQnum();
		this.decodeCrossNum();
		this.decodeBorderAns();
	},
	encodeData : function(){
		this.encodeCellQnum();
		this.encodeCrossNum();
		this.encodeBorderAns();
	}
},

//---------------------------------------------------------
// 正解判定処理実行部
AnsCheck:{
	checklist : [
		"checkBorderBranchExBP",
		"checkBorderCrossExBP",

		"checkNoNumber",
		"checkSameNumberInBlock",
		"checkGatheredObject",

		"checkBorderDeadend+",
		"checkBorderPassOnBP",
		"checkBorderNoneOnBP"
	],

	checkBorderBranchExBP : function(){ return this.checkBorderCount(3,2, "bdBranchExBP");},
	checkBorderCrossExBP  : function(){ return this.checkBorderCount(4,2, "bdCrossExBP");},
	checkBorderPassOnBP   : function(){ return this.checkBorderCount(2,1, "bdCountLt3BP");},
	checkBorderNoneOnBP   : function(){ return this.checkBorderCount(0,1, "bdIgnoreBP");},

	checkSameNumberInBlock : function(){
		return this.checkSameObjectInRoom(this.getRoomInfo(), function(cell){ return cell.getNum();}, "bkPlNum");
	},

	// 同じ値であれば、同じ部屋に存在することを判定する
	checkGatheredObject : function(){
		var d=[], dmax=0, val=[], bd=this.owner.board;
		var rinfo = this.owner.board.getRoomInfo();
		for(var c=0;c<bd.cellmax;c++){ val[c]=bd.cell[c].getNum(); if(dmax<val[c]){ dmax=val[c];} }
		for(var i=0;i<=dmax;i++){ d[i]=-1;}
		for(var c=0;c<bd.cellmax;c++){
			if(val[c]===-1){ continue;}
			if(d[val[c]]===-1){ d[val[c]] = rinfo.id[c];}
			else if(d[val[c]]!==rinfo.id[c]){
				bd.cell.filter(function(cell){ return (rinfo.id[c]===rinfo.id[cell.id] || d[val[c]]===rinfo.id[cell.id]);}).seterr(1);
				this.failcode.add("bkSepNum");
				return false;
			}
		}
		return true;
	}
},

FailCode:{
	bdBranchExBP : ["黒点以外のところで線が分岐しています。","Lines are branched out of the point."],
	bdCrossExBP  : ["黒点以外のところで線が交差しています。","Lines are crossed out of the point."],
	bdCountLt3BP : ["黒点から線が３本以上出ていません。","A point has two or less lines."],
	bdIgnoreBP   : ["黒点上を線が通過していません。","A point has no line."]
}
});
