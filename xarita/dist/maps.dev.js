"use strict";

window.addEventListener('DOMContentLoaded', function () {
  // links-wrapper start
  var linksWrapperAll = this.document.querySelectorAll('.links-wrapper');
  var linkWrapperAll = this.document.querySelectorAll('.link-wrapper');
  var changeIcon = this.document.querySelectorAll('.icon'); // links loop
  // for(let key = 0; key < linksWrapperAll.length; key++){
  //      linksWrapperAll[key].addEventListener('click',function(){
  //           this.classList.toggle('links-wrapper-active');
  //           changeIcon[key].classList.toggle('icon-active');
  //      })
  // };
  // berkit

  function hideLinksWrapper() {
    linksWrapperAll.forEach(function (child) {
      child.classList.remove('links-wrapper-active');
    });
    changeIcon.forEach(function (icon) {
      icon.classList.remove('icon-active');
    });
  }

  ; //och

  function showLinksWrapper(index) {
    linksWrapperAll[index].classList.add('links-wrapper-active');
    changeIcon[index].classList.add('icon-active');
  }

  ;
  linksWrapperAll.forEach(function (item, index) {
    item.addEventListener('click', function () {
      hideLinksWrapper();
      showLinksWrapper(index); // change children start ***************
      // berkit

      function hideChange() {
        Array.from(item.children[1].children).forEach(function (item) {
          item.classList.remove('change-active');
        });
      }

      ; // och

      function showChange(i) {
        item.children[1].children[i].classList.add('change-active');
      }

      ;
      Array.from(item.children[1].children).forEach(function (chil, i) {
        chil.addEventListener('click', function () {
          hideChange();
          showChange(i);
        });
      }); // change children end **************
    });
  }); // links-wrapper end
});
window.addEventListener('load', function () {
  this.document.querySelector('.loaded-content').style.display = 'flex';
});