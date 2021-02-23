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

const starSVG = '<svg aria-hidden="true" width="10px" height="10px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>'
fetch('data.json').then(response=> response.json()).then(data=>{
    document.querySelector('h1').innerText= data.appName;
    document.getElementById('legend').innerText=data.legend;
    document.querySelectorAll('#app-url').forEach(url => url.href=data.appUrl);
    document.querySelectorAll('#age-rating').forEach(item=> item.innerText=`${data.ageRating}+`);
    document.querySelectorAll('#app-rating').forEach(rating=> rating.innerText=data.rating.score);
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

const renderStars = number =>{
  let rating = 0
  let stars = ``
  while (rating !== number){
    stars = stars + `<svg aria-hidden="true" class="star-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>`
    rating++
  }
  console.log(stars)
  return stars

}
const renderContent = (userReview, developerResponse)=>{
  if(developerResponse){
   return ` <p class="user-review-content with-developer-response">${userReview}</p>
   <p class="font-bold">Developer Response</p>
   <p class="developer-response">${developerResponse.body}</p>
   </div>`
   } else{
     return `<p class="user-review-content no-developer-response">${userReview}</p>`
   }
}

fetch('reviews.json').then(response=> response.json()).then(data=>{
  data.slice(0,4).forEach(review=> document.getElementById('review-slider').insertAdjacentHTML('beforeend', `
<div class="app-reviews-card">
<div class="flex space-between align-center">
    <p class="font-bold">${review.attributes.title}</p>
    <p class="color-light">${review.attributes.date}</p>
</div>
<div class="flex space-between align-center">
    <p class="user-review-rating"> 
    ${renderStars(review.attributes.rating)}
    </p>
    <p class="color-light">${review.attributes.userName}</p>
</div>
${renderContent(review.attributes.review, review.attributes.developerResponse)}`))})

