const loadAllProducts=async()=>{
    const res=await fetch('https://fakestoreapi.com/products');
    const data=await res.json();
    // console.log(data)

    return data;
}

const setAllMenu=async()=>{
     // console.log(loadAllProducts())
    // loadAllProducts()
    // .then(data => console.log(data))

    const data = await loadAllProducts();

    const menu=document.getElementById('all-menu');
    const uniqueArray=[];

    for(const product of data){
        // console.log(product.category);
        if(uniqueArray.indexOf(product.category) == -1){
            uniqueArray.push(product.category);
            const li=document.createElement('li');
            li.innerHTML=`<a>${product.category}</a>`;
            menu.appendChild(li);
        }
    }
}
setAllMenu();

const searchField=document.getElementById('search-field');
searchField.addEventListener('keypress',async(event)=>{
    if(event.key==='Enter'){
        // console.log(searchField.value);
        const searchValue=searchField.value;

        const allProducts=await loadAllProducts();
        const foundProducts=allProducts.filter(product=>product.category.includes(searchValue));
        // console.log(foundProducts);
        
        const productsContainer=document.getElementById('products-container');
        const notFound=document.getElementById('not-found');
        productsContainer.textContent='';
        notFound.textContent='';

        if(foundProducts.length===0){
            notFound.innerHTML=`<h2 class='text-4xl text-center text-red-500'>Not Found</h2>`;
            return;
        }

        foundProducts.forEach(product => {
            // console.log(product);
            const {id,image,title,price,description,rating,category}=product;
            const div=document.createElement('div');
            div.innerHTML=`
            <div class="card card-compact w-full bg-base-100 shadow-xl">
            <figure><img src=${image} class='h-40' alt="/" /></figure>
            <div class="card-body">
              <h2 class="card-title">${category}</h2>
              <p>${title.length<20?title:title.slice(0,35)+ '...'}</p>
              <div class="card-actions justify-end">
              <label onclick="showModal('${description}','${image}')" for="my-modal-3" class="btn btn-primary">Show Details</label>
              </div>
            </div>
          </div>
            `;
            productsContainer.appendChild(div);
        });
    }
})

const showModal=(description,image)=>{
    // console.log(description,image)
    const modalBody=document.getElementById('modal-body');
    modalBody.textContent='';
    modalBody.innerHTML=`
    <p class="py-4">${description}</p>
    <img src='${image}'/>
    `;
}