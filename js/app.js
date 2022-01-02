/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/


// Helper function for adding attributes to html elements
function attributeAdd(elem, attributes) {
    for (let i = 0; i < (Object.keys(attributes)).length; i++) {
        elem.setAttribute((Object.keys(attributes))[i], (Object.values(attributes))[i]);
    }
}

// Helper function for removing attributes from html elements
function attributeRemove(elem, attributes) {
    for (let i = 0; i < (Object.keys(attributes)).length; i++) {
        elem.removeAttribute((Object.keys(attributes))[i], (Object.values(attributes))[i]);
    }
}

// Main function for the page

document.addEventListener('DOMContentLoaded', function main() {

    const sections = document.querySelectorAll('section');
    const navbar = document.querySelector('.navbar__menu');
    /**
     * Builds the navigation bar
    */
    function navBuilder() {
        let fragment = document.createDocumentFragment();
        const navbar = document.querySelector('ul')
        //Iterates over the sections in the html
        for (let section of sections) {
            //Creates link and list items for the navigation bar
            let list = document.createElement('li');
            let link = document.createElement('a');
            /**Adds an href attribute to link using helper function, as well as
             * making the link navigate to the section using it's ID whenever it's clicked
             * (Smooth scrolling has been added through the CSS file)
             */
            attributeAdd(link, { 'href': `#` });
            //Sets the text in the list element to the section's data-nav attribute's value (i.e. Section 1, Section 2, ...etc)
            let text = document.createTextNode(section.getAttribute('data-nav'));
            //Appends the text to the previously created list element
            list.appendChild(text);
            //Adds the menu_link class for css editing
            attributeAdd(list, { 'class': 'menu__link', 'id': `link-${section.getAttribute('id')}`});
            //Appends the list element to the link element
            link.appendChild(list);
            //Appends the document fragment to the actual document
            fragment.appendChild(link);
        }
        navbar.appendChild(fragment);

    }
    //Runs the navBuilder function to build the navigation bar
    navBuilder();

    //Function for scrolling to clicked page sections on the navigation bar
    function scrollTo(evt) {
        //Gets the ID of the section we need to navigate to from the clicked link as a string
        let sectionId = evt.target.getAttribute('id').slice(5);
        let section = document.querySelector(`#${sectionId}`)
        section.scrollIntoView({ behavior: "smooth", block: "end" });
        evt.preventDefault();
    }
    //An event listener for the navigation bar
    navbar.addEventListener('click', scrollTo)
    
    //Sets the section as the active section if it's displayed on the main part of the screen
    document.addEventListener('scroll', function setActive() {
        const userHeight = window.innerHeight;
        //Iterates over the sections and checks if it's in the main part of the user's viewport
        for (let section of sections) {
            let location = section.getBoundingClientRect();
            // Sets the Section as the active section if the section covers more than 60% of the user screen height
            if (location.y <= 0.6 * userHeight) {
                attributeAdd(section, { 'class': 'your-active-class' });
            } // Removes the active class from section if the user scrolls down beyond the section
            if (location.y < - 0.38 * userHeight) {
                attributeRemove(section, { 'class': 'your-active-class' });
            } //Removes the active class from section if the user scrolls up past the current section
            if (location.y > 0.38 * userHeight) {
                attributeRemove(section, { 'class': 'your-active-class' });
            }
        }
    })
});
