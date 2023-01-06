

function click_filter_element( event) {

  /*
    ARGUMENTS
      event: event-object created when user clicks on one of the filter elements.

    SIDE-EFFECTS
      Marks the clicked filter element as selected / unselected.
      Since a filter element will have changed after the click, the list of
      programmes must be updated.

      Attention VG
        Careful with the propagation of the click-event

    NO RETURN VALUE

  */
  event.stopPropagation()
  event.target.classList.toggle( "selected");
  update_programmes();
}

function create_filter_element( data) {

  /*
    ARGUMENTS
      data: object that contains the following keys:
        class (string): a class-name given to the created element
        textContent (string): the text that the element contains
        parent (reference to HTML-element): the HTML-element that is the parent of the created element

      No control of arguments.

    SIDE-EFFECTS
      Creates a new dom-element with the tag "li".
      Gives the new dom-element the class contained in data.class
      Appends the new dom-element to the element referenced in data.parent
      Sets the text content of the new dom-element to data.textContent
      Sets the function click_filter_element as a listener to "click" for the new dom-element

    RETURN VALUE
      Returns a reference to the new dom-element
  */

  const klass = data.class;
  const textContent = data.textContent;
  const parent = data.parent
  
  const newDomElement = document.createElement( "li");
  newDomElement.classList.add( klass);
  parent.append( newDomElement);
  newDomElement.textContent = textContent;
  
  newDomElement.addEventListener( "click", click_filter_element);
  
  return newDomElement;
}

function add_group_toggling( filter_container_dom) {

  /*
    ARGUMENT
      filter_container_dom: reference to a HTML-element that contains a set of fliter_elements
            Exempel: the <ul> that contains the filters for Language.

    SIDE EFFECTS
      The function makes sure that when the user clicks on filter_container_dom, all the
      filter_elements that it contains are selected / unselected.
      Since some filter elements will have changed after the click, the list of
      programmes must be updated.

    NO RETURN VALUE

  */
  filter_container_dom.addEventListener( "click", toggle_filter_container);
  let ruling_element_selector = filter_container_dom.querySelector( "ul > li");
  let all_filter_container_elements = filter_container_dom.querySelectorAll( "ul > li");

  function toggle_filter_container( event) {
    if( ruling_element_selector.className === "selected") {
      for( let i = 0; i < all_filter_container_elements.length; i++) {
        all_filter_container_elements[ i].classList.remove( "selected");
      }
    } else {
       for( let i = 0; i < all_filter_container_elements.length; i++) {
         all_filter_container_elements[ i].classList.add( "selected");
       }
    }

    update_programmes();
  }
  
}

function toggle_cities( event) {

  /*

    ARGUMENTS
      This function does not take any arguments

    SIDE EFFECTS
      This function checks the state of the first city-filter-element (Madrid).
      If it is selected then it de-selects ALL city-filter-elements
      If it is de-selected then it selects ALL city-filter-elements 

    NO RETURN VALUE

  */
  let madrid_filter_element = document.querySelector( "#country_0 > ul > li")
  let all_city_filter_elements = document.querySelectorAll( "#country_filter > ul > div > .filter_list > li");
 
  if( madrid_filter_element.className === "selected") {
    for( let i = 0; i < all_city_filter_elements.length; i++) {
      all_city_filter_elements[ i].classList.remove( "selected");
    }
    } else {
      for( let i = 0; i < all_city_filter_elements.length; i++) {
      all_city_filter_elements[ i].classList.add( "selected");
    }
}

update_programmes();

}

