/**
 * @file 代码统计入口
 *
 * @author liubin29(liubin29@baidu.com)
 * 2016年10月9日
 */

var info = {
    totalLine: 0,
    blackLine: 0,
    commentLine: 0,
    codeLine: 0
};

function count(content) {
    initInfo();

    content = countTotalLine(content);
    content = countBlackLine(content);
    content = countMultiCommentLine(content);
    content = countSingleCommentLine(content);
    content = countCodeLine(content);

    return info;
}

function countTotalLine(content) {
    info.totalLine = countLine(content);
    return content;
}

function countBlackLine(content) {
    var reg = /^\s*[\n\r]/mg;
    var result = content.match(reg);
    if (result && result.length > 0) {
        info.blackLine += result.length;
        content = content.replace(reg, '');
    }
    return content;
}

function countMultiCommentLine(content) {
    var reg = /\/\*[\s\S]*?\*\/|\<!\-\-[\s\S]*?\-\-\>/mg;
    var result = content.match(reg);
    if (result && result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            info.commentLine += countLine(result[i]) + 1;
        }
        content = content.replace(reg, '');
    }
    return content;
}

function countSingleCommentLine(content) {
    var reg = /\/\/[^\n\r]*/gm;
    var result = content.match(reg);
    if (result && result.length > 0) {
        info.commentLine += result.length;
        content = content.replace(reg, '');
    }
    return content;
}

function countCodeLine(content) {
    content = content.replace(/^\s*[\n\r]/mg, '');
    info.codeLine = countLine(content);
    return content;
}

function countLine(content) {
    if (!content) {
        return 0;
    }
    var reg = /[\n\r]/mg;
    var result = content.match(reg);
    return result ? result.length : 0;
}

function initInfo() {
    info = {
        totalLine: 0,
        blackLine: 0,
        commentLine: 0,
        codeLine: 0
    };
}

exports.count = count;
