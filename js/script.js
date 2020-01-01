/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


   /* this line of code will prevent the app from working when other
   developers move the javascript file from the buttom to the top of the page */
   document.addEventListener('DOMContentLoaded', () => {

      /* I am globally declaring all variables here to be used
      by every elements and functions on the page if needed */

      // get all user names or titles
      let allStudentTitles = document.querySelectorAll('h3');

      // get the search form page header div
      let pageHeader = document.querySelector('.page .page-header');
      
      // get the student list Item
      let studentsList = document.querySelectorAll('.student-list .student-item');

      // get the parent div as a first child of the page
      let parentDiv = document.getElementsByClassName('page')[0];

      // get the link by it's tagname
      let anchorsLinks = document.getElementsByTagName('a');

      // this is the initial number of items to be displayed on the page
      let numberOfItemsPerPage = 10;

      // this is the first page number
      let showFirstPage = 1;


      /* this function show all students form 1 - 10 and hide the others */
      function showPage(list, page) {
         let start_Index = (page * numberOfItemsPerPage) - numberOfItemsPerPage;
         let end_Index = page * numberOfItemsPerPage;
         for (let i = 0; i < list.length; i++) {
            if(i >= start_Index && i < end_Index) {
               studentsList[i].style.display = '';
            } else {
               studentsList[i].style.display = 'none';
            }
         }
      };

      // this function create all elements and append them to the pagination links  
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
            // addEventListener callback that calls the link element
            anchorsLinks[i].addEventListener('click', (e) => {
               //  storing the targeted button link to a variable
               let buttonLink = e.target.textContent;
               for (let i = 0; i < anchorsLinks.length; i++) {
                  anchorsLinks[i].classList.remove('active');
               }
                  e.target.classList.add('active');
                  /* calling the showPage function here and passing in the 
                  students List and pagination items */
               showPage(studentsList, buttonLink);

            });
         }
      };

       // calling both functions here and passing studentsList and showing the first page respectively
       showPage(studentsList, showFirstPage);
       appendPageLinks(studentsList);


      /* This implementation is going for exceeds grade: This code
         will create a searchable or filterable search form using the DOM
         and it will remove from the page when javaScript is disabled in the browser
         but will show when javaScript is enabled.(Progressive enhancement & unobtrusive JavaScript)*/
         
         // Create search element for the search component
         let createParentDiv = document.createElement('div');                                   
         createParentDiv.classList.add('student-search');                                                         
         let searchInput = document.createElement('input');                                
         searchInput.placeholder = 'Search for students...';                                   
         createParentDiv.appendChild(searchInput);                                                                      
         let searchButton = document.createElement('button');                             
         searchButton.textContent = 'Search';                                                                
         createParentDiv.appendChild(searchButton); 
         let searchTitle = document.querySelector('h2');                                                                  
         pageHeader.insertBefore(createParentDiv, searchTitle);
         
         // build out message to display when no items found                                                      
         let pageDiv = document.querySelector('.page');
         let alertText = document.createElement('h1');
         alertText.classList.add('userError'); 
         alertText.textContent = `Sorry, your search request for did not match!`;
         pageDiv.appendChild(alertText);
         alertText.style.display = 'none';

        
         function searchInputValue(userInput, searchItems) {
            let searchListResults = [];
            let parentDivContainer = document.querySelector('.page');
            let paginationContainer = document.querySelector('.pagination');  
            for (let i = 0; i < searchItems.length; i++) {
               studentsList[i].style.display = 'none';
               let filterResults = studentsList[i].textContent;
               if (filterResults.toLowerCase().includes(userInput.value.toLowerCase())) {
                  studentsList[i].style.display = '';
                  searchListResults.push(studentsList[i]);     
               }
               // checking to see if the search List Result is empty or not
               if (searchListResults.length === 0) {
                  alertText.style.display = '';
               } else {
                  alertText.style.display = 'none';
               }
            }
            // removing the initial students list items from the page
            parentDivContainer.removeChild(paginationContainer);
            showPage(searchListResults, showFirstPage);
            appendPageLinks(searchListResults); 
         }

         /* this add event listener callback function will run when the user
         start searching for a user name in the search bar */
         createParentDiv.addEventListener('keyup', (event) => {
            let userError = event.target.value;
            alertText.textContent = `Sorry, your search request for the value ( ${userError} ) did not match any search!`;
            searchInputValue(searchInput, allStudentTitles)
      });
      

});