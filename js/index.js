const closeModalBox = ()=>{
  document.getElementById('modal-box-content').style.visibility="hidden"
  document.getElementById('modal-box-content').style.opacity=0
}

const hideShareAlert=()=>{
  document.getElementById("share-content").style.visibility="hidden"
  document.getElementById('share-content').style.opacity=0
}

const showModalBox = ()=>{
  document.getElementById('modal-box-content').style.visibility="visible"
  document.getElementById('modal-box-content').style.opacity=1
}

const showShareAlert=()=>{
  document.getElementById("share-content").style.visibility="visible"
  document.getElementById("share-content").style.opacity=1
}
fetch('data.json').then(response=> response.json()).then(data=>{
    document.querySelector('h1').innerText= data.appName;
    document.getElementById('legend').innerText=data.legend;
    document.querySelectorAll('#app-url').forEach(url => url.href=data.appUrl);
    document.querySelectorAll('#age-rating').forEach(item=> item.innerText=`${data.ageRating}+`);
    document.querySelectorAll('#category').forEach(category=> category.innerText=data.category.name);
    document.querySelectorAll('#developer').forEach(developer=> developer.innerHTML=data.developer.name);
    document.querySelectorAll('#developer-profile-link').forEach(link=> link.href= data.developer.url);
    data.featureMedia.map(media=> document.getElementById('image-slider').insertAdjacentHTML("beforeend", `<picture class="feature-image loading="lazy">
        <source src="${media.src_webp}" type="webp" >
        <img src="${media.src_png}" loading="lazy">
    </picture>`))

    document.getElementById('subscription-feature').innerText = data.inAppPurchase[0].name;
    document.getElementById('subscription-feature-description').innerText = data.inAppPurchase[0].description;
    document.querySelectorAll('#app-size').forEach(size=> size.innerText = data.size);
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

const share =document.getElementById('icon-share')
share.addEventListener('click', ()=>{
  const appUrl = 'https://apps.apple.com/us/app/id1506026858'
        if (navigator.share) {
          navigator.share({
            title: 'Hypee－photo, video transition‪s',
            url: appUrl
          }).then(() => {
          })
          .catch(console.error);
        } else {
          navigator.clipboard.writeText(appUrl)
          setTimeout(()=> {
            hideShareAlert()
          }, 2000)
          showShareAlert()
        }
})

const toggleAgeBtn = document.getElementById('btn-age-rating-details')
toggleAgeBtn.addEventListener('click', ()=>{
  toggleAgeBtn.style.display="none"
  document.querySelector('#age-details-row #age-rating').style.display="none"
  document.getElementById('content-age-details-open').style.display="flex"
})


// Versions
fetch('versions.json').then(response=> response.json()).then(data=>{
  document.getElementById('version').innerText=`Version ${data[0].version}`;
  document.getElementById('list-new-features').innerText=data[0].notes
  data.forEach(version=> document.getElementById('version-history-table').insertAdjacentHTML('beforeend', `<div class="version-row full-width">
    <div class="flex space-between align-center">
      <span>${version.version}</span>
      <span class="color-light">${version.date}</span>
    </div>
    <p class="version-history-list">${version.notes.replaceAll("\n", "<br/>")}</p>
  </div>`))
})

const versionHistoryBtn = document.getElementById('btn-view-version-history')
versionHistoryBtn.addEventListener('click', ()=>{
  showModalBox()
  document.getElementById('version-history-content').style.visibility="visible"
})

document.getElementById('close-version-history').addEventListener('click', ()=>{
  closeModalBox()
  document.getElementById('version-history-table').style.visibility="hidden"
})

