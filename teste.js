const p = new Promise((resolve, reject) => {
  let numero =  Math.random();
  if (numero > 0.5) resolve(numero+" Sim");
  reject(numero+" Não");
});
p
.then(res => {console.log(`${res} - da ação 1`); return res;})
.then(res => {console.log(`${res} - da ação 2`); return res;})
.then(res => {console.log(`${res} - da ação 3`); return res;})
.catch(rej => {console.error(`${rej} - da rejeição`)});
