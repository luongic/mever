/**
* Template Name: PhotoFolio - v1.0.0
* Template URL: https://bootstrapmade.com/photofolio-bootstrap-photography-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');

  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 1000);
      setTimeout(() => {
        preloader.remove();
      }, 2000);
    });
  }

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});


const projects = [
  {
      name: 'Order Pizza ',
      url: '/assets/img/orderpizza.png',
      link: 'https://pizzahutvn.netlify.app/',
      git: 'https://github.com/luongic/pizza'
  },
  {
      name: 'File manager ',
      url: '/assets/img/filemanager.png',
      link: 'https://github.com/luongic/FileExplorer-Using-Lucene',
      git: 'https://github.com/luongic/FileExplorer-Using-Lucene'
  },
  {
      name: 'Game 3D ',
      url: '/assets/img/homecoming.jpg',
      link: 'https://www.youtube.com/watch?v=Pan-ITOx_Gs',
      git: 'https://github.com/luongic/What-s-Next-Sample'
  },
  {
      name: 'Dummy Shopee ',
      url: '/assets/img/shopeeUI.png',
      link: 'https://shopeeredux.netlify.app/',
      git: 'https://github.com/luongic/shopeereact'
  },
  {
      name: 'Clone UI Instagram ',
      url: '/assets/img/instagramUI.png',
      link: 'https://luongic.github.io/instagramUI/',
      git: 'https://github.com/luongic/instagramUI'
  },
  {
      name: 'CSS Certificate',
      url: '/assets/img/certifycateCSSHackerrank.png',
      link: 'https://www.hackerrank.com/certificates/b41839f800cd',
      git: 'https://www.hackerrank.com/certificates/b41839f800cd'
  },
  {
      name: 'React (Basic) Certificate',
      url: '/assets/img/certifycateReactHackerrank.png',
      link: 'https://www.hackerrank.com/certificates/894129fd9b89',
      git: 'https://www.hackerrank.com/certificates/894129fd9b89'
  },
  {
      name: 'Mini Music Player ',
      url: '/assets/img/musicplayer.png',
      link: 'https://luongic.github.io/m2p/',
      git: 'https://github.com/luongic/m2p'
  },
  
]

const listPro = document.querySelector('.view3__content')


const render = function(){

  const htmls = projects.map(item => {
    return `<div class="col-xl-3 col-lg-4 col-md-6">
              <div class="gallery-item h-100">
                <img src=".${item.url}" class="img-fluid" alt="">
                <div class="gallery-links d-flex align-items-center justify-content-center">
                  <a href="${item.link}" target='_blank' title="Gallery 1" class="glightbox preview-link"><i class="bi bi-box-arrow-up-right"></i></a>
                  <a href="${item.git}" target='_blank' class="details-link"><i class="bi bi-github"></i></a>
                </div>
              </div>
          </div>`
  })
  
  listPro.innerHTML = htmls.join("")
  console.log(htmls);
}

render()

const navItem = document.querySelectorAll(".nav__item");


const changeNavActive = (index) => {
  navItem.forEach((item) => {
      item.classList.remove("active");
  });
  navItem[index].classList.add("active");

};

const navItemActiveOnScroll = (elementToScroll, index) => {
  if (
      elementToScroll.getBoundingClientRect().top <= 200 &&
      elementToScroll.getBoundingClientRect().top > 0
  ) {
      changeNavActive(index);
  }
};

window.onscroll = function () {
  if (
      document.querySelector("#hero").getBoundingClientRect().top < 0 &&
      document.querySelector("#hero").getBoundingClientRect().top > -500
  ) {
      changeNavActive(0);
  }

  navItemActiveOnScroll(document.querySelector("#about"), 1);
  navItemActiveOnScroll(document.querySelector("#projects"), 2);

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      changeNavActive(2);
  }

};