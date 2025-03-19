// --------------------------------------------------------------------
// Author  : mashimonator
// Create  : 2009/09/28
// Update  : 2009/09/28
//         : 2011/05/16 アイコンの付加を特定IDを持つ要素に限定できるように修正
//         : 2012/09/08 アイコンの付加を特定クラス名を持つ要素に限定できるように修正
// Description : リンクに対応したアイコンを付加する
// --------------------------------------------------------------------

var addIcon2Links = {
    //-----------------------------------------
    // 設定値
    //-----------------------------------------
    config : {
        // アイコン付加の対象とする要素を限定する場合（※両方指定されている場合はID指定の方が優先されます。）※未指定の場合は全要素が対象
        extract : {
            // 指定IDを持つ要素内のリンクのみに限定する場合にIDを指定
            id : '',
            // 指定クラスを持つa要素のみに適用する場合にクラス名を指定
            cls : ''
        },
        // アイコン配置ディレクトリ（ルート・絶対・相対パスで指定可能）
        imageDir : '../images/icon/',
        // アイコンを付加する拡張子 [ 拡張子, 画像ファイル名, クラス名 ]
        extension : [
            [ '.pdf', 'pdf.png', 'iconPDFl' ],
            [ '.xls', 'xls.png', 'iconXLSl' ],
            [ '.xlsx', 'xls.png', 'iconXLSl' ],
            [ '.doc', 'doc.png', 'iconDOCl' ],
            [ '.docx', 'doc.png', 'iconDOCl' ],
            [ '.ppt', 'ppt.png', 'iconPPTl' ],
            [ '.pptx', 'ppt.png', 'iconPPTl' ],
            [ '.zip', 'download.png', 'iconDOWNLOADl' ],
            [ '.lzh', 'download.png', 'iconDOWNLOADl' ],
            [ '.cab', 'zip.png', 'iconZIPl' ],
            [ '.mov', 'mov.png', 'iconMOVl' ],
            [ '.txt', 'txt.png', 'iconTXTl' ]
        ],
        // 上記以外でアイコンを付加するリンク（true：付加する／false：付加しない）
        flags : {
            external : [ true, 'window.png', 'iconWINDOW' ], // 外部サイトへのリンク
            mail : [ false, 'mail.png', 'iconMAIL' ], // mailto
            http : [ false, 'window.png', 'addIconHttp' ], // httpへのリンク（httpsページ内のみ有効）
            https : [ false, 'window.png', 'addIconHttps' ], // httpsへのリンク（httpページ内のみ有効）
            blank : [ false, 'window.png', 'addIconBlank' ] // 別ウィンドウ
        },
        // 各アイコンのスタイル
        styles : {
            //extension : 'no-repeat right center; padding-right:22px;',
            //external : 'no-repeat left center; padding-right:22px;',
            //mail : 'no-repeat left center; padding-right:22px;',
            //http : 'no-repeat left center; padding-right:22px;',
            //https : 'no-repeat left center; padding-right:22px;',
            //blank : 'no-repeat left center; padding-right:22px;'
        },
        // httpのドメイン(httpsとドメインが変わる場合は文字列で設定)
        httpDomain : location.hostname,
        // httpsのドメイン(httpとドメインが変わる場合は文字列で設定)
        httpsDomain : location.hostname,
        // 該当ページのURL（変更不可）
        url : location.href
    },
    initialize : function() {
        addIcon2Links.addEvent( window, 'load',  addIcon2Links.setStyle );
        addIcon2Links.addEvent( window, 'load',  addIcon2Links.setIcon );
    },
    setStyle : function() {
        var imagePath = '';
        if ( addIcon2Links.config.imageDir.match(/^http:/) || addIcon2Links.config.imageDir.match(/^https:/) ) {
            imagePath = addIcon2Links.config.imageDir;
        } else if ( addIcon2Links.config.imageDir.match(/^[/]/) ) {
            if ( addIcon2Links.config.url.match(/^https:/) ) {
                imagePath = 'https://' + addIcon2Links.config.httpsDomain + addIcon2Links.config.imageDir;
            } else {
                imagePath = 'http://' + addIcon2Links.config.httpDomain + addIcon2Links.config.imageDir;
            }
        } else {
            imagePath = addIcon2Links.config.imageDir;
        }
        // extension
        for (var i = 0, len = addIcon2Links.config.extension.length; i < len; i++) {
            addIcon2Links.addCssRule('a.' + addIcon2Links.config.extension[i][2], 'background:url(' + imagePath + addIcon2Links.config.extension[i][1] + ') ' + addIcon2Links.config.styles.extension);
        }
        // external
        if ( addIcon2Links.config.flags.external[0] ) {
            addIcon2Links.addCssRule('a.' + addIcon2Links.config.flags.external[2], 'background:url(' + imagePath + addIcon2Links.config.flags.external[1] + ') ' + addIcon2Links.config.styles.external);
        }
        // mailto
        if ( addIcon2Links.config.flags.mail[0] ) {
            addIcon2Links.addCssRule('a.' + addIcon2Links.config.flags.mail[2], 'background:url(' + imagePath + addIcon2Links.config.flags.mail[1] + ') ' + addIcon2Links.config.styles.mail);
        }
        // http
        if ( addIcon2Links.config.flags.http[0] ) {
            addIcon2Links.addCssRule('a.' + addIcon2Links.config.flags.http[2], 'background:url(' + imagePath + addIcon2Links.config.flags.http[1] + ') ' + addIcon2Links.config.styles.http);
        }
        // https
        if ( addIcon2Links.config.flags.https[0] ) {
            addIcon2Links.addCssRule('a.' + addIcon2Links.config.flags.https[2], 'background:url(' + imagePath + addIcon2Links.config.flags.https[1] + ') ' + addIcon2Links.config.styles.https);
        }
        // blank
        if ( addIcon2Links.config.flags.blank[0] ) {
            addIcon2Links.addCssRule('a.' + addIcon2Links.config.flags.blank[2], 'background:url(' + imagePath + addIcon2Links.config.flags.blank[1] + ') ' + addIcon2Links.config.styles.blank);
        }
    },
    setIcon : function() {
        var elements = null;
        if ( addIcon2Links.config.extract.id ) {
            var targetElm = document.getElementById(addIcon2Links.config.extract.id);
            if ( !targetElm ) {
                return;
            } else {
                elements = targetElm.getElementsByTagName('A');
            }
        } else {
            if ( addIcon2Links.config.extract.cls ) {
                elements = addIcon2Links.getElementsByClassName(addIcon2Links.config.extract.cls);
                if ( !elements ) {
                    return;
                }
                /*
                var tmp = new Array();
                for (var i = 0, len = elements.length; i < len; i++) {
                    var links = elements[i].getElementsByTagName('A');
                    [].push.apply(tmp, links);
                }
                elements = tmp;
                */
            } else {
                elements = document.getElementsByTagName('A');
            }
        }
        for (var i = 0, len = elements.length; i < len; i++) {
            // リンク形式のチェック
            if ( !addIcon2Links.checkTextLink(elements[i]) ) {
                continue;
            }
            var setFlag = false;
            var href = elements[i].getAttribute('href');
            if ( !href ) {
                continue;
            }
            // extension
            for (var x = 0, len2 = addIcon2Links.config.extension.length; x < len2; x++) {
                var reg = new RegExp( addIcon2Links.config.extension[x][0] + '$', 'i' );
                if ( href.match(reg) ) {
                    elements[i].className += ' ' + addIcon2Links.config.extension[x][2];
                    setFlag = true;
                    break;
                }
            }
            // mailto
            if ( !setFlag && addIcon2Links.config.flags.mail[0] ) {
                if ( href.match(/^mailto:/i) ) {
                    elements[i].className += ' ' + addIcon2Links.config.flags.mail[2];
                    setFlag = true;
                }
            }
            // external
            if ( !setFlag && addIcon2Links.config.flags.external[0] && addIcon2Links.config.httpDomain && addIcon2Links.config.httpsDomain ) {
                var reg = new RegExp( addIcon2Links.config.httpDomain );
                var reg2 = new RegExp( addIcon2Links.config.httpsDomain );
                if ( href.match(/^(http:|https:)/) && ( !href.match(reg) && !href.match(reg2) ) ) {
                    elements[i].className += ' ' + addIcon2Links.config.flags.external[2];
                    setFlag = true;
                }
            }
            // http
            if ( !setFlag && addIcon2Links.config.flags.http[0] && addIcon2Links.config.url.match(/^https:/) && addIcon2Links.config.httpDomain ) {
                var reg = new RegExp( addIcon2Links.config.httpDomain );
                if ( href.match(/^http:/) && href.match(reg) ) {
                    elements[i].className += ' ' + addIcon2Links.config.flags.http[2];
                    setFlag = true;
                }
            }
            // https
            if ( !setFlag && addIcon2Links.config.flags.https[0] && addIcon2Links.config.url.match(/^http:/) && addIcon2Links.config.httpsDomain ) {
                var reg = new RegExp( addIcon2Links.config.httpsDomain );
                if ( href.match(/^https:/) && href.match(reg) ) {
                    elements[i].className += ' ' + addIcon2Links.config.flags.https[2];
                    setFlag = true;
                }
            }
            // blank
            if ( !setFlag && addIcon2Links.config.flags.blank[0] ) {
                var target = elements[i].getAttribute('target');
                if ( target && target.match('_blank') ) {
                    elements[i].className += ' ' + addIcon2Links.config.flags.blank[2];
                }
            }
        }
    },
    addCssRule : function ( selector, declarations ) {
        var sheets = document.styleSheets;
        if ( sheets ) {
            if ( sheets.length < 1 ) {
                var style = document.createElement('style');
                style.setAttribute('type', 'text/css');
                style.innerHTML += selector + '{' + declarations + '}';
                var head = document.getElementsByTagName('HEAD');
                head[0].appendChild(style);
            } else {
                var tSheet = sheets[sheets.length-1];
                if ( document.all ) {
                    tSheet.addRule( selector, declarations );
                } else {
                    if ( !tSheet.cssRules ) {
                        tSheet.insertRule( selector + '{' + declarations + '}', 0 );
                    } else {
                        tSheet.insertRule( selector + '{' + declarations + '}', tSheet.cssRules.length );
                    }
                }
            }
        }
    },
    checkTextLink : function ( element ) {
        var imgs = element.getElementsByTagName('IMG');
        switch (imgs.length) {
            case 0:
                return true;
                break;
            default:
                return false;
                break;
        }
    },
    getElementsByClassName : function( cls ) {
        var elements = new Array();
        if ( document.evaluate ) {
            var xpathExpression = '/descendant::*[contains(@class,"'+ cls + '")]';
            var iterator = document.evaluate(xpathExpression, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var i = 0, len = iterator.snapshotLength; i < len; i++) {
                var elm = iterator.snapshotItem(i);
                elements[elements.length] = elm;
            }
        } else if ( document.querySelectorAll ) {
            elements = document.querySelectorAll('.'+cls);
        } else {
            var nodes = document.all ? document.all : document.getElementsByTagName('*');
            for (var i = 0, len = nodes.length; i < len; i++) {
                var elm = nodes.item(i);
                if ( elm.className.match(cls) ) {
                    elements[elements.length] = elm;
                }
            }
        }
        return elements;
    },
    addEvent : function( target, event, func ) {
        try {
            target.addEventListener(event, func, false);
        } catch (e) {
            target.attachEvent('on' + event, func);
        }
    }
}
addIcon2Links.initialize();
