const w=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}};w();const d=document.querySelector("video"),f=document.querySelectorAll("canvas")[0],m=f.getContext("2d"),u=document.querySelectorAll("canvas")[1],v=document.getElementById("ascii"),x=640,A=480,i=128,l=96;f.width=i;f.height=l;u.width=i;u.height=l;u.style.width=x+"px";u.style.height=A+"px";const c=new Array(l);for(let n=0;n<c.length;n++)c[n]=new Array(i).fill("*");const g=" .:-=+*#%@";async function b(){const n=await navigator.mediaDevices.getUserMedia({video:{}});d.srcObject=n,d.onloadedmetadata=function(){d.play(),window.requestAnimationFrame(async function o(){m.drawImage(d,0,0,i,l);const s=m.getImageData(0,0,i,l);for(let r=0;r<c.length;r++)for(let e=0;e<c[r].length;e++){const t=s.data[4*e+r*i*4+0],a=s.data[4*e+r*i*4+1],y=s.data[4*e+r*i*4+2],h=.2126*t+.7152*a+.0722*y,p=Math.floor(h*g.length/255);c[r][e]=g[p]}q(),window.requestAnimationFrame(o)})}}function q(){let n="";for(let o=0;o<c.length;o++){for(let s=0;s<c[o].length;s++)n+=c[o][s];n+=`
`}v.innerText=n}b();
