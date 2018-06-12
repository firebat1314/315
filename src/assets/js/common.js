import { setCookie, getCookie } from './cookie.js';
//获取接口域名
export function getOpenUrl() {
//	return 'http://openjc315.iwsoft.net/';
	return 'http://appopen.jc315.com/';
}
//
export function getToken() {
	return getCookie('token');
}
//
//插入内容
export function insertHtmlAtCaret(html) {
	var sel, range;
	if(window.getSelection) {
		sel = window.getSelection();
		if(sel.getRangeAt && sel.rangeCount) {
			range = sel.getRangeAt(0);
			range.deleteContents();
			var el = document.createElement("div");
			el.innerHTML = html;
			var frag = document.createDocumentFragment(),
				node, lastNode;
			while((node = el.firstChild)) {
				lastNode = frag.appendChild(node);
			}
			range.insertNode(frag);
			if(lastNode) {
				range = range.cloneRange();
				range.setStartAfter(lastNode);
				range.collapse(true);
				sel.removeAllRanges();
				sel.addRange(range);
			}
		}
	} else if(document.selection && document.selection.type != "Control") {
		document.selection.createRange().pasteHTML(html);
	}
}

export function adUrl(options){
	var url = '';
	if (!options){
		return url;
	}
	switch(options.to_url){
		case 'product':
			//列表页
			if (options.to_type == 'lists'){
				url = {path:'/products',query:{cat_id: options.catid}}
			}else{
				//详情页
				url = {path:'/pro_details', query:{id: options.id}}
			}
			break;
		case 'news':
			//列表页
			if (options.to_type == 'lists'){
				url = {path:'/news', query:{cat_id: options.catid}}
			}else{
				//详情页
				url = {path:'/finddetail', query:{catid: options.catid, id: options.id}}
			}
			break;
		case 'photo':
			//列表页
			if (options.to_type == 'lists'){
				url = {path:'/photo', query:{cat_id: options.catid}}
			}else{
				//详情页
				url = {path: 'photodetail', query: {catid: options.catid, id: options.id}}
			}
			break;
		case 'solution':
			//解决方案
			//列表页
			if (options.to_type == 'lists'){
				url = {path:'/classify', query:{catid: options.catid, title: options.title}}
			}else{
				//详情页
				url = {path:'/classdetail', query:{catid: options.catid, cid: options.cid, title: options.title}}
			}
			break;
		case 'special':
			//专题
			//首页
			if (options.to_type == 'index'){
				url = {path:'/zhuanti', query:{catid: options.catid, title: options.title}}
			}else if (options.to_type == 'lists'){
				//列表页
				url = {path:'/zhuantipro', query:{cat_id: options.catid}}
			}else{
				//详情页
				url = {path:'/pro_details', query:{id: options.id}}
			}
			break;
	}

	return url;
}