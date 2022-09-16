// import fetch from 'isomorphic-unfetch'

// const fetchPromise =window.fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

// console.log(fetchPromise);

// fetchPromise.then((response) => {
//     console.log(`Received response: ${response.status}`);
// });

// console.log("Started request…");

const coins = [
    { _id: { byName: 'INSIDE DIAMETER', bySatus: 0 }, count: 45 },
    { _id: { byName: 'INSIDE DIAMETER', bySatus: 1 }, count: 1 },
    { _id: { byName: '', bySatus: -3 }, count: 3 },
    { _id: { byName: 'INSIDE DIAMETER', bySatus: -1 }, count: 44 },
    { _id: { byName: 'ROW', bySatus: 0 }, count: 61 },
    { _id: { byName: 'CAGE MATERIAL', bySatus: 2 }, count: 5 },
    { _id: { byName: 'OUTSIDE DIAMETER', bySatus: 0 }, count: 48 },
    { _id: { byName: 'TYPE', bySatus: 0 }, count: 45 },
    { _id: { byName: 'TYPE', bySatus: 2 }, count: 45 },
    { _id: { byName: 'ROW', bySatus: 2 }, count: 29 },
    { _id: { byName: 'OUTSIDE DIAMETER', bySatus: 1 }, count: 2 },
    { _id: { byName: 'SERIES', bySatus: 0 }, count: 80 },
    { _id: { byName: 'STYLE', bySatus: 0 }, count: 62 },
    { _id: { byName: 'RADIAL CLEARANCE', bySatus: 0 }, count: 74 },
    { _id: { byName: 'SERIES', bySatus: 2 }, count: 10 },
    { _id: { byName: 'WIDTH', bySatus: 1 }, count: 3 },
    { _id: { byName: 'CAGE MATERIAL', bySatus: 0 }, count: 85 },
    { _id: { byName: 'WIDTH', bySatus: 0 }, count: 52 },
    { _id: { byName: 'RADIAL CLEARANCE', bySatus: 1 }, count: 16 },
    { _id: { byName: 'OUTSIDE DIAMETER', bySatus: -1 }, count: 40 },
    { _id: { byName: 'STYLE', bySatus: 2 }, count: 28 },
    { _id: { byName: 'WIDTH', bySatus: -1 }, count: 35 },]


const generateAttObjs=(arr)=>arr.reduce((a,c)=>{
    const { _id: { byName:attName,bySatus:attStatus }, count }=c
    // console.log(attName,attStatus, count)
    if(attName){

        if(!a[attName]){
            a[attName]={total:0,status:{}}
        }
        if(!a[attName].status[attStatus]){
            a[attName].status[attStatus]=0 
        }
        a[attName].total+=count
        a[attName].status[attStatus] += count 
    }
    return a
},{})



console.log(generateAttObjs(coins).reduce((a,c)=>a+c.total,0))