const fs=require('fs'),path=require('path');const root=path.join(__dirname,'..','site');
const txt=h=>h.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/&[a-z]+;/g,' ').replace(/\s+/g,' ').trim().toLowerCase();
const files=[];(function w(d){fs.readdirSync(d,{withFileTypes:true}).forEach(e=>{const f=path.join(d,e.name);e.isDirectory()?w(f):e.name.endsWith('.html')&&files.push(f)})})(root);
let H2=0,H2k=0,H3=0,H3k=0,pagesBad=0,firstP=0,noFirst=[];const worst=[];
for(const f of files){const h=fs.readFileSync(f,'utf8');const main=(h.match(/<main>([\s\S]*?)<\/main>/)||[])[1]||'';
 const get=n=>[...main.matchAll(new RegExp('<'+n+'[^>]*>([\\s\\S]*?)</'+n+'>','g'))].map(m=>txt(m[1]));
 const a=get('h2'),b=get('h3');const ka=a.filter(x=>x.includes('suscripción iptv')).length,kb=b.filter(x=>x.includes('suscripción iptv')).length;
 H2+=a.length;H2k+=ka;H3+=b.length;H3k+=kb;if(ka<a.length||kb<b.length){pagesBad++;worst.push([path.relative(root,f),a.length-ka,b.length-kb])}
 const p1=(main.match(/<p[^>]*>([\s\S]*?)<\/p>/)||[])[1]||'';
 const first3=txt(main).split(' ').slice(0,120).join(' ');if(first3.includes('suscripción iptv'))firstP++;else noFirst.push(f);}
console.log('páginas',files.length);console.log(`H2 con keyword: ${H2k}/${H2} (${(H2k/H2*100).toFixed(1)}%)`);console.log(`H3 con keyword: ${H3k}/${H3} (${(H3k/H3*100).toFixed(1)}%)`);
console.log('páginas con algún H2/H3 sin keyword:',pagesBad);console.log('keyword en las primeras 120 palabras:',firstP+'/'+files.length);
console.log(worst.slice(0,5));
