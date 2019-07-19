// document.addEventListener('DOMContentLoaded', () => {
//   console.log('IronGenerator JS imported successfully!');
// }, false);

// // AXIOS WINDOW X
// document.getElementById('custom-btn').onclick = ()=>{
//   let list = document.getElementById('list-of-custom')
//   console.log(list)
  
//   axios.get('mongodb://localhost/week6---coder-maintenance')
//   .then((response)=>{
//       list.innerHTML = "";
      
//       response.data.forEach((eachOne)=>{
//          let newCard = document.createElement('div');
//          newCard.innerHTML = `
//           <div class="smr-card">
//             <img src="${eachOne.image}">
//             <p class="card-title"> ${eachOne.title} </p>
//             <p class="directions"> ${eachOne.description} </p>
//             <p> ---------------------------- </p> 
//           </div>
//           `
//          list.appendChild(newCard); 
//       })
//   })
//   .catch((err)=>{
//       console.log(err);
//   })
// }

// document.getElementById('add-new-btn').onclick = ()=>{
//   let image = document.getElementById('new-image');
//   let title = document.getElementById('new-title');
//   let description = document.getElementById('new-description');

//   axios.post('/profile', {
//       image: image.value,
//       title: title.value,
//       description: description.value,
//   })
//   .then(()=>{
//       console.log('yay')
//       image.value = "";
//       title.value = "";
//       description.value = "";
//   })
//   .catch((err)=>{
//       console.log(err);
//   })
// }