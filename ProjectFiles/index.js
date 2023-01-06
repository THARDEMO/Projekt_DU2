"use strict";

// Create Filter Elements
// create_levels_filter();
// create_subjects_filter();
// create_language_filter();

create_modular_filter( LEVELS, "level");
create_modular_filter( SUBJECTS, "subject");
create_modular_filter( LANGUAGES, "language");
create_countries_cities_filters();

document.querySelector("#search_field button").addEventListener("click", update_programmes);

update_programmes();

add_group_toggling( document.querySelector( "#level_filter"));
add_group_toggling( document.querySelector( "#subject_filter"));
add_group_toggling( document.querySelector( "#language_filter"));

for( let i = 0; i <= 8; i++) {
  add_group_toggling( document.querySelector( `#country_${i}`));
}

document.querySelector( "#country_filter > button").addEventListener( "click", toggle_cities);
