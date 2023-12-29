/**
 This Scrtpt file is developed by
Aditya Kameswara Rao Nandula
Senior Project Scientist,
Virtual Labs IIT Kharagpur.
LinkedIn: https://in.linkedin.com/in/akraonandula/
**/

import * as THREE from 'three' ;
import { STLLoader } from './threejs/jsm/loaders/STLLoader.js';
import {OrbitControls} from './threejs/jsm/controls/OrbitControls.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

//let adiwid=0, adihgt=0;


function adia3d(a){
    
    if(a==0){
        $("#dco").hide();
        $("#grph").hide();
    }
    else if(a==1){
        $("#dco").show();
    const mn=0.0001;
    const mx=100;
    var actme, ptubme;
    const sizs={
        wd:window.innerWidth*0.5,
        ht:window.innerHeight*0.5
    };
    let l=(sizs.wd / sizs.ht /1000).toFixed(4);
    let b=(sizs.wd / sizs.ht /1000).toFixed(4);
    let h=(sizs.wd / sizs.ht /1000).toFixed(4);
    window.addEventListener("resize",()=>{
        rndr.setSize(sizs.wd, sizs.ht, mn, mx);
        $("#adi3d").animate({
            width:sizs.wd,
            height:sizs.ht
        },1);
        window.location.reload();
    });
    const stldr = new STLLoader();
    const scn=new THREE.Scene();
    const lgt=new THREE.PointLight(0xffffff, mn, mx);
    lgt.position.set(20, 20, 20);
    const cam=new THREE.PerspectiveCamera(45, sizs.wd / sizs.ht, mn, mx);
    cam.position.set(0.45,0.5,2.3);
    scn.add(cam);            
    scn.add(lgt);
    
    const cnvs= document.querySelector("#adi3d");
    const rndr=new THREE.WebGLRenderer({canvas:cnvs});
    
    rndr.setSize(sizs.wd, sizs.ht, mn, mx);
    rndr.render(scn,cam);
    
    
    /* const axesHelper = new THREE.AxesHelper( 5 );
    scn.add( axesHelper ); */
    
    
    stldr.load( './images/cdcoset.stl', function ( act ) {
        const actma = new THREE.MeshMatcapMaterial( );
        actme = new THREE.Mesh( act, actma );
        scn.add( actme );
        actme.position.set( -sizs.wd / sizs.ht*0, -sizs.wd / sizs.ht*0.5, -sizs.wd / sizs.ht*0.0 );
        actme.rotation.set( -Math.PI/2*0, 0, 0 );
        actme.scale.set(l*50, b*50, h*50 );
        actme.castShadow = true;
        actme.receiveShadow = true;
    
    }, undefined, function ( error ) {
    
        //console.error( error );
    
    } );
    
    stldr.load( './images/ptub.stl', function ( act ) {
        const actma = new THREE.MeshMatcapMaterial( );
        ptubme = new THREE.Mesh( act, actma );
        scn.add( ptubme );
        ptubme.position.set( -sizs.wd / sizs.ht*0.018, -sizs.wd / sizs.ht*0.09, sizs.wd / sizs.ht*0.068 );
        ptubme.rotation.set( -Math.PI/2, 0, 0 );
        ptubme.scale.set(l*1, b*1, h*0.5 );
        ptubme.castShadow = true;
        ptubme.receiveShadow = true;
    
    }, undefined, function ( error ) {
    
        //console.error( error );
    
    } );
    
    const ctr = new OrbitControls(cam, cnvs);
    
    let i=0,j=0, k=sizs.wd / sizs.ht*0.0011, m=sizs.wd / sizs.ht*0.0019, adi=0;
    
    const loop = () => {
    
        rndr.render(scn,cam);
        window.requestAnimationFrame(loop);
        if(j<500){
            j=j+1;
            cam.position.set(0.45*500/j,0.5*500/j,2.3*500/j);
        }
     else{    
        
        if(i<= ((sizs.wd / sizs.ht)*0.18)){
            cam.position.set(0.45,0.5,2.3);
            ptubme.position.set( -sizs.wd / sizs.ht*0.018, -sizs.wd / sizs.ht*0.09-k, sizs.wd / sizs.ht*0.068 );
        
        k+=sizs.wd / sizs.ht*0.0011;
        m+=sizs.wd / sizs.ht*0.0009;
    
        i+=sizs.wd / sizs.ht*0.001455;
    
        rndr.render(scn,cam);
        console.clear();
        }
        else{
            if(adi==0){
                $("#grph").show();
                Aditya('./js/Results.csv');
                adi=1;
            }
    }}
            };
        
    
    loop();}
    };
    
    
