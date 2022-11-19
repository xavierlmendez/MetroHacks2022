import fetch from 'node-fetch';

fetch('http://127.0.0.1:3000/responce')
.then(async(res) => await res.json())
.then((data) => {console.log(data)});