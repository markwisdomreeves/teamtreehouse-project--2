/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/* this link of code here is to prevent a bug in my app and to stop it from running when when my
fellow developers move my javascript file from the buttom to the top of the page */
document.addEventListener('DOMContentLoaded', ()=> {

/* I am globally declaring all variables here to be used or accessible 
by every elements and functions on the page if needed */

// getting the page header class and storing it a header variable
let pageHeaderDiv = document.querySelector('.page-header');

// getting the student h2 text
let studentTitle = document.querySelector('h2');

// getting the student list Item
let studentsList = document.querySelectorAll('.student-list .student-item');

// geting the parent div of all the items as a first child of the page
let parentDiv = document.getElementsByClassName('page')[0];

// getting the link by it's tagname and storing it in a linkTag variable
let anchorsLinks = document.getElementsByTagName('a');

// number of items to be display on the page
let numberOfItemsPerPage = 10;

// stored the first page number to a variable
let showFirstPage = 1;


/* this function hide all the students except for the
ten students we want to show on the page */
function showPage(list, page) {
   let start_Index = (page * numberOfItemsPerPage) - numberOfItemsPerPage;
   let end_Index = page * numberOfItemsPerPage;
   console.log(end_Index);
   for (let i = 0; i < list.length; i++) {
      if(i >= start_Index && i < end_Index) {
         studentsList[i].style.display = '';
      } else {
         studentsList[i].style.display = 'none';
      }
   }
};
// this function create all elements and add pagination links  
const appendPageLinks = (singleListItem) => {
   let paginationButton = Math.ceil(singleListItem.length / numberOfItemsPerPage);
    // creating the and ul element
   let createNewDiv = document.createElement('div');
   createNewDiv.classList.add('pagination'); 
   let ul = document.createElement('ul');

   // looping through the pagination button
   for (let k = 0; k < paginationButton; k++) {
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.setAttribute('href', '#');
      a.textContent = k + 1;
      if (k == 0) {
         a.classList.add('active')
      }
      li.appendChild(a);
      ul.appendChild(li);
   }
   createNewDiv.appendChild(ul);
   parentDiv.appendChild(createNewDiv);
  
   // looping over each list item
   for (let i = 0; i < anchorsLinks.length; i++) {
      // addEventListener callback for the link element
      anchorsLinks[i].addEventListener('click', (e) => {
         //  storing the targeted button link to a variable
         let buttonLink = e.target.textContent;
         for (let i = 0; i < anchorsLinks.length; i++) {
            anchorsLinks[i].classList.remove('active');
         }
            e.target.classList.add('active');
            /* I am calling the showPage function and passing the 
             buttonLink to display the Pagination button */
           showPage(studentsList, buttonLink);

       });
   }
};


/* This code is for exceeds grade: the implementation of this code is to create a 
   searchable or filterable search form. and this search form will remove from the page 
   when javaScript is disabled and show when javascript is enabled it is ofter called
   (Progressive enhancement & unobtrusive JavaScript) */

   // Create new search bar
   let searchContainer = document.createElement('div');                                 
   searchContainer.classList.add('student-search');                                                         
   let searchInput = document.createElement('input');                                
   searchInput.placeholder = 'Search for students...';                                   
   searchContainer.appendChild(searchInput);                                                                     
   let searchButton = document.createElement('button');                             
   searchButton.textContent = 'Search';                                                                
   searchContainer.appendChild(searchButton);                                                                    
   pageHeaderDiv.insertBefore(searchContainer, studentTitle);                                                             
   // const search = document.querySelector('.student-search input');        
   
   // create message to display when no items found
   let parentDivItems = studentsList.parentNode;                                                         
   let h3 = document.createElement('h3');                           
   parentDiv.insertBefore(h3, parentDivItems);

   const search = document.querySelector('.student-search input');
   search.addEventListener('keyup', searchBar);
   console.log(search);

   function searchBar() {
      let inputValue = document.querySelector('input');
      let inputFilter = inputValue.value.toUpperCase();
      let ul = document.querySelector('.student-list');
      let li = ul.getElementsByTagName('.student-item');
      for (let i = 0; i < li.length; i++) {
         let h3 = li[i].getElementsByTagName('h3');
         let textValue = h3.textContent || h3.innerText;
         if (textValue.toUpperCase().indexOf(inputFilter) > -1) {
            li[i].style.display = '';
         } else {
            li[i].style.display = 'none';
         }
      }
   }

   // calling both functions here and passing studentsList and showing the first page respectively
     appendPageLinks(studentsList);
     showPage(studentsList, showFirstPage);

});