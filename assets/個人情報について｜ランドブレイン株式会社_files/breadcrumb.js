/*----------------------------------------*/
/*  breadCrumb.js ( 2012/11/16 )
/*  http://tshinobu.com/lab/breadCrumbJs/
/*  readcrumb (topicpath) generator by javascript
/*----------------------------------------*/

breadCrumbJsData = function(){

    /*----------------------------------------*/
    /*  index.html をパンくずリスト生成に含めるかどうか定義します。
    /*  false … index.html を無視する
    /*  true … index.html を無視しない
    /*----------------------------------------*/
    this.indexMatch = false;

    /*----------------------------------------*/
    /*  パンくずリストから除外するパスを定義してください。
    /*  最後に「/」を付けないようにしてください。
    /*  除外しない場合 … ''
    /*  除外する場合    … '/lab/breadCrumbJs'
    /*----------------------------------------*/
    this.ignorePath = '';

    /*----------------------------------------*/
    /*  パンくずリストに表示する名前を定義してください。
    /*  （書式） "ディレクトリ名" : "表示名"
    /*----------------------------------------*/
    this.contentName = {
        "home" : "ランドブレイン TOP", // この行は残してください。
        "/topics.html" : "Topics一覧",
        "/hp/outline/" : "会社概要",
        "/hp/outline/greeting.html" : "社長挨拶",
        "/hp/outline/gaiyou.html" : "ランドブレイン概要",
        "/hp/outline/organization.html" : "組織図",
        "/hp/outline/history.html" : "HISTORY／沿革",
        "/hp/outline/access.html" : "アクセス",
        "/hp/achievement/" : "業務実績",
        "/hp/achievement/hukkou.html" : "復興支援",
        "/hp/achievement/hukkou_hanshin.html" : "阪神・淡路大震災での当社の取組",
        "/hp/achievement/hukkou_nigata.html" : "新潟中越大地震での当社の取組",
        "/hp/achievement/hukkou_higashinihon.html" : "東日本大震災での当社の取組",
        "/hp/achievement/kokudo_kyoujinka.html" : "国土強靭化",
        "/hp/achievement/kokudo_kyoujinka_more.html" : "[国土強靭化] 詳細業務一覧",
        "/hp/achievement/creation.html" : "地方創生",
        "/hp/achievement/creation_more.html" : "[地方創生] 詳細業務一覧",
        "/hp/achievement/society.html" : "健康な社会・文化",
        "/hp/achievement/society_more.html" : "[健康な社会・文化] 詳細業務一覧",
        "/hp/achievement/nousongyoson.html" : "持続する農村漁村",
        "/hp/achievement/nousongyoson_more.html" : "[持続する農村漁村] 詳細業務一覧",
        "/hp/achievement/sangyoshinkou.html" : "産業振興・雇用創出",
        "/hp/achievement/sangyoshinkou_more.html" : "[産業振興・雇用創出] 詳細業務一覧",
        "/hp/achievement/toshikeikaku.html" : "都市計画",
        "/hp/achievement/toshikeikaku_more.html" : "[都市計画] 詳細業務一覧",
        "/hp/achievement/publicfacilities.html" : "住宅・公共施設",
        "/hp/achievement/publicfacilities_more.html" : "[住宅・公共施設] 詳細業務一覧",
        "/hp/achievement/traffic.html" : "交通計画",
        "/hp/achievement/traffic_more.html" : "[交通計画] 詳細業務一覧",
        "/hp/achievement/environment.html" : "環境・エネルギー",
        "/hp/achievement/environment_more.html" : "[環境・エネルギー] 詳細業務一覧",
        "/hp/achievement/socialwork.html" : "社会事業",
        "/hp/achievement/socialwork_more.html" : "[社会事業] 詳細業務一覧",
        "/hp/report/" : "技術レポート",
        "/hp/recruit/" : "採用情報",
        "/hp/recruit/new.html" : "新規採用",
        "/hp/recruit/career.html" : "中途採用",
        "/hp/recruit/other.html" : "インターン・アルバイト採用",
        "/hp/inq/" : "お問い合わせ",



        "" : "" //この行は残してください。
    };
}
var breadCrumbJsData = new breadCrumbJsData();

function breadCrumbJs(){
    /*----------------------------------------*/
    /*  以下条件分岐 / 表示処理部分
    /*----------------------------------------*/
    var URL = window.location.pathname.replace(breadCrumbJsData.ignorePath, '');
    var thisURL = URL.match(/(.*?)\//g);
    var fileName =  window.location.pathname.match(/([^¥/]+?)$/);

    if ( fileName && (!( fileName[0].match("index") && !breadCrumbJsData.indexMatch )) ){ thisURL.push( fileName[0] ); }
    var drw = document.getElementById("breadCrumb");
    var rootingPath = "";
    if ( drw.tagName == "P" | drw.tagName == "DIV" ){
        for( i=0; i<thisURL.length; i++){
            rootingPath += thisURL[i];
            if ( i == 0 ){
                drw.innerHTML = '<a href="'+breadCrumbJsData.ignorePath+'/">' + funcIndexSearch('home') + '</a>';
            } else if ( i == thisURL.length - 1 ){
                drw.innerHTML += ' &gt; <strong>' + funcIndexSearch(rootingPath) + '</strong>';
            } else if (thisURL[i] != 'hp/') {//「cmn」は除外
                drw.innerHTML += ' &gt; <a href="'+breadCrumbJsData.ignorePath+''+rootingPath+'">' + funcIndexSearch(rootingPath) + '</a>';
            }
        }
    }
    if ( drw.tagName == "UL" | drw.tagName == "OL" ){
        for( i=0; i<thisURL.length; i++){
            rootingPath += thisURL[i];
            if ( i == 0 ){
                drw.innerHTML = '<li><a href="'+breadCrumbJsData.ignorePath+'/">' + funcIndexSearch('home') + '</a></li>';
            } else if ( i == thisURL.length - 1 ){
                drw.innerHTML += ' <li class="active"><strong>' + funcIndexSearch(rootingPath) + '</strong></li>';
            } else {
                drw.innerHTML += ' <li><a href="'+breadCrumbJsData.ignorePath+''+rootingPath+'">' + funcIndexSearch(rootingPath) + '</a></li>';
            }
        }
    }
}
function funcIndexSearch(){
    /*----------------------------------------*/
    /*  パンくずリスト生成検索処理
    /*----------------------------------------*/
    keyword = breadCrumbJsData.contentName[arguments[0]];
    if(keyword == undefined){
        return arguments[0].match(/(.*?)\//g).pop().replace("/","");
    } else{
        return keyword;
    }
}

if(window.addEventListener) {
    window.addEventListener("load", breadCrumbJs, false);
}
else if(window.attachEvent) {
    window.attachEvent("onload", breadCrumbJs);
}
