var client_id ='client_id';//<---- soundcloud api client id
const fs = require('fs');
const mkdirp = require('mkdirp');
const download = require('download');
const download2 = require('my-wget');
const SimpleSoundCloud = require('simple-soundcloud')(client_id);
var soundcloudUser = new SimpleSoundCloud.User('azop-corp');///<---resolve with user id
var i = 0;
var notdownloadable = [];

soundcloudUser
    .tracks({
        limit: 1000
    })
    .then(function(data) {
        console.log(data)
        work(data, function(details) {
            redo(details)
        })
    })


function work(details, callback) {

    var title = details[i].title.replace(/[^\w\s]/gi, '');


    mkdirp('./' + title, function(err) {
        fs.writeFileSync('./' + title + '/name_.txt', details[i].title);
        console.log('downloading :' + title, i);

        var art = details[i].artwork_url
        if (art === null) {
            art = details[i].user.avatar_url
        }
        art = art.replace('large', 't500x500')
        console.log(art)

        download(art).then(data => {

            fs.writeFileSync('./' + title + '/art.jpg', data);
            console.log(details[i].stream_url)
            download(details[i].stream_url + '?client_id='+client_id+'').then(data => {
                fs.writeFileSync('./' + title + '/track.mp3', data);
                console.log(details[i].waveform_url)
                download(details[i].waveform_url).then(data => {


                    fs.writeFileSync('./' + title + '/waveform.png', data);
                    if (details[i].downloadable == false) {
                        console.log('this track is undownloadable :' + title)
                        notdownloadable.push(title)

                        callback(details)
                    } else {
                        download2(details[i].download_url + '?client_id='+client_id+'', {
                            dest: './' + title + '/original'
                        }, function() {
                            callback(details)
                        })
                    }
                });


            });


        });


    });

};


function redo(details) {
    i++;
    if (i < details.length) {
        work(details, function(details) {
            redo(details)
        });
    } else {
        console.log(notdownloadable)
        return console.log('completed')

    }
}