function create_countries_cities_filters( ) {
   // create_countries_cities_filters
  /*    ARGUMENT: "no controls are made of the aruments"
          The functions does not recieve any arguments.
 
        SIDE-EFFECTS:
          the function initiates array_each with COUNTRIES from data, the callback for each iteration/array[index] is create_country
 
        RETURN-VALUE:
          none
  */
  // create_country
  /*    ARGUMENT: "no controls are made of the aruments"
          country( object): One of the objects from COUNTRIES.
       
        SIDE-EFFECTS:
          the function creates a HTML-element inside "#country_filter > ul", the element contains the name of the country and a li of cities which exists in the country. The element is assigned the id based on the country.id.
  */
  // create_city
  /*    ARGUMENT: "no controls are made of the aruments"
          city( array): one of the citys from cities (local).
 
        SIDE-EFFECTS:
          the functuon creates a new filter-element through create_filter_element and the keys parent, class, textContent. the Element is given a new id based on its city.id
 
        RETURN-VALUE:
          none
  */
  
  function create_country( country) {
    const dom = document.createElement( "div");
    dom.classList.add( "country");
    dom.classList.add( "filter_container");
    dom.id = "country_" + country.id;
    document.querySelector( "#country_filter > ul").append( dom);
    
    dom.innerHTML = `
      <h1>${country.name}</h1>
      <ul class="filter_list"></ul>
    `;
    
    const cities = array_filter( CITIES, test_function);
    function test_function( city) {
      return city.countryID === country.id;
    }

    array_each( cities, create_city);
  }
  function create_city( city) {

    const dom = create_filter_element( {
      parent: document.querySelector( `#country_${city.countryID} > ul`),
      class: "selected",
      textContent: city.name,
    });
    dom.dataset.id = city.id;

  }

  array_each( COUNTRIES, create_country);
}


function create_levels_filter( ) {
  function create_level (level) {
    const dom = create_filter_element({
      parent: document.querySelector("#level_filter > ul"),
      class: "selected",
      textContent: level.name,
    });
    dom.dataset.id = level.id;
  }
  array_each(LEVELS, create_level);
}
function create_subjects_filter( ) {
  function create_subject (subject) {
    const dom = create_filter_element({
      parent: document.querySelector("#subject_filter > ul"),
      class: "selected",
      textContent: subject.name,
    });
    dom.dataset.id = subject.id;
  }
  array_each(SUBJECTS, create_subject);
}
function create_language_filter( ) {
  function create_element (data) {
    const dom = create_filter_element({
      parent: document.querySelector("#language_filter > ul"),
      class: "selected",
      textContent: data.name,
    });
    dom.dataset.id = data.id;
  }
  array_each(LANGUAGES, create_element);
}

// create_modular_filter
/*    ARGUMENT: "no controls are made of the aruments"
        the function recieves TWO arguments, (DATABASE) --> one array from database.js (target) --> string of the targeted filter_element

      SIDE-EFFECTS:
        the function initiates array_each with the parameter DATABASE and the the callback for each iteration/array[index] is create_modular_filters
 
      RETURN-VALUE:
        none
*/
// modular_filter_element
/*    ARGUMENT: "no controls are made of the arguments"
        the function recieves a object from each iteration of the array_each initiated in create_modular_filter.

      SIDE-EFFECTS:
        the function creates a new DOM-element through the function create_filter_element({ OBJECT }) the object keys are parent --> uses the parameter "target" to find the right #"element"_filter, class --> "string with the class", textContent --> the iterations objects key = name

      RETURN-VALUE:
        none
*/
function create_modular_filter( DATABASE, target) {
  function modular_filter_element( object) {
    const dom = create_filter_element({
      parent: document.querySelector(`#${target}_filter > ul`),
      class: "selected",
      textContent: object.name,
    });
    dom.dataset.id = object.id;
  }
  array_each( DATABASE, modular_filter_element);
}

