//
// パズル固有スクリプト部 天体ショー版 tentaisho.js v3.4.1
//
pzpr.classmgr.makeCustom(['tentaisho'], {
//---------------------------------------------------------
// マウス入力系
MouseEvent:{
	mouseinput : function(){
		if(this.owner.playmode){
			if(this.mousestart || this.mousemove){
				if(this.btn.Left && this.isBorderMode()){ this.inputborder_tentaisho();}
				else{ this.inputQsubLine();}
			}
			else if(this.mouseend && this.notInputted()){ this.inputBGcolor3();}
		}
		else if(this.owner.editmode){
			if(this.mousestart && this.btn.Left){
				this.inputstar();
			}
			else if((this.mousestart || this.mousemove) && this.btn.Right){
				this.inputBGcolor1();
			}
		}
	},

	inputBGcolor1 : function(){
		var cell = this.getcell();
		if(cell.isnull || cell===this.mouseCell){ return;}
		if(this.inputData===null){ this.inputData=(cell.qsub===0)?3:0;}
		cell.setQsub(this.inputData);
		this.mouseCell = cell; 
		cell.draw();
	},
	inputBGcolor3 : function(){
		if(pzpr.EDITOR && this.owner.getConfig('discolor')){ return;}

		var pos = this.getpos(0.34);
		var star = pos.gets();
		if(star===null || star.getStar()===0){ return;}

		var cell = star.validcell();
		if(cell!==null){
			var clist = this.owner.board.rooms.getClistByCell(cell);
			if(clist.encolor()){ clist.draw();}
		}
	},
	inputborder_tentaisho : function(){
		var pos = this.getpos(0.34);
		if(this.prevPos.equals(pos)){ return;}

		var border = this.getborderobj(this.prevPos, pos);
		if(!border.isnull){
			if(this.inputData===null){ this.inputData=(border.qans===0?1:0);}
			border.setQans(this.inputData);
			border.draw();
		}
		this.prevPos = pos;
	},
	inputstar : function(){
		var pos = this.getpos(0.25);
		if(this.prevPos.equals(pos)){ return;}

		var star = pos.gets();
		if(star!==null){
			if     (this.btn.Left) { star.setStar({0:1,1:2,2:0}[star.getStar()]);}
			else if(this.btn.Right){ star.setStar({0:2,1:0,2:1}[star.getStar()]);}
			star.draw();
		}
		this.prevPos = pos;
	}
},

//---------------------------------------------------------
// キーボード入力系
KeyEvent:{
	enablemake : true,
	moveTarget : function(ca){ return this.moveTBorder(ca); },

	keyinput : function(ca){
		this.key_inputstar(ca);
	},
	key_inputstar : function(ca){
		var star = this.cursor.gets();
		if(star!==null){
			if     (ca==='1'){ star.setStar(1);}
			else if(ca==='2'){ star.setStar(2);}
			else if(ca===' '||ca==='-'||ca==='0'||ca==='3'){ star.setStar(0);}
			star.draw();
		}
	}
},

//---------------------------------------------------------
// 盤面管理系
Cell:{
	qnum : 0,
	minnum : 0,

	disInputHatena : true,

	// 一部qsubで消したくないものがあるため上書き
	subclear : function(){
		if(this.qsub===1){
			this.addOpe('qsub', 1, 0);
			this.qsub = 0;
		}
		this.error = 0;
	}
},
Cross:{
	qnum : 0,
	minnum : 0
},
Border:{
	qnum : 0,
	minnum : 0
},

Star:{
	bx : null,
	by : null,

	isnull : true,
	id : null,

	obj : null,

	getStar : function(){
		return this.obj.qnum;
	},
	setStar : function(val){
		this.owner.opemgr.disCombine = true;
		this.obj.setQnum(val);
		this.owner.opemgr.disCombine = false;
	},
	iserror : function(){
		return (this.obj.error>0);
	},

	// 星に線が通っていないなら、近くのセルを返す
	validcell : function(){
		var obj = this.obj, cell = null;
		if(obj.group==='cell')
			{ cell = obj;}
		else if(obj.group==='cross' && obj.lcnt===0)
			{ cell = obj.relcell(-1,-1);}
		else if(obj.group==='border' && obj.qans===0)
			{ cell = obj.sidecell[0];}
		return cell;
	},

	draw : function(){
		this.owner.painter.paintRange(this.bx-1, this.by-1, this.bx+1, this.by+1);
	},
	getaddr : function(){
		return (new this.owner.Address(this.bx, this.by));
	}
},
Address:{
	gets : function(){ return this.owner.board.gets(this.bx, this.by);}
},
TargetCursor:{
	gets : function(){ return this.owner.board.gets(this.bx, this.by);}
},
CellList:{
	encolor : function(){
		var star = this.getAreaStarInfo().star;
		var flag = false, ret = (star!==null ? star.getStar() : 0);
		for(var i=0;i<this.length;i++){
			var cell = this[i];
			if(pzpr.EDITOR && cell.qsub===3 && ret!==2){ continue;}
			else if(cell.qsub!==(ret>0?ret:0)){
				cell.setQsub(ret>0?ret:0);
				flag = true;
			}
		}
		return flag;
	},
	getAreaStarInfo : function(){
		var ret = {star:null, err:-1};
		for(var i=0;i<this.length;i++){
			var cell=this[i];
			var slist = this.owner.board.starinside(cell.bx,cell.by,cell.bx+1,cell.by+1);
			for(var n=0;n<slist.length;n++){
				var star=slist[n];
				if(star.getStar()>0 && star.validcell()!==null){
					if(ret.err===0){ return {star:null, err:-2};}
					ret = {star:star, err:0};
				}
			}
		}
		return ret;
	}
},

Board:{
	hascross  : 1,
	hasborder : 1,

	initialize : function(){
		this.common.initialize.call(this);

		this.star = []; /* インスタンス化 */
	},

	initBoardSize : function(col,row){
		this.common.initBoardSize.call(this,col,row);

		this.initStar(this.qcols,this.qrows);
	},

	// 星アクセス用関数
	starmax : 0,
	star : [],
	initStar : function(col,row){
		this.starmax = (2*col-1)*(2*row-1);
		this.star = [];
		for(var id=0;id<this.starmax;id++){
			this.star[id] = new this.owner.Star();
			var star = this.star[id];
			star.id = id;
			star.isnull = false;

			star.bx = id%(2*col-1)+1;
			star.by = ((id/(2*col-1))|0)+1;
			star.obj = star.getaddr().getobj();
		}
	},
	gets : function(bx,by,qc,qr){
		var id = null;
		if(qc===(void 0)){ qc=this.qcols; qr=this.qrows;}
		if((bx<=0||bx>=(qc<<1)||by<=0||by>=(qr<<1))){ }
		else{ id = (bx-1)+(by-1)*(2*qc-1);}

		return (id!==null ? this.star[id] : null);
	},
	starinside : function(x1,y1,x2,y2){
		var slist = new this.owner.PieceList();
		for(var by=y1;by<=y2;by++){ for(var bx=x1;bx<=x2;bx++){
			var star = this.gets(bx,by);
			if(star!==null){ slist.add(star);}
		}}
		return slist;
	},

	// 色をつける系関数
	encolorall : function(){
		var rinfo = this.getRoomInfo();
		for(var id=1;id<=rinfo.max;id++){ rinfo.area[id].clist.encolor();}
		this.owner.redraw();
	},

	// 領域と入っている星を取得する関数
	getAreaStarInfoAll : function(){
		var rinfo = this.getRoomInfo();
		for(var id=1;id<=rinfo.max;id++){
			var area = rinfo.area[id], ret = area.clist.getAreaStarInfo();
			area.star  = ret.star;
			area.error = ret.err;
		}
		return rinfo;
	}
},
BoardExec:{
	adjustBoardData2 : function(key,d){
		var bd = this.owner.board;
		bd.initStar(bd.qcols, bd.qrows);
	}
},

AreaRoomManager:{
	enabled : true
},

//---------------------------------------------------------
// 画像表示系
Graphic:{
	gridcolor_type : "LIGHT",
	errbcolor1_type : "DARK",

	bgcellcolor_func : "qsub3",
	qsubcolor1 : "rgb(176,255,176)",
	qsubcolor2 : "rgb(108,108,108)",

	borderQanscolor : "rgb(72, 72, 72)",

	paint : function(){
		this.drawBGCells();
		this.drawDashedGrid();

		this.drawQansBorders();
		this.drawBorderQsubs();

		this.drawStars();

		this.drawChassis();

		this.drawTarget_tentaisho();
	},

	drawStars : function(){
		var g = this.vinc('star', 'auto', true);

		g.lineWidth = Math.max(this.cw*0.04, 1);
		var d = this.range;
		var slist = this.owner.board.starinside(d.x1,d.y1,d.x2,d.y2);
		for(var i=0;i<slist.length;i++){
			var star = slist[i], bx=star.bx, by=star.by;

			g.vid = "s_star1_"+star.id;
			if(star.getStar()===1){
				g.strokeStyle = (star.iserror() ? this.errcolor1 : this.quescolor);
				g.fillStyle   = "white";
				g.shapeCircle(bx*this.bw, by*this.bh, this.cw*0.16);
			}
			else{ g.vhide();}

			g.vid = "s_star2_"+star.id;
			if(star.getStar()===2){
				g.fillStyle = (star.iserror() ? this.errcolor1 : this.quescolor);
				g.fillCircle(bx*this.bw, by*this.bh, this.cw*0.18);
			}
			else{ g.vhide();}
		}
	},

	drawTarget_tentaisho : function(){
		this.drawCursor(false,this.owner.editmode);
	}
},

//---------------------------------------------------------
// URLエンコード/デコード処理
Encode:{
	decodePzpr : function(type){
		this.decodeStar();
	},
	encodePzpr : function(type){
		this.encodeStar();
	},

	decodeKanpen : function(){
		this.owner.fio.decodeStarFile();
	},
	encodeKanpen : function(){
		this.owner.fio.encodeStarFile();
	},

	decodeStar : function(bstr){
		var bd = this.owner.board;
		bd.disableInfo();
		var s=0, bstr = this.outbstr;
		for(var i=0;i<bstr.length;i++){
			var star = bd.star[s], ca = bstr.charAt(i);
			if(this.include(ca,"0","f")){
				var val = parseInt(ca,16);
				star.setStar(val%2+1);
				s+=((val>>1)+1);
			}
			else if(this.include(ca,"g","z")){ s+=(parseInt(ca,36)-15);}

			if(s>=bd.starmax){ break;}
		}
		bd.enableInfo();
		this.outbstr = bstr.substr(i+1);
	},
	encodeStar : function(){
		var count = 0, cm = "", bd = this.owner.board;
		for(var s=0;s<bd.starmax;s++){
			var pstr = "", star = bd.star[s];
			if(star.getStar()>0){
				for(var i=1;i<=7;i++){
					var star2 = bd.star[s+i];
					if(!!star2 && star2.getStar()>0){
						pstr=""+(2*(i-1)+(star.getStar()-1)).toString(16);
						s+=(i-1); break;
					}
				}
				if(pstr===""){ pstr=(13+star.getStar()).toString(16); s+=7;}
			}
			else{ count++;}

			if(count===0){ cm += pstr;}
			else if(pstr || count===20){ cm += ((count+15).toString(36)+pstr); count=0;}
		}
		if(count>0){ cm += ((count+15).toString(36));}

		this.outbstr += cm;
	}
},
//---------------------------------------------------------
FileIO:{
	decodeData : function(){
		this.decodeStarFile();
		this.decodeBorderAns();
		this.decodeCellQsub();
	},
	encodeData : function(){
		this.encodeStarFile();
		this.encodeBorderAns();
		this.encodeCellQsub();
	},

	kanpenOpen : function(){
		this.decodeStarFile();
		this.decodeAnsAreaRoom();
	},
	kanpenSave : function(){
		this.encodeStarFile();
		this.encodeAnsAreaRoom();
	},

	decodeStarFile : function(){
		var bd = this.owner.board, array = this.readLines(2*bd.qrows-1), s=0;
		bd.disableInfo();
		for(var i=0;i<array.length;i++){
			for(var c=0;c<array[i].length;c++){
				var star = bd.star[s];
				if     (array[i].charAt(c)==="1"){ star.setStar(1);}
				else if(array[i].charAt(c)==="2"){ star.setStar(2);}
				s++;
			}
		}
		bd.enableInfo();
	},
	encodeStarFile : function(){
		var bd = this.owner.board, s=0;
		for(var by=1;by<=2*bd.qrows-1;by++){
			for(var bx=1;bx<=2*bd.qcols-1;bx++){
				var star = bd.star[s];
				if     (star.getStar()===1){ this.datastr += "1";}
				else if(star.getStar()===2){ this.datastr += "2";}
				else                       { this.datastr += ".";}
				s++;
			}
			this.datastr += "\n";
		}
	}
},

//---------------------------------------------------------
// 正解判定処理実行部
AnsCheck:{
	checklist : [
		"checkStarOnLine",
		"checkAvoidStar",
		"checkFractal",
		"checkStarRegion"
	],

	getStarAreaInfo : function(){
		return (this._info.sarea = this._info.sarea || this.owner.board.getAreaStarInfoAll());
	},

	checkStarOnLine : function(){
		var result = true, bd = this.owner.board;
		for(var s=0;s<bd.starmax;s++){
			var star = bd.star[s];
			if(star.getStar()<=0){ continue;}

			if(star.validcell()===null){
				if(this.checkOnly){ return false;}
				if(star.obj.group==='cross')
					{ star.obj.setCrossBorderError();}
				else if(star.obj.group==='border')
					{ star.obj.seterr(1);}
				result = false;
			}
		}
		if(!result){ this.failcode.add("bdPassStar");}
		return result;
	},

	checkFractal : function(){
		var result = true;
		var rinfo = this.getStarAreaInfo();
		for(var r=1;r<=rinfo.max;r++){
			var clist = rinfo.area[r].clist;
			var star = rinfo.area[r].star;
			if(star===null){ continue;}
			for(var i=0;i<clist.length;i++){
				var cell = clist[i];
				var cell2 = this.owner.board.getc(star.bx*2-cell.bx, star.by*2-cell.by);
				if(cell2.isnull || rinfo.getRoomID(cell)!==rinfo.getRoomID(cell2)){
					if(this.checkOnly){ return false;}
					clist.seterr(1);
					result = false;
				}
			}
		}
		if(!result){ this.failcode.add("bkNotSymSt");}
		return result;
	},

	checkAvoidStar  : function(){ return this.checkErrorFlag(-1, "bkNoStar");},
	checkStarRegion : function(){ return this.checkErrorFlag(-2, "bkPlStar");},
	checkErrorFlag : function(val, code){
		var result = true;
		var rinfo = this.getStarAreaInfo();
		for(var r=1;r<=rinfo.max;r++){
			if(rinfo.area[r].error!==val){ continue;}

			if(this.checkOnly){ result = false; break;}
			rinfo.area[r].clist.seterr(1);
			result = false;
		}
		if(!result){ this.failcode.add(code);}
		return result;
	}
},

FailCode:{
	bkNoStar   : ["星が含まれていない領域があります。","A block has no stars."],
	bdPassStar : ["星を線が通過しています。", "A line goes over the star."],
	bkNotSymSt : ["領域が星を中心に点対称になっていません。", "An area is not point symmetric about the star."],
	bkPlStar   : ["星が複数含まれる領域があります。","A block has two or more stars."]
}
});
