(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function o(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(s){if(s.ep)return;s.ep=!0;const a=o(s);fetch(s.href,a)}})();const u=(e,t)=>{const o=document.createElement("span");return o.classList.add(t),o.innerText=e,o},f=e=>u(e,"string"),w=e=>u(e,"key"),p=e=>u(e,"array-key"),y=u("[","orange"),O=u("]","orange"),B=u(": ","orange");u("","tab");const N=u(`
`,"break");u("null","string");const E=document.createElement("div");E.className="tab-img";const x=()=>{let e={partialValue:[""],isAfterColon:!1,isInsideUnicode:!1,isInsideEscape:!1,isInsideString:!1,isInsideNumber:!1,isInsideBooleanOrNull:!1,accumulatedUnicode:"",accumulatedString:"",accumulatedNumber:"",accumulatedBooleanOrNull:"",scopes:[]},t=document.createDocumentFragment();const o=document.getElementById("output");function l(){const i=document.createElement("div");i.className="line",i.appendChild(t),t=document.createDocumentFragment();const c=a(e.scopes)*20;return i.style.gridTemplateColumns=`${c}px auto`,o.appendChild(i),i}function s(i){const c=i.cloneNode(!0);t.appendChild(c)}function a(i){var d;const r=((d=i[0])==null?void 0:d.type)==="object"?1:0;return i.length-r}return(i,c)=>{var d,g,h;let r=0;for(;r<i.length;){let n=i[r];if(e.isInsideEscape){n==="\\"||n==='"'?(e.isInsideEscape=!1,e.accumulatedString+=n):n==="u"?(e.isInsideEscape=!1,e.isInsideUnicode=!0,e.accumulatedUnicode=""):(e.isInsideEscape=!1,e.accumulatedString+="\\"+n),r++;continue}if(e.isInsideUnicode){const m=n.charCodeAt(0);if(m>=48&&m<=57||m>=65&&m<=70||m>=97&&m<=102){e.accumulatedUnicode+=n,e.accumulatedUnicode.length===4&&(e.isInsideUnicode=!1,e.accumulatedString+=String.fromCharCode(parseInt(e.accumulatedUnicode,16))),r++;continue}else e.isInsideUnicode=!1,e.accumulatedString+="\\u"+e.accumulatedUnicode}n==="{"?(e.isInsideString||(e.isAfterColon=!1,((d=e.scopes.at(-1))==null?void 0:d.type)==="array"&&t.appendChild(p(e.scopes.at(-1).index+": ")),l()),e.scopes.push({type:"object",index:0})):n==="["?(e.isInsideString||(e.scopes.length===0?s(y):((g=e.scopes.at(-1))==null?void 0:g.type)==="object"?(s(y),s(N)):((h=e.scopes.at(-1))==null?void 0:h.type)==="array"&&(t.appendChild(p(e.scopes.at(-1).index+": ")),s(y),s(N)),l()),e.scopes.push({type:"array",index:0})):n==="}"?e.scopes.pop():n==="]"?e.isInsideString?e.scopes.pop():(e.isInsideBooleanOrNull&&(t.appendChild(p(e.scopes.at(-1).index+": ")),t.appendChild(f(e.accumulatedBooleanOrNull)),e.accumulatedBooleanOrNull="",e.isInsideBooleanOrNull=!1),e.isInsideNumber&&(t.appendChild(p(e.scopes.at(-1).index+": ")),t.appendChild(f(e.accumulatedNumber)),e.accumulatedNumber="",e.isInsideNumber=!1),l(),s(O),e.scopes.pop(),l()):n==="\\"?e.isInsideEscape=!0:n===":"?(e.isAfterColon=!0,e.isInsideString||s(B)):n===","?e.isInsideString?e.accumulatedString+=n:(e.isAfterColon=!1,e.isInsideNumber&&(e.scopes.at(-1).type==="array"?(t.appendChild(p(e.scopes.at(-1).index+": ")),t.appendChild(f(e.accumulatedNumber))):e.scopes.at(-1).type==="object"&&t.appendChild(f(e.accumulatedNumber)),e.accumulatedNumber="",e.isInsideNumber=!1),e.isInsideBooleanOrNull&&(e.scopes.at(-1).type==="array"&&t.appendChild(p(e.scopes.at(-1).index+": ")),t.appendChild(f(e.accumulatedBooleanOrNull)),e.accumulatedBooleanOrNull="",e.isInsideBooleanOrNull=!1),e.scopes.at(-1).type==="array"&&e.scopes.at(-1).index++,l()):n==='"'?(e.isInsideString=!e.isInsideString,e.isInsideString?e.accumulatedString="":e.isInsideString||(e.scopes.at(-1).type==="object"&&(e.isAfterColon?t.appendChild(f('"'+e.accumulatedString+'"')):t.appendChild(w(e.accumulatedString))),e.scopes.at(-1).type==="array"&&(t.appendChild(p(e.scopes.at(-1).index+": ")),t.appendChild(f('"'+e.accumulatedString+'"'))),e.accumulatedString="")):n===" "||n===`
`||n==="\r"||n==="	"?e.isInsideString&&(e.accumulatedString+=n):e.isInsideString?e.accumulatedString+=n:!isNaN(Number(n))||n==="-"||n==="."||n==="+"||n==="e"||n==="E"?!e.isInsideString&&!e.isInsideBooleanOrNull?(e.isInsideNumber=!0,e.accumulatedNumber+=n):e.isInsideBooleanOrNull&&(e.accumulatedBooleanOrNull+=n):!e.isInsideNumber&&!e.isInsideString&&(e.isInsideBooleanOrNull=!0,e.accumulatedBooleanOrNull+=n),r++}c&&l()}};function v(e,{willAlert:t=!1}){const o=performance.now();return{finish:()=>{const l=performance.now()-o;console.log(`${e}: ${l}ms`)}}}function T(e){requestAnimationFrame(()=>{const t=new MessageChannel;t.port1.onmessage=e,t.port2.postMessage(void 0)})}let b;var I;const A=(e,t)=>{I||(I=!0,setTimeout(()=>{e(),I=!1},t))},S=e=>{let t=document.body.offsetHeight*.1<500?document.body.offsetHeight*.1:500;A(()=>{window.innerHeight+window.scrollY>=document.body.offsetHeight-t&&(console.log("end of page"),e())},300)},L=new Image;L.src="./tae.gif";const C=new Worker(new URL(""+new URL("worker-167ce7ae.js",import.meta.url).href,self.location),{type:"module"});document.addEventListener("DOMContentLoaded",function(){let e=document.getElementById("arquivo"),t=document.getElementById("index");e.addEventListener("click",s=>t.remove()),e.addEventListener("change",function(s){b=v("paint first chunks",{willAlert:!1});let a=s.target.files[0];document.getElementById("filename").innerText=a.name,l(a)});async function o(s,a,i=3e3){const{done:c,value:r}=await s.read(new Uint8Array(i)),d=new TextDecoder().decode(r);return a(d,c),c}const l=async s=>{const a=s.stream();let i=!1;const c=await a.getReader({mode:"byob"}),r=x();console.log("começou nova chunk");const{done:d,value:g}=await c.read(new Uint8Array(500)),h=new TextDecoder().decode(g);r(h,d),S(()=>{o(c,r,500)}),window.addEventListener("scroll",()=>S(async()=>{i||(i=await o(c,r))})),T(async()=>{b.finish(),C.postMessage(s),C.onmessage=function(n){n.data===!1&&(alert("Arquivo inválido"),window.location.reload())}})}});