function create_programme( programme) {
  
  let programmeUlReference = document.querySelector( "#programmes > ul");
  let universityDOM = document.createElement( "div");
  universityDOM.classList.add( "programme");
  programmeUlReference.append( universityDOM);

  const university = programme.universityID;
  
  let city_id = UNIVERSITIES[ university].cityID;
  const city = CITIES[ city_id].name;

  let country_id = CITIES[ city_id].countryID;
  const country = COUNTRIES[ country_id].name;

  const language = programme.languageID;
  const level = programme.levelID - 1;
  const subject = programme.subjectID; 

  universityDOM.innerHTML = `
    <div>
      <div><strong>${ programme.name}</strong></div>
      <div>${ UNIVERSITIES[ university].name}</div>
      <div>${ city}, ${ country}</div> 
      <div>${ LEVELS[ level].name}, ${ SUBJECTS[ subject].name}, ${ LANGUAGES[ language].name}</div>
    </div>
  `

  let more_information = document.createElement( "div");
  more_information.classList.add( "more_info");
  universityDOM.appendChild( more_information);

  more_information.addEventListener( "click", show_more_programmes);
  function show_more_programmes( event) {
    more_information.style.display = "none";
    bottom_information.remove( );
    universityDOM.classList.toggle( "show_more");

    let more_info_container = document.createElement( "div");
    more_info_container.classList.add( "more_info");
    universityDOM.appendChild( more_info_container);

    more_info_container.innerHTML = `
    <div>Average entry grade: ${array_average( programme.entryGrades)}</div>
    <div>Success rate: ${array_average( programme.successRate)}%</div>
    <div>Exchange ratio: ${programme.exchangeStudents}/${programme.localStudents}</div>
    `
    universityDOM.appendChild( bottom_information);

    more_info_container.addEventListener( "click", remove_more_info);
    function remove_more_info( event) {
      more_info_container.remove( );
      more_information.style.display = "block";
      universityDOM.classList.toggle( "show_more");
    }
  }

  let bottom_information = document.createElement( "div");
  bottom_information.textContent = (`${ city}, sun-index: ${ CITIES[ city_id].sun} (${ percenter( CITIES[ city_id].sun, 365)})%`);
  bottom_information.classList.add( "bottom_programme");
  universityDOM.appendChild( bottom_information);

  let city_images_array = CITIES[ city_id].imagesNormal;
  let city_image = array_random_element( city_images_array);
  let programme_div = document.querySelector( "#programmes > ul > div:last-child");
  programme_div.style.backgroundImage = `url('media/geo_images/${ city_image}')`; 
  

}

function update_programmes( ) {

  const parent = document.querySelector( "#programmes > ul");
  parent.innerHTML = ``;
  
  let array = [];
  array = read_filters();
  array_each( array, create_programme);

  if( array.length !== 0) {
    document.querySelector( "#programmes > p").style.display = "none";
  } else {
    document.querySelector( "#programmes > p").style.display = "inline";
  }
    
  for( let i = 1; i <= 3; i++) {
    let top_images_container = document.querySelector( `#top_images > div:nth-child(${ i})`);
    
    let top_image_first_array = CITIES[ get_random_number( 32)].imagesNormal;
    let top_image_first = array_random_element( top_image_first_array); 
    
    top_images_container.style.backgroundImage = `url('media/geo_images/${top_image_first}')`;
  }
}

