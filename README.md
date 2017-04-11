# backupmyshitfromsoundcloud
back up my shit from soundcloud

I payed for a soundcloud pro account for like 8 years, no way i pay again .

wrote this node js script to back up my shit 










```
$ git clone https://github.com/AZOPCORP/backupmyshitfromsoundcloud.git
```


```
$ cd backupmyshitfromsoundcloud
```

```
$ npm install
```

```
$ npm start
```

create a soundcloud api client_id 

http://soundcloud.com/you/apps/new


edit index.js and copy your client id
```javascript
var client_id ='client_id';//<---- soundcloud api client id
```



```javascript
var soundcloudUser = new SimpleSoundCloud.User('azop-corp');///<---resolve with user id from https://soundcloud.com/azop-corp
```
