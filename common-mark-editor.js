/*
* CommonMarkEditor
*
* https://github.com/walkerchiu/jQuery-common-mark-editor
*
*/

(function(factory){
    if (typeof define === 'function' && define.amd) {   /* RequireJS */
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {           /* Backbone.js */
        factory(require('jquery'));
    } else {                                            /* Jquery plugin */
        factory(jQuery);
    }
}(function($){
    'use strict';

    $.fn.WKCME_cal = function (type, options) {
        return this.each( function (key,value) {
            switch (type) {
                case "input":
                    $(this).click( function (e) {
                        let ft = GetSelectedText();
                        if (ft!= '') $(this).find(".focusText:eq(0)").val(ft);
                    });
                    $(this).keyup( function (e) {
                        let ft = GetSelectedText();
                        if (ft!= '') $(this).find(".focusText:eq(0)").val(ft);
                    });
                    break;
                case "list":
                    $(this).mousemove( function (e) {
                        let left = $(this).position().left;
                        $(this).find("ul").css("left", left).fadeIn();
                    });
                    $(this).mouseleave( function (e) {
                        $(this).find("ul").fadeOut();
                    });
                    break;
                case "item":
                    $(this).click( function (e) {
                        let main     = $(this).closest(".WKCME");
                        let bar      = $(this).closest(".WKCME_Bar");
                        let ft       = main.find(".focusText:eq(0)").val();
                        let textarea = main.find("textarea:eq(0)");
                        let text     = textarea.val();
                        let view     = main.find(".WKCME_view");
                        let name     = $(this).attr("name");
                        main.find(".focusText:eq(0)").val('');
                        bar.find(".WKCME_item_list ul").fadeOut();

                        if (name == 'view' || name == 'return') {
                            if (name == 'view') {
                                let reader = new commonmark.Parser();
                                let writer = new commonmark.HtmlRenderer({ sourcepos: true, softbreak: "<br>" });
                                let parsed = reader.parse(text);
                                let html   = writer.render(parsed);

                                view.get(0).innerHTML = html;
                                view.find('pre code').each( function (i, block) {
                                    hljs.highlightBlock(block);
                                });

                                bar.find(".WKCME_item:not(:last-child)").removeClass('WKCME_item').addClass('WKCME_item_disabled');
                            } else {
                                bar.find(".WKCME_item_disabled:not(:last-child)").removeClass('WKCME_item_disabled').addClass('WKCME_item');
                            }
                            let h = textarea.scrollHeight;
                
                            main.find(".WKCME_edit").toggle();
                            view.css("height", h).toggle();
                            bar.children("li[name='view']").toggle().next().toggle();
                            
                            if (options.MathJax)
                                MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                        } else if (name == 'H') {     $(this).trigger("mousemove");
                        } else if (name == 'align') { $(this).trigger("mousemove");
                        } else {
                            let x = '';
                            switch(name) {
                                case "section": if (ft == '') ft = 'text'; x = "\r\n<section id=\"\" style=\"\">\r\n\r\n" + ft + "\r\n\r\n</section>\r\n";  break;
                                case "H1":      if (ft == '') ft = 'title'; x = "\r\n# " + ft + "\r\n";                     break;
                                case "H2":      if (ft == '') ft = 'title'; x = "\r\n## " + ft + "\r\n";                    break;
                                case "H3":      if (ft == '') ft = 'title'; x = "\r\n### " + ft + "\r\n";                   break;
                                case "H4":      if (ft == '') ft = 'title'; x = "\r\n#### " + ft + "\r\n";                  break;
                                case "hr":      x = "\r\n---\r\n";                                                          break;
                                case "B":       if (ft == '') ft = 'text'; x = ' **' + ft + '** ';                          break;
                                case "I":       if (ft == '') ft = 'text'; x = ' *' + ft + '* ';                            break;
                                case "U":       if (ft == '') ft = 'text'; x = ' <u>' + ft + '</u> ';                       break;
                                case "S":       if (ft == '') ft = 'text'; x = ' <s>' + ft + '</s> ';                       break;
                                case "color":   if (ft == '') ft = 'text'; x = ' <font color="#000">' + ft + '</font> ';    break;
                                case "sup":     if (ft == '') ft = 'text'; x = ' <sup>' + ft + '</sup> ';                   break;
                                case "sub":     if (ft == '') ft = 'text'; x = ' <sub>' + ft + '</sub> ';                   break;
                                case "left":    if (ft == '') ft = 'text'; x = "\r\n<div class='text-left'>\r\n" + ft + "\r\n</div>\r\n";       break;
                                case "center":  if (ft == '') ft = 'text'; x = "\r\n<div class='text-center'>\r\n" + ft + "\r\n</div>\r\n";     break;
                                case "right":   if (ft == '') ft = 'text'; x = "\r\n<div class='text-right'>\r\n" + ft + "\r\n</div>\r\n";      break;
                                case "justify": if (ft == '') ft = 'text'; x = "\r\n<div class='text-justify'>\r\n" + ft + "\r\n</div>\r\n";    break;
                                case "ul":      x = "\r\n- A\r\n- B\r\n- C\r\n";                                            break;
                                case "dl":      x = "\r\n1. A\r\n2. B\r\n3. C\r\n";                                         break;
                                case "link_c":  if (ft == '') ft = 'link'; x = ' [link_name](' + ft + ' "title") ';         break;
                                case "link_h":  if (ft == '') ft = 'link'; x = ' <a href="' + ft + '" target="_blank">' + ft + '</a> ';         break;
                                case "quote":   if (ft == '') ft = 'sentence'; x = "\r\n> " + ft;                           break;
                                case "table":   x = "\r\n<div class=\"table-responsive\">\r\n" +
                                                    "<table class=\"table table-bordered table-hover\">\r\n" +
                                                    "    <thead>\r\n" +
                                                    "        <tr>\r\n" +
                                                    "            <th>header</th>\r\n" +
                                                    "        </tr>\r\n" +
                                                    "    </thead>\r\n" +
                                                    "    <tbody>\r\n" +
                                                    "        <tr>\r\n" +
                                                    "            <td>row1</td>\r\n" +
                                                    "        </tr>\r\n" +
                                                    "        <tr>\r\n" +
                                                    "            <td>row2</td>\r\n" +
                                                    "        </tr>\r\n" +
                                                    "    </tbody>\r\n" +
                                                    "    <tfoot>\r\n" +
                                                    "        <tr>\r\n" +
                                                    "            <td>row1</td>\r\n" +
                                                    "        </tr>\r\n" +
                                                    "    </tfoot>\r\n" +
                                                    "</table>\r\n" +
                                                    "</div>\r\n";                                                           break;
                                case "image_c": if (ft == '') ft = 'url'; x = ' ![img_alt](' + ft + ' "title") ';           break;
                                case "image_h": if (ft == '') ft = 'url'; x = ' <img class="demo" alt="" src="' + ft + '">';    break;
                                case "video":   x = "\r\n<iframe width=\"560\" height=\"315\" src=\"" + x + "\" frameborder=\"0\" allowfullscreen></iframe>\r\n";   break;
                                case "mark":    if (ft == '') ft = 'text'; x = ' <code>' + ft + '</code> ';                 break;
                                case "pre":     x = "\r\n<pre>\r\n" + ft + "\r\n</pre>\r\n";                                break;
                                case "code":    x = "\r\n~~~\r\n" + ft + "\r\n~~~";                                         break;
                            }
                
                            let Area = textarea[0];
                            if (document.selection) { /* For IE */
                                textarea.focus();
                                document.selection.createRange().text = x;
                            } else {
                                let end = Area.selectionEnd;
                                let S = textarea.val().substring(0, Area.selectionStart);
                                let E = textarea.val().substring(end);
                                textarea.val(S + x + E);

                                let index = $("textarea").index(textarea);
                                //document.getElementsByTagName("textarea")[index].focus();
                                document.getElementsByTagName("textarea")[index].setSelectionRange(end + x.length, end + x.length);
                            }
                        }
                    });
                    break;
            }
        });
    };
    $.fn.WKCME = function (options) {
        let settings = $.extend({
            load: "", save: "", section: true, MathJax: true, mark: true, pre: true, code: true,
            minHeight: "100px",
            backgroundColor: "",
            border: "",
            callback: function () {}
        }, options);

        let main    = $("<div>", {class: "WKCME"});
        let input   = $("<input>", {type: "hidden", class: "focusText"});
        let JCP     = $("<input>", {type: "hidden"}).data("picker", "JCP");
        let ul      = $("<ul>", {class: "WKCME_Bar"});
        let li      =   "<li class='WKCME_item WKCME_item_list' name='H'><i class='fa fa-header'></i>"+
                            "<ul>" +
                                "<li class='WKCME_item' name='H1'><strong>H1</strong></li>"+
                                "<li class='WKCME_item' name='H2'><strong>H2</strong></li>"+
                                "<li class='WKCME_item' name='H3'><strong>H3</strong></li>"+
                                "<li class='WKCME_item' name='H4'><strong>H4</strong></li>"+
                            "</ul></li>" +
                        "<li class='WKCME_item' name='hr'>hr</li>"+
                        "<li class='WKCME_item' name='B'><i class='fa fa-bold'></i></li>"+
                        "<li class='WKCME_item' name='I'><i class='fa fa-italic'></i></li>"+
                        "<li class='WKCME_item' name='U'><i class='fa fa-underline'></i></li>"+
                        "<li class='WKCME_item' name='S'><i class='fa fa-strikethrough'></i></li>"+
                        "<li class='WKCME_item' name='color'><i class='fa fa-font'></i></li>"+
                        "<li class='WKCME_item' name='sup'><i class='fa fa-superscript'></i></li>"+
                        "<li class='WKCME_item' name='sub'><i class='fa fa-subscript'></i></li>"+
                        "<li class='WKCME_item WKCME_item_list' name='align'><i class='fa fa-align-left'></i>"+
                            "<ul>" +
                                "<li class='WKCME_item' name='left'><i class='fa fa-align-left'></i></li>"+
                                "<li class='WKCME_item' name='center'><i class='fa fa-align-center'></i></li>"+
                                "<li class='WKCME_item' name='right'><i class='fa fa-align-right'></i></li>"+
                                "<li class='WKCME_item' name='justify' title='Only for IE'><i class='fa fa-align-justify'></i></li>"+
                            "</ul></li>" +
                        "<li class='WKCME_item' name='ul'><i class='fa fa-list-ul'></i></li>"+
                        "<li class='WKCME_item' name='dl'><i class='fa fa-list-ol'></i></li>"+
                        "<li class='WKCME_item WKCME_item_list' name='link'><i class='fa fa-link'></i>"+
                            "<ul>" +
                                "<li class='WKCME_item' name='link_c'>Commonmark</li>"+
                                "<li class='WKCME_item' name='link_h'>Html</li>"+
                            "</ul></li>" +
                        "<li class='WKCME_item' name='quote'><i class='fa fa-quote-left'></i></li>"+
                        "<li class='WKCME_item' name='table'><i class='fa fa-table'></i></li>"+
                        "<li class='WKCME_item WKCME_item_list' name='image'><i class='fa fa-image'></i>"+
                            "<ul>" +
                                "<li class='WKCME_item' name='image_c'>Commonmark</li>"+
                                "<li class='WKCME_item' name='image_h'>Html</li>"+
                            "</ul></li>" +
                        "<li class='WKCME_item' name='video'><i class='fa fa-youtube-play'></i></li>";
        if (settings.mark)
            li += "<li class='WKCME_item' name='mark'>code</li>";
        if (settings.pre)
            li += "<li class='WKCME_item' name='pre'>pre</li>";
        if (settings.code)
            li += "<li class='WKCME_item' name='code'><i class='fa fa-code'></i></li>";
            li += "<li class='WKCME_item' name='view'><i class='fa fa-eye'></i></li>"+
                        "<li class='WKCME_item' name='return' style='display: none;'><i class='fa fa-edit'></i></li>";
        if (settings.section != "")
            li = "<li class='WKCME_item' name='section'><i class='fa fa-paragraph'></i>"+ li;
        if (settings.save != "")
            li = "<li class='WKCME_item' name='save' id='"+ settings.save +"'><i class='fa fa-floppy-o'></i></li>"+ li;
        if (settings.load != "")
            li = "<li class='WKCME_item' name='load' id='"+ settings.load +"'><i class='fa fa-folder-open-o'></i></li>"+ li;
        let edit    = $(this).clone().addClass("WKCME_edit").css("min-height", settings.minHeight);
        let dataset = $(this).data();
        $.each(dataset, function (key, value) {
            edit.data(key, value);
        })
        let view    = $("<div>", {class: "WKCME_view"});
        ul.append(li).children("li.WKCME_item_list").WKCME_cal("list", settings)
                     .closest(".WKCME_Bar").find("li.WKCME_item").WKCME_cal("item", settings);
        let tmp     = main.WKCME_cal("input", settings).append(input)
                                                       .append(ul)
                                                       .append(edit).append(view);
        settings.callback.call(this);
        return $(this).after(tmp).remove();
    };
    $.fn.WKCME_init = function (options) {
        let settings = $.extend({
            load: "", save: "", section: true, MathJax: true, mark: true, pre: true, code: true,
            minHeight: "100px",
            backgroundColor: "",
            border: "",
            callback: function () {}
        }, options);

        $(this).find("textarea[data-editor='WKCME']").each( function () {
            $(this).WKCME(settings);
        });
    };
}));