function read_filters( ) {

  // read_filters 
  /*  ARGUMENT: "no controls are made of the aruments"
        the function does not recieve any arguments.

      SIDE-EFFECTS:
        the function checks all "filter_elements" and sorts those with class ".selected" in a new array. The function compares in many steps to determine which programmes are supposed to be viewed on the "programme section". 
        
           HOW IT WORKS:
            step 1 --> the function saves all selected cities, these are each looped through array_each and the callback uses parseInt to convert the dataset.id to a usable value. These are saved in an array.

            step 2 --> the function loops through each of the city Id's for each iteration/Id-index the function compares all the UNIVERSETIES cityID's if if the id's macth the university gets pushed into a new array.

            step 3 --> the new array of universitys are looped though using array_each, the callback function compares all universitys id's to all PROGRAMMES id's. if the id's match the programme gets pushed into a new array.

            step 4 --> the function saves all selected levels, these are each looped through array_each and the callback uses parseInt to convert the dataset id to a usable value. these are saved in an array.

            step 5 --> the function filters the newly created array of ".selected" programmes using array_filter, if the programmes levelID is the same as one of the ".selected" levels ids they are returned and pushed into the filtered array, if not they are "filtered out" by not being returned.
            
            step 6 --> the function saves all selected languages, these are each looped through array_each and the callback uses parseInt to convert the dataset id to a usable value. these are saved in an array.

            step 7 -->  the function filters the newly created array of ".selected" programmes using array_filter, if the programmes languageID is the same as one of the ".selected" languages ids they are returned and pushed into the filtered array, if not they are "filtered out" by not being returned.

            step 8 --> the function saves all selected subjects, these are each looped through array_each and the callback uses parseInt to convert the dataset id to a usable value. these are saved in an array.

            step 9 --> the function filters the newly created array of ".selected" programmes using array_filter, if the programmes subjectID is the same as one of the ".selected" subjects ids they are returned and pushed into the filtered array, if not they are "filtered out" by not being returned.

            step 10 --> the function checks whats written inn the search field, if the field contains an empty string the function dosent enter the test function, if it contains a string the function filters the newly created array of ".selected" programmes using array_filter, if the programmes name is the same as the string from the search field they are returned and pushed into the filtered array, if not they are "filtered out" by not being returned.
          
      RETURN-VALUE:
        the function returns the filtered programmes
  */
  
  const city_selected_dom = document.querySelectorAll( "#country_filter li.selected");

  const city_id_selected = [];
  function callback_add_cityID( dom_element) {
    
    const id_as_integer = parseInt( dom_element.dataset.id);
    city_id_selected.push(id_as_integer);
  }
  array_each(city_selected_dom, callback_add_cityID);


  const universities = [];
  for (let i = 0; i < city_id_selected.length; i++) {
    const city_id = city_id_selected[i];
    for (let ii = 0; ii < UNIVERSITIES.length; ii++) {
      const university = UNIVERSITIES[ii];
      if (university.cityID === city_id) {
        universities.push(university);
      }
    }
  }

  let programmes = [];
  function callback_add_programmes (university) {
    const university_id = university.id;
    for (let i = 0; i < PROGRAMMES.length; i++) {
      const programme = PROGRAMMES[i];
      if (programme.universityID === university_id) {
        programmes.push(programme);
      }
    }
  }
  array_each(universities, callback_add_programmes);



  const level_selected_dom = document.querySelectorAll("#level_filter li.selected");
  const level_id_selected = [];
  function callback_add_levelID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    level_id_selected.push(id_as_integer);
  }
  array_each(level_selected_dom, callback_add_levelID);

  function test_function_level (programme) {
    return level_id_selected.includes(programme.levelID);
  }
  programmes = array_filter(programmes, test_function_level);



  const language_selected_dom = document.querySelectorAll("#language_filter li.selected");
  const language_id_selected = [];
  function callback_add_languageID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    language_id_selected.push(id_as_integer);
  }
  array_each(language_selected_dom, callback_add_languageID);



  function test_function_language (programme) {
    return language_id_selected.includes(programme.languageID);
  }
  programmes = array_filter(programmes, test_function_language);



  const subject_selected_dom = document.querySelectorAll("#subject_filter li.selected");
  const subject_id_selected = [];
  function callback_add_subjectID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    subject_id_selected.push(id_as_integer);
  }
  array_each(subject_selected_dom, callback_add_subjectID);



  function test_function_subject (programme) {
    return subject_id_selected.includes(programme.subjectID);
  }
  programmes = array_filter(programmes, test_function_subject);



  const search_string = document.querySelector("#search_field input").value;
  if (search_string !== "") {
    function test_function (programme) {
      return programme.name.includes(search_string);
    }
    programmes = array_filter(programmes, test_function);
  }

  return programmes;
}