function Aditya(fil){
    
        var ymax=0,xmax=0;
        Plotly.d3.csv(fil, function(dat){ 
            var t = [], y1 = [], y2 = [], y3 = [];
            for (var i=0; i<dat.length; i++) {
                let row = dat[i];
                t[i]=Number(row['x']);
                y1[i]=row['Theoretical Vx/Vt'];
                y2[i]=row['Experimental V_X/V_T'];
              }
            t.sort(function(a,b){return a-b;});
            y1.sort(function(a,b){return a-b;});
            y2.sort(function(a,b){return a-b;});
            xmax=Math.round(Number(t[t.length-1])+30);
            ymax=Math.round(Math.max(Number(y1[y1.length-1]),Number(y2[y2.length-1]),Number(y3[y3.length-1]))+30);
        });
    Plotly.d3.csv(fil, function(data){ 
        var t = [], y1 = [], y2 = [], y3 = [];
        for (var i=0; i<data.length; i++) {
           let  row = data[i];
            t[i]=Number(row['x']);
            y1[i]=row['Theoretical Vx/Vt'];
            y2[i]=row['Experimental V_X/V_T'];
          }
        var g1 = {
            x: t,
            y: y1,
            type: 'scatter',
            name: 'Theoretical'
            };
        var g2 = {
                x: t,
                y: y2,
                type: 'scatter',
                name: 'Experimental'
                };
        var data = [g1,g2];
        grp(data,xmax,ymax);
        
    });
    };
    
function grp(gda,xmax,ymax){
       let gr = document.getElementById('grph');
        var layout={title: 'Comparision of Theoretical and Experimental data',showlegend: true,
        legend: {
          x: 1,
          xanchor: 'right',
          y: 1
        },
        font: {
            family: 'Courier New, monospace',
            size: 15,
            color: 'black'
            },
        xaxis: {
            title:'x (mm)',
            showticklabels: true,
            autotick: true,
            showgrid: true,
            gridcolor: '#bdbdbd',
            gridwidth: 1,
            zerolinecolor: '#969696',
            zerolinewidth: 3,
            linecolor: '#636363',
            linewidth: 1,
            zeroline: true,
            showline: true,
            mirror: 'ticks',
            range: [
                0,
                xmax
              ] },
        yaxis: {
            title:'V<sub>x</sub>/V<sub>t</sub>',
            showticklabels: true,
            autotick: true,
            showgrid: true,
            gridcolor: '#bdbdbd',
            gridwidth: 1,
            zerolinecolor: '#969696',
            zerolinewidth: 3,
            linecolor: '#636363',
            linewidth: 1,
            zeroline: true,
            showline: true,
            mirror: 'ticks',
            range: [
                0,
                ymax
              ] }
        };
        Plotly.newPlot(gr, gda, layout);
    };
let x=0;
$(document).ready(()=>{
    if ( WebGL.isWebGLAvailable() ) {
        adia3d(0);
     
       
    } else {
    
        const warning = WebGL.getWebGLErrorMessage();
        document.getElementById( 'war' ).appendChild( warning );
    
    }
    window.adia3d = arg => {adia3d(arg);};
});