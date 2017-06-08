(function(k){k.fn.tipuesearch=function(A){var e=k.extend({show:7,newWindow:!1,showURL:!0,showTitleCount:!0,minimumLength:3,descriptiveWords:25,highlightTerms:!0,highlightEveryTerm:!1,mode:"static",liveDescription:"*",liveContent:"*",contentLocation:"tipuesearch/tipuesearch_content.json",debug:!1},A);return this.each(function(){function y(c){return decodeURIComponent(((new RegExp("[?|&]"+c+"=([^&;]+?)(&|#|;|$)")).exec(location.search)||[,""])[1].replace(/\+/g,"%20"))||null}function v(p,u){k("#tipue_search_content").hide();k("#tipue_search_content").html('<div class="tipue_search_spinner"><div class="tipue_search_rect1"></div><div class="tipue_search_rect2"></div><div class="rect3"></div></div>');k("#tipue_search_content").show();var h="",t=!1;var m=!1;var l=!0;var q=0;found=[];var f=k("#tipue_search_input").val().toLowerCase(),f=k.trim(f);if(f.match('^"')&&f.match('"$')||f.match("^'")&&f.match("'$")){l=!1}if(l){var g=f.split(" ");for(var f="",a=0;a<g.length;a++){var d=!0;for(var b=0;b<tipuesearch_stop_words.length;b++){g[a]==tipuesearch_stop_words[b]&&(d=!1,m=!0)}d&&(f=f+" "+g[a])}f=k.trim(f);g=f.split(" ")}else{f=f.substring(1,f.length-1)}if(f.length>=e.minimumLength){if(l){if(u){var r=f;for(a=0;a<g.length;a++){for(b=0;b<tipuesearch_replace.words.length;b++){g[a]==tipuesearch_replace.words[b].word&&(f=f.replace(g[a],tipuesearch_replace.words[b].replace_with),t=!0)}}g=f.split(" ")}m=f;for(a=0;a<g.length;a++){for(b=0;b<tipuesearch_stem.words.length;b++){g[a]==tipuesearch_stem.words[b].word&&(m=m+" "+tipuesearch_stem.words[b].stem)}}g=m.split(" ");for(a=0;a<c.pages.length;a++){l=0;m=c.pages[a].text;for(b=0;b<g.length;b++){d=new RegExp(g[b],"gi");if(-1!=c.pages[a].title.search(d)){var n=c.pages[a].title.match(d).length;l+=20*n}-1!=c.pages[a].text.search(d)&&(n=c.pages[a].text.match(d).length,l+=20*n);e.highlightTerms&&(n=e.highlightEveryTerm?new RegExp("("+g[b]+")","gi"):new RegExp("("+g[b]+")","i"),m=m.replace(n,'<span class="h01">$1</span>'));-1!=c.pages[a].tags.search(d)&&(n=c.pages[a].tags.match(d).length,l+=10*n);-1!=c.pages[a].url.search(d)&&(l+=20);if(0!=l){for(d=0;d<tipuesearch_weight.weight.length;d++){c.pages[a].url==tipuesearch_weight.weight[d].url&&(l+=tipuesearch_weight.weight[d].score)}}g[b].match("^-")&&(d=new RegExp(g[b].substring(1),"i"),-1!=c.pages[a].title.search(d)||-1!=c.pages[a].text.search(d)||-1!=c.pages[a].tags.search(d))&&(l=0)}0!=l&&(found.push({score:l,title:c.pages[a].title,desc:m,url:c.pages[a].url}),q++)}}else{for(a=0;a<c.pages.length;a++){l=0;m=c.pages[a].text;d=new RegExp(f,"gi");-1!=c.pages[a].title.search(d)&&(n=c.pages[a].title.match(d).length,l+=20*n);-1!=c.pages[a].text.search(d)&&(n=c.pages[a].text.match(d).length,l+=20*n);e.highlightTerms&&(n=e.highlightEveryTerm?new RegExp("("+f+")","gi"):new RegExp("("+f+")","i"),m=m.replace(n,'<span class="h01">$1</span>'));-1!=c.pages[a].tags.search(d)&&(n=c.pages[a].tags.match(d).length,l+=10*n);-1!=c.pages[a].url.search(d)&&(l+=20);if(0!=l){for(d=0;d<tipuesearch_weight.weight.length;d++){c.pages[a].url==tipuesearch_weight.weight[d].url&&(l+=tipuesearch_weight.weight[d].score)}}0!=l&&(found.push({score:l,title:c.pages[a].title,desc:m,url:c.pages[a].url}),q++)}}if(0!=q){e.showTitleCount&&0==z&&(document.title="("+q+") "+document.title,z++);1==t&&(h+='<div id="tipue_search_warning">'+tipuesearch_string_2+" "+f+". "+tipuesearch_string_3+' <a id="tipue_search_replaced">'+r+"</a></div>");1==q?h+='<div id="tipue_search_results_count">'+tipuesearch_string_4+"</div>":(c_c=q.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","),h+='<div id="tipue_search_results_count">'+c_c+" "+tipuesearch_string_5+"</div>");found.sort(function(a,b){return b.score-a.score});for(a=r=0;a<found.length;a++){if(r>=p&&r<e.show+p&&(h+='<div class="tipue_search_content_title"><a href="'+found[a].url+'"'+x+">"+found[a].title+"</a></div>",e.debug&&(h+='<div class="tipue_search_content_debug">Score: '+found[a].score+"</div>"),e.showURL&&(b=found[a].url.toLowerCase(),0==b.indexOf("http://")&&(b=b.slice(7)),h+='<div class="tipue_search_content_url"><a href="'+found[a].url+'"'+x+">"+b+"</a></div>"),found[a].desc)){b=found[a].desc;g="";t=b.split(" ");if(t.length<e.descriptiveWords){g=b}else{for(b=0;b<e.descriptiveWords;b++){g+=t[b]+" "}}g=k.trim(g);"."!=g.charAt(g.length-1)&&(g+=" ...");h+='<div class="tipue_search_content_text">'+g+"</div>"}r++}if(q>e.show){a=Math.ceil(q/e.show);r=p/e.show;h+='<div id="tipue_search_foot"><ul id="tipue_search_foot_boxes">';0<p&&(h+='<li><a class="tipue_search_foot_box" id="'+(p-e.show)+"_"+u+'">'+tipuesearch_string_6+"</a></li>");2>=r?(q=a,3<a&&(q=3),b=0):(q=r+2,q>a&&(q=a),b=r-1);for(;b<q;b++){h=b==r?h+('<li class="current">'+(b+1)+"</li>"):h+('<li><a class="tipue_search_foot_box" id="'+b*e.show+"_"+u+'">'+(b+1)+"</a></li>")}r+1!=a&&(h+='<li><a class="tipue_search_foot_box" id="'+(p+e.show)+"_"+u+'">'+tipuesearch_string_7+"</a></li>");h+="</ul></div>"}}else{h+='<div id="tipue_search_warning">'+tipuesearch_string_8+"</div>"}}else{m?h+='<div id="tipue_search_warning">'+tipuesearch_string_8+". "+tipuesearch_string_9+"</div>":(h+='<div id="tipue_search_warning">'+tipuesearch_string_10+"</div>",h=1==e.minimumLength?h+('<div id="tipue_search_warning">'+tipuesearch_string_11+"</div>"):h+('<div id="tipue_search_warning">'+tipuesearch_string_12+" "+e.minimumLength+" "+tipuesearch_string_13+"</div>"))}k("#tipue_search_content").hide();k("#tipue_search_content").html(h);k("#tipue_search_content").slideDown(200);k("#tipue_search_replaced").click(function(){v(0,!1)});k(".tipue_search_foot_box").click(function(){var a=k(this).attr("id").split("_");v(parseInt(a[0]),a[1])})}var c={pages:[]};k.ajaxSetup({async:!1});var z=0;if("live"==e.mode){for(var w=0;w<tipuesearch_pages.length;w++){k.get(tipuesearch_pages[w]).done(function(p){var u=k(e.liveContent,p).text(),u=u.replace(/\s+/g," "),h=k(e.liveDescription,p).text(),h=h.replace(/\s+/g," "),t=p.toLowerCase().indexOf("<title>"),m=p.toLowerCase().indexOf("</title>",t+7);p=-1!=t&&-1!=m?p.slice(t+7,m):tipuesearch_string_1;c.pages.push({title:p,text:h,tags:u,url:tipuesearch_pages[w]})})}}"json"==e.mode&&k.getJSON(e.contentLocation).done(function(e){c=k.extend({},e)});"static"==e.mode&&(c=k.extend({},tipuesearch));var x="";e.newWindow&&(x=' target="_blank"');y("q")&&(k("#tipue_search_input").val(y("q")),v(0,!0));k(this).keyup(function(c){"13"==c.keyCode&&v(0,!0)})})}})(jQuery);