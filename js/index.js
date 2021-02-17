

fetch('data.json').then(response=> response.json()).then(data=>{
    document.getElementById('app-logo').src=data.appLogo;
    document.querySelector('h1').innerText= data.appName;
    document.getElementById('legend').innerText=data.legend;
    document.querySelectorAll('#age-rating').forEach(item=> item.innerText=`${data.ageRating}+`);
    document.querySelectorAll('#category').forEach(category=> category.innerText=data.category.name);
    document.querySelectorAll('#developer').forEach(developer=> developer.innerHTML=data.developer.name);
    data.description.features.forEach(feature=> document.getElementById('features-list').insertAdjacentHTML("beforeend", `<li> ${feature} </li>`));
    document.getElementById('description-cta').innerText = data.description.cta;
    document.getElementById('description').innerHTML = data.description.excerpt;
    document.getElementById('version').innerText=`Version ${data.version}`;
    document.getElementById('last-update').innerText=data.lastUpdate;
    data.newFeatures.forEach(newFeature=> document.getElementById('list-new-features').insertAdjacentHTML('beforeend', `<li>${newFeature}</li>`));
    document.getElementById('subscription-feature').innerText = data.inAppPurchase[0].name;
    document.getElementById('subscription-feature-description').innerText = data.inAppPurchase[0].description;
    document.getElementById('app-size').innerText = `${data.size} MB`;
    document.getElementById('langages').innerText = data.languages.join(", ");
    data.inAppPurchase.forEach(purchase => document.getElementById('in-app-purchase-list').insertAdjacentHTML('beforeend', `<li class="flex space-between"><span class="flex-1">${purchase.name}</span><span>${purchase.price.currency} ${purchase.price.value}</span> </li>`));

})

const loadMoreBtn = document.getElementById('btn-load-more')
loadMoreBtn.addEventListener('click', ()=>{
    document.querySelector('.description-div').style.maxHeight='unset'
    loadMoreBtn.style.display='none'
})
const toggleBtnPurchase = document.getElementById('btn-inapp-purchases-details')
toggleBtnPurchase.addEventListener('click', ()=>{
    console.log('click')
    document.querySelectorAll('.hide-on-click').forEach(btn=> btn.style.display='none')
    document.getElementById('in-app-purchase-list').style.height="auto"})

