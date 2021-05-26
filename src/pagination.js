async function getDogs(breed) {
    let response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/50`)
    let data = await response.json()
    let pagination = new dogPagination(data.message);
    pagination.init();
    }

function dogPagination(dogs) {

      const prevButton = document.getElementById('button_prev');
      const nextButton = document.getElementById('button_next');
      
      let current_page = 1;
      let records_per_page = 10;
      
      this.init = function() {
          changePage(1);
          pageNumbers();
          selectedPage();
          clickPage();
          addEventListeners();
     }
      
      let addEventListeners = function() {
          prevButton.addEventListener('click', prevPage);
          nextButton.addEventListener('click', nextPage);   
      }
            
      let selectedPage = function() {
          let page_number = document.getElementById('page_number').getElementsByClassName('clickPageNumber'); 
          for (let i = 0; i < page_number.length; i++) {
              if (i == current_page - 1) {
                  page_number[i].style.opacity = "1.0";
              } 
              else {
                  page_number[i].style.opacity = "0.5";
              }
          }   
      }  
      
      let checkButtonOpacity = function() {
        current_page == 1 ? prevButton.classList.add('opacity') : prevButton.classList.remove('opacity');
        current_page == numPages() ? nextButton.classList.add('opacity') : nextButton.classList.remove('opacity');
      }

      let changePage = function(page) {
          const dogGallery = document.getElementById('dogGallery');

          if (page < 1) {
              page = 1;
          } 
          if (page > (numPages() -1)) {
              page = numPages();
          }
       
          dogGallery.innerHTML = "";

          for(var i = (page -1) * records_per_page; i < (page * records_per_page) && i < dogs.length; i++) {
            dogGallery.innerHTML += `<div class='dogBlock'>
            
                <div><img src=${dogs[i]} class='dogpic-thumb' id='${dogs[i]}'><img></div>
                <div><img src=${dogs[i]} class='dogpic modal' id='${dogs[i]}-fullsize'><img></div>
                </div>`}
          
                const modalOpen = document.querySelectorAll('.dogpic-thumb')
                
                modalOpen.forEach(trigger => {
                    trigger.addEventListener('click', () => {
                    const popupModal = document.getElementById(`${trigger.id}-fullsize`)
                    popupModal.classList.add('visible')   
                    popupModal.addEventListener('click', () => {
                    popupModal.classList.remove('visible')
                })})})

        checkButtonOpacity();
        selectedPage()
      }

      let prevPage = function() {
          if(current_page > 1) {
              current_page--;
              changePage(current_page);
          }
      }

      let nextPage = function() {
          if(current_page < numPages()) {
              current_page++;
              changePage(current_page);
          } 
      }

      let clickPage = function() {
          document.addEventListener('click', function(e) {
              if(e.target.nodeName == "SPAN" && e.target.classList.contains("clickPageNumber")) {
                  current_page = e.target.textContent;
                  changePage(current_page);
              }
          });
      }

      let pageNumbers = function() {
          let pageNumber = document.getElementById('page_number');
              pageNumber.innerHTML = "";

          for(let i = 1; i < numPages() + 1; i++) {
              pageNumber.innerHTML += "<span class='clickPageNumber'>" + i + "</span>";
          }
      }

      let numPages = function() {
          return Math.ceil(dogs.length / records_per_page);  
      }
   }

 function dogChange(breed){
    getDogs(breed)
};
   
  getDogs("chihuahua")

