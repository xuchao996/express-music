var express = require("express");
var request = require("request");

var router = express.Router();

const values = {
    title: 'Musics',
    recommend: "Recommend for you",
    new_release: "New release",
    top_of: "top of the song list",
    list: [{
        ListName: 'testa'
    }]
}

// 临时注释，调试方便
// router.get('/', global.utils.checkNotLogin);

function getRandomList (err, success) {
    let url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=36&_=1520777874472"
    url += '&jsonpCallback=asonglist1459961045566';
   
    request({
        method: "GET",
        url: url,
        headers: {"referer": "https://c.y.qq.com"}
    }, function (_err, _res, _resBody) {
        if (_err) {
            err(_err);
            return
        }
        let data = _resBody.slice(' asonglist1459961045566('.length, -')'.length);
        data = JSON.parse(data);
        success(data)
    }, function (_err) {
        if (_err) {
            err(_err);
            return
        }
    })
}

// 获取歌单，用英文 songslist 代表
function getsongsList (_offset, err, success) {
    let offset = _offset || 0
    var target_url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg' +
            '?rnd=0.4781484879517406&g_tk=732560869&jsonpCallback=MusicJsonCallback' +
            '&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8' +
            '&notice=0&platform=yqq&needNewCode=0' +
            '&categoryId=10000000&sortId=5&sin=' + offset + '&ein=' + (49 + offset);
    request({
        method: "GET",
        url: target_url,
        headers: {"referer": "https://c.y.qq.com"}
    }, function (_err, _res, _resBody) {
        if (_err) {
            err(_err);
            return
        }
        let data = _resBody.slice('MusicJsonCallback('.length, -')'.length);
        data = JSON.parse(data);
        let arr = [];
        data.data.list.forEach(item => {
            var result = {
                'cover_img_url': item.imgurl, // 图片
                'title': item.dissname, // title
                'id':'qqplaylist_' + item.dissid, // 
                'source_url': 'http://y.qq.com/#type=taoge&id=' + item.dissid,
            }
            arr.push(result)
        })
        success(arr)
    }, function (_err) {
        if (_err) {
            err(_err);
            return
        }
    })
}

function getsongsById (list_id, err, success) {
    var target_url = 'http://i.y.qq.com/qzone-music/fcg-bin/fcg_ucc_getcdinfo_' +
                    'byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&jsonpCallback=' +
                    'jsonCallback&nosign=1&disstid=' + list_id +'&g_tk=5381&loginUin=0&hostUin=0' +
                    '&format=jsonp&inCharset=GB2312&outCharset=utf-8&notice=0' +
                    '&platform=yqq&jsonpCallback=jsonCallback&needNewCode=0';
    // 加上 请求头 referer y.qq.com
    request({
        method: "GET",
        url: target_url,
        headers: {"Referer": "https://y.qq.com/"},
    }, function (_err, _res, _resBody) {
        if (_err) {
            err(_err);
            return
        }
        let data = _resBody.slice('jsonCallback('.length, -')'.length);
        data = JSON.parse(data);
        if (data.cdlist.length === 0) {
            success({})
            return
        }
        var info = {
            'cover_img_url': data.cdlist[0].logo,
            'title': data.cdlist[0].dissname,
            'id': 'qqplaylist_' + list_id,
            'source_url': 'http://y.qq.com/#type=taoge&id=' + list_id,
            'songnum': data.cdlist[0].songnum
        };
        var tracks = [];
        data.cdlist[0].songlist.forEach(function (item) {
            var track = qq_convert_song(item)
            tracks.push(track)
        })
        info['tracks'] = tracks
        success(info)
    }, function (_err) {
        if (_err) {
            err(_err);
            return
        }
    })
}
function qq_convert_song (song) {
    var d = {
        'id': 'qqtrack_' + song.songmid,
        'title': song.songname,
        'artist': song.singer[0].name,
        'artist_id': 'qqartist_' + song.singer[0].mid,
        'album': song.albumname,
        'album_id': 'qqalbum_' + song.albummid,
        'img_url': qq_get_image_url(song.albummid, 'album'),
        'source': 'qq',
        'source_url': 'http://y.qq.com/#type=song&mid=' +
        song.songmid + '&tpl=yqq_song_detail',
        'url': 'qqtrack_' + song.songmid,
        'disabled': !qq_is_playable(song)
    }
    return d
}

router.get('/', function (req, res, next) {
    // let url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8¬ice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=36&_=1520777874472"
    getRandomList(function (err){
        if (err) {
            console.log(err)
            res.locals.message = '出错了'
        }
    }, function (data) {
        // console.log(data.songlist)
        if (data) values.list = data.songlist;
        res.render('music', values);
    })
});

// 歌单列表
router.get('/songslist/', function (req, res, next) {
    let offset = getParameterByName('offset', req.url)
    getsongsList(offset, function (err) {
        res.status(200).json(err)
    }, function (data) {
        res.status(200).json(data)
    })
})

// 歌单
router.get('/songs/:id', function (req, res, next) {
    var listId = req.params.id
    getsongsById(listId, function (err) {
        next(err)
    }, function (data) {
        res.render('./songs/songs', data)
    })
})

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function qq_is_playable(song) {
    var switch_flag = song['switch'].toString(2).split('');
    switch_flag.pop();
    switch_flag.reverse();
    // flag switch table meaning:
    // ["play_lq", "play_hq", "play_sq", "down_lq", "down_hq", "down_sq", "soso", "fav", "share", "bgm", "ring", "sing", "radio", "try", "give"]
    var play_flag = switch_flag[0];
    var try_flag = switch_flag[13];
    return ((play_flag == 1) || ((play_flag == 1) && (try_flag == 1)));
}

// song img
function qq_get_image_url(qqimgid, img_type) {
    if (qqimgid == null) {
        return '';
    }
    var category = '';
    if(img_type == 'artist') {
        category = 'mid_singer_300'
    }
    if(img_type == 'album') {
        category = 'mid_album_300';
    }

    var s = [category, qqimgid[qqimgid.length - 2], qqimgid[qqimgid.length - 1], qqimgid].join('/');
    var url = 'http://imgcache.qq.com/music/photo/' + s + '.jpg';
    return url;
}

module.exports = router;