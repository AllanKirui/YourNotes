// Configure homepage carousel
const utils = window.fizzyUIUtils;
const slide_container = document.querySelector(".slide-container");
const flkty = new Flickity(slide_container, {
   // options
   cellAlign: "center", // set alignment
   wrapAround: true, // Infinite scroll
   prevNextButtons: false, // Hide left & right buttons
   pageDots: false, // Hide default page dots
});

// Customising dots
const cellsButtonGroup = document.querySelector(".options");
const cellsButtons = utils.makeArray(cellsButtonGroup.children);

// update buttons on select
flkty.on("select", function () {
   const previousSelectedButton =
      cellsButtonGroup.querySelector(".is-selected");
   const selectedButton = cellsButtonGroup.children[flkty.selectedIndex];
   previousSelectedButton.classList.remove("is-selected");
   selectedButton.classList.add("is-selected");
});

// cell select
cellsButtonGroup.addEventListener("click", function (event) {
   if (!matchesSelector(event.target, ".dot")) {
      return;
   }
   const index = cellsButtons.indexOf(event.target);
   flkty.select(index);
});

// Initialize required variables
let database_list = [];
let user_logged_in = null;
let username_logged_in = null;
let notes_list = null;
let created_notes_list = null;

// Grab elements
const home_buttons_div = document.getElementById("home-buttons");
const slider_div = document.getElementById("slide-container");
const options_div = document.getElementById("options");
const greeting_div = document.getElementById("greeting");
const register_div = document.getElementById("register-div");
const login_div = document.getElementById("login-div");
const dashboard_div = document.getElementById("dashboard-div");
const dashboard_home = document.getElementById("dashboard-home");
const dashboard_notes = document.getElementById("dashboard-notes");
const dashboard_settings = document.getElementById("dashboard-settings");
const notes_overview = document.getElementById("notes-overview");

const register_button = document.getElementById("register-btn");
const login_button = document.getElementById("login-btn");
const register_form = document.getElementById("register-form");
const login_form = document.getElementById("login-form");
const home_button = document.getElementById("dash-home");
const settings_button = document.getElementById("dash-settings");
const logout_button = document.getElementById("dash-logout");
const login_span = document.getElementById("login-span");
const register_span = document.getElementById("register-span");

const heading = document.querySelector(".heading");
const write_form = document.getElementById("write-notes-form");
const settings_form = document.getElementById("settings-form");
const error_div = document.getElementById("login-error");

const strike_button = document.querySelectorAll(".strike");
const trash_button = document.querySelectorAll(".trash");

const burger = document.querySelector(".burger");
const nav = document.getElementById("nav");

// Get the current time
const today = new Date();
const hour = today.getHours();

// A. Set up validation for registration form
// Setup Event Listeners
register_button.addEventListener("click", () => {
   hide_carousel();

   login_button.classList.remove("active-button");
   register_button.classList.add("active-button");

   login_div.classList.add("hide");
   register_div.classList.remove("hide");

   login_form.reset();
   remove_login_error_state(error_div);
});

register_form.addEventListener("submit", function (e) {
   e.preventDefault();
   // Grab the registration form and it's input elements
   const first_name = document.getElementById("first-name");
   const last_name = document.getElementById("last-name");
   const reg_username = document.getElementById("reg-username");
   const reg_email = document.getElementById("reg-email");
   const reg_password = document.getElementById("reg-password");
   const reg_password2 = document.getElementById("reg-password2");
   const checkbox = document.getElementById("checkbox");

   // trim the values to remove whitespaces
   const first_name_value = first_name.value.trim();
   const last_name_value = last_name.value.trim();
   const reg_username_value = reg_username.value.trim();
   const reg_email_value = reg_email.value.trim();
   const reg_password_value = reg_password.value.trim();
   const reg_password2_value = reg_password2.value.trim();
   const checkbox_value = checkbox.checked;

   let active_error = false;

   // Check if first_name value is empty
   if (first_name_value === "") {
      set_error_state(first_name, "First name cannot be blank");
   } else if (!isNaN(first_name_value)) {
      set_error_state(first_name, "First name cannot be a number");
   } else {
      set_success_state(first_name);
      remove_states(first_name);
   }

   // Check if last_name value is empty
   if (last_name_value === "") {
      set_error_state(last_name, "Last name cannot be blank");
   } else if (!isNaN(last_name_value)) {
      set_error_state(last_name, "Last name cannot be a number");
   } else {
      set_success_state(last_name);
      remove_states(last_name);
   }

   // Check if username on register form is empty
   if (reg_username_value === "") {
      set_error_state(reg_username, "Username cannot be blank");
   } else if (!isNaN(reg_username_value)) {
      set_error_state(reg_username, "Username cannot be a number");
   } else if (reg_username_value.length < 3) {
      set_error_state(
         reg_username,
         "Username cannot be less than 3 characters"
      );
   } else {
      set_success_state(reg_username);
      remove_states(reg_username);
   }

   // Check if email on register form is empty
   if (reg_email_value === "") {
      set_error_state(reg_email, "Email cannot be blank");
   } else if (!is_email(reg_email_value)) {
      set_error_state(reg_email, "Email is not valid");
   } else {
      set_success_state(reg_email);
      remove_states(reg_email);
   }

   // Check if password 1 on register form is empty
   if (reg_password_value === "") {
      set_error_state(reg_password, "Password cannot be blank");
   } else if (reg_password_value.length < 8) {
      set_error_state(
         reg_password,
         "Password cannot be less that 8 characters"
      );
      active_error = true;
      // Check if is password is equal to the string password
   } else if (reg_password_value.toLowerCase() === "password") {
      set_error_state(reg_password, "Password cannot be password");
   } else {
      set_success_state(reg_password);
      remove_states(reg_password);
   }

   // Check if password 2 on register form is empty
   if (reg_password2_value === "") {
      set_error_state(reg_password2, "Password cannot be blank");
   } else if (reg_password_value !== reg_password2_value) {
      set_error_state(reg_password2, "Passwords don't match");
   } else {
      set_success_state(reg_password2);
      remove_states(reg_password2);
   }

   // Check if checkbox is ticked
   if (checkbox_value !== true) {
      set_error_state(checkbox, "You MUST agree to the Terms of Use");
   } else {
      set_success_state(checkbox);
      remove_states(checkbox);
   }

   // Check if user already exists
   for (const user of database_list) {
      if (user.user.username === reg_username_value) {
         set_error_state(reg_username, "Username has already been taken");
         active_error = true;
      }
   }

   // Check if all form fields have been filled
   if (
      first_name_value !== undefined &&
      first_name_value !== "" &&
      last_name_value !== undefined &&
      last_name_value !== "" &&
      reg_username_value !== undefined &&
      reg_username_value !== "" &&
      reg_email_value !== undefined &&
      reg_email_value !== "" &&
      reg_password_value !== undefined &&
      reg_password_value !== "" &&
      reg_password2_value !== undefined &&
      reg_password2_value !== "" &&
      checkbox_value === true &&
      active_error === false
   ) {
      const new_user = add_user(
         first_name_value,
         reg_username_value,
         reg_password2_value
      );
      add_to_valid_users(new_user);
      register_button.classList.remove("active-button");
      register_form.reset();
      hide_divs();
      show_loading();
      log_in_user(new_user);
   }
});

login_span.addEventListener("click", () => {
   register_button.classList.remove("active-button");
   login_button.classList.add("active-button");

   register_div.classList.add("hide");
   login_div.classList.remove("hide");

   register_form.reset();
});

// B. Set up validation for login form
// Setup event listeners
login_button.addEventListener("click", () => {
   if (!slider_div.classList.contains("hide")) {
      hide_carousel();
   }

   register_button.classList.remove("active-button");
   login_button.classList.add("active-button");

   register_div.classList.add("hide");
   login_div.classList.remove("hide");

   register_form.reset();
});

login_form.addEventListener("submit", function (e) {
   e.preventDefault();
   // Grab the login form and it's input elements
   const login_username = document.getElementById("login-username");
   const login_password = document.getElementById("login-password");

   // trim the values to remove whitespaces
   const login_username_value = login_username.value.trim();
   const login_password_value = login_password.value.trim();

   login_button.classList.remove("active-button");
   is_user_valid(login_username_value, login_password_value);
});

register_span.addEventListener("click", () => {
   login_button.classList.remove("active-button");
   register_button.classList.add("active-button");

   login_div.classList.add("hide");
   register_div.classList.remove("hide");

   login_form.reset();
   remove_login_error_state(error_div);
});

// C. Add functionality to dashboard buttons
// Setup event listeners
home_button.addEventListener("click", (e) => {
   e.preventDefault();

   dashboard_settings.classList.add("hide");
   dashboard_home.classList.remove("hide");

   hide_divs();
   show_dashboard(user_logged_in);
   burger.classList.remove("active");
   nav.classList.remove("nav-active");
});

settings_button.addEventListener("click", (e) => {
   e.preventDefault();
   dashboard_home.classList.add("hide");
   dashboard_notes.classList.add("hide");
   show_user_settings();
   burger.classList.remove("active");
   nav.classList.remove("nav-active");
});

logout_button.addEventListener("click", (e) => {
   e.preventDefault();
   log_out_user();
   show_exit_screen();
   burger.classList.remove("active");
   nav.classList.remove("nav-active");
});

// D. Set up burger
burger.addEventListener("click", () => {
   burger.classList.toggle("active");
   nav.classList.toggle("nav-active");
});

// E. Add functionality to mark notes items as complete or to delete them
const todo_list = document.getElementById("todo-list");
todo_list.addEventListener("click", check_or_delete);

function check_or_delete(e) {
   const item_clicked = e.target;

   if (item_clicked.classList[0] === "strike") {
      const notes_item = item_clicked.parentElement.parentElement;
      notes_item.classList.toggle("completed");
   }

   if (item_clicked.classList[0] === "strike-img") {
      const notes_item = item_clicked.parentElement.parentElement.parentElement;
      notes_item.classList.toggle("completed");
   }

   update_stored_notes();

   if (
      item_clicked.classList[0] === "trash" ||
      item_clicked.classList[0] === "trash-img"
   ) {
      const notes_item = item_clicked.parentElement.parentElement.parentElement;

      notes_item.classList.add("falling-todo");
      notes_item.addEventListener("transitionend", () => notes_item.remove());

      remove_from_storage(notes_item);
   }
}

// Define a function that deletes stored notes items
function remove_from_storage(todo) {
   let new_notes_list = [];

   for (const content of notes_list.notes_content) {
      if (content.content === todo.children[1].innerText) {
         notes_list.notes_content.splice(
            notes_list.notes_content.indexOf(content),
            1
         );
         new_notes_list = notes_list.notes_content;
      }
   }
   notes_list.notes_content = new_notes_list;

   save_data();
}

// Define a function that updates the notes stored in localStorage
function update_stored_notes() {
   let new_notes_list = [];

   for (const notes of todo_list.querySelectorAll(".todo")) {
      let is_complete = notes.classList.contains("completed") ? true : false;

      let updated_notes = {
         content: notes.innerText,
         status: is_complete,
      };

      new_notes_list.push(updated_notes);
   }

   notes_list.notes_content = new_notes_list;
   save_data();
}

// F. Other main operations of the notes app
// Show notes when the user clicks on a title in the overview
notes_overview_todos = dashboard_home.querySelector("ul");
notes_overview_todos.addEventListener("click", (e) => {
   e.preventDefault();

   if (e.target.nodeName !== "LI") {
      return;
   }
   show_notes(e.target.firstChild.data);
});

// Add notes to notes list
write_form.addEventListener("submit", (e) => {
   e.preventDefault();

   const notes_to_write = document.getElementById("todo-input").value;
   if (notes_to_write === "") {
      return;
   }

   const notes_title = document.getElementById("notes-title").innerText;
   if (notes_title === "New notes") {
      set_error_state(heading, "Please rename the notes title");
      return;
   }

   // Store the content of the notes to the list
   notes_list.notes_content.push({ content: notes_to_write, status: false });

   // Add notes to the todo list
   add_notes(notes_to_write);
   e.target.reset();

   save_data();
});

// Define a function to write notes
function add_notes(notes_to_write) {
   const todo_list = document.getElementById("todo-list");
   const new_div = document.createElement("div");
   new_div.classList.add("todo");

   const bullet_span = document.createElement("span");
   bullet_span.classList.add("bullet");
   bullet_span.innerHTML = `<img src="static/img/bullet.svg"/>`;

   const new_li = document.createElement("li");
   new_li.innerText = notes_to_write;

   const button_div = document.createElement("div");
   button_div.classList.add("notes-buttons");

   const strike_div = document.createElement("div");
   strike_div.classList.add("strike");
   strike_div.innerHTML =
      '<img class="strike-img" src="static/img/strike.svg"/>';

   const trash_div = document.createElement("div");
   trash_div.classList.add("trash");
   trash_div.innerHTML = '<img class="trash-img" src="static/img/trash.svg"/>';

   button_div.appendChild(strike_div);
   button_div.appendChild(trash_div);
   new_div.appendChild(bullet_span);
   new_div.appendChild(new_li);
   new_div.appendChild(button_div);
   todo_list.appendChild(new_div);
}

// Add functionality to rename notes
const rename_title_form = document.getElementById("rename-title-form");
rename_title_form.addEventListener("submit", (e) => {
   e.preventDefault();

   let stored_titles = [];

   const new_notes_title = document.getElementById("rename-input").value;

   for (let i = 0; i < user_logged_in.notes.length; i++) {
      stored_titles.push(user_logged_in.notes[i].notes_title);
   }

   if (new_notes_title === "") {
      set_notes_rename_error(heading, "The notes title cannot be empty");
      return;
   } else if (new_notes_title === "New notes") {
      set_notes_rename_error(heading, "Please rename the notes title");
      return;
   } else if (stored_titles.indexOf(new_notes_title) !== -1) {
      set_notes_rename_error(heading, "A notes title should be unique");
      return;
   } else {
      set_notes_rename_success(heading);
   }

   const current_notes_title = document.getElementById("notes-title");
   current_notes_title.innerText = new_notes_title;

   // If user creates new notes, store it
   if (created_notes_list === null) {
      const new_notes = {
         notes_title: new_notes_title,
         notes_content: [],
      };

      user_logged_in.notes.push(new_notes);
      notes_list = new_notes;
   } else {
      notes_list.notes_title = new_notes_title;
   }
   save_data();
});

// Add functionality to the create new button
const create_new_btn = document.getElementById("create-new-btn");
create_new_btn.addEventListener("click", (e) => {
   e.preventDefault();
   show_notes();
   created_notes_list = null;
});

// G. Add functionality to the settings pages
settings_form.addEventListener("submit", (e) => {
   e.preventDefault();

   let active_error = false;
   let new_username = document.getElementById("new-username");
   let new_password = document.getElementById("new-password");
   let new_password2 = document.getElementById("conf-new-password");

   let new_username_value = new_username.value.trim();
   let new_password_value = new_password.value.trim();
   let new_password2_value = new_password2.value.trim();

   // Check if username on settings form is empty
   if (new_username_value === "") {
      set_error_state(new_username, "Username cannot be blank");
   } else if (!isNaN(new_username_value)) {
      set_error_state(new_username, "Username cannot be a number");
   } else if (new_username_value.length < 3) {
      set_error_state(
         new_username,
         "Username cannot be less than 3 characters"
      );
   } else {
      set_success_state(new_username);
      remove_states(new_username);

      // Check if user already exists
      for (const user of database_list) {
         if (user.user.username === new_username_value) {
            set_error_state(new_username, "Username has already been taken");
            active_error = true;
         }
      }

      if (active_error === false) {
         user_logged_in.user.username = new_username_value;
         username_logged_in = new_username_value;
         show_greeting(hour, new_username_value);
         save_data();
      }
   }

   // Check if password 1 on register form is empty
   if (new_password_value === "") {
      remove_states(new_password);
      remove_states(new_password2);
      return;
   } else if (new_password_value !== "" && new_password_value.length < 8) {
      set_error_state(
         new_password,
         "Password cannot be less that 8 characters"
      );
      // Check if is password is equal to the string password
   } else if (new_password_value.toLowerCase() === "password") {
      set_error_state(new_password, "Password cannot be password");
   } else {
      set_success_state(new_password);
      remove_states(new_password);
   }

   // Check if password 2 on settings form is empty
   if (new_password_value !== "" && new_password2_value === "") {
      set_error_state(new_password2, "Password cannot be blank");
   } else if (new_password_value !== new_password2_value) {
      set_error_state(new_password2, "Passwords don't match");
   } else {
      set_success_state(new_password2);
      remove_states(new_password2);
      user_logged_in.user.password = encrypt(new_password2_value);
      save_data();
      clear_password_fields();
   }
});

function clear_password_fields() {
   document.getElementById("new-password").value = "";
   document.getElementById("conf-new-password").value = "";
}

// H. Hashing user passwords
// Define a function that takes in a plain password and encrypts it
function encrypt(password) {
   let encryption = 0,
      ch;
   if (password.length === 0) {
      return encryption;
   }

   for (let i = 0; i < password.length; i++) {
      ch = password.charCodeAt(i);
      encryption = (encryption << 5) - encryption + ch;
      encryption |= 0;
   }

   return encryption;
}

// I. Other functions called throughout the program
// Define a function to hide carousel
function hide_carousel() {
   slider_div.classList.add("hide");
   options_div.classList.add("hide");
}

// Define a function to unhide carousel
function unhide_carousel() {
   slider_div.classList.remove("hide");
   options_div.classList.remove("hide");
}

// Define a function to store the user to the local storage database
function add_user(first, username, password) {
   const new_user = {
      user: {
         first: first,
         username: username,
         password: encrypt(password),
      },
      notes: [],
   };

   return new_user;
}

// Define a function to check if the user is logged in or not
function check_user_info() {
   if (user_logged_in === null) {
      log_out_user();
   } else {
      log_in_user(user_logged_in);
   }
}

// Define a function that log's in the user
function log_in_user(user) {
   user_logged_in = user;
   username_logged_in = user.user.username;
   hide_divs();
   hide_carousel();
   show_loading();
   setTimeout(function () {
      show_greeting(hour, user.user.username);
      show_dashboard();
   }, 4000);

   save_data();
}

// Define a function that log's out the user
function log_out_user() {
   user_logged_in = null;
   username_logged_in = null;
   notes_list = null;
   hide_divs();
   hide_greeting();
   show_home_huttons();

   save_data();
}

// Define a function to check if the user is in the database
function is_user_valid(username, password) {
   for (const user of database_list) {
      if (
         user.user.username === username &&
         user.user.password === encrypt(password)
      ) {
         login_form.reset();
         log_in_user(user);
         remove_login_error_state(error_div);
         return;
      }
   }

   set_login_error_state(error_div, "Oops! Invalid Username or Password");
}

// Define a function to show the loading screen
function show_loading() {
   const loading_screen = document.getElementById("loader");
   loading_screen.classList.remove("hide");
   setTimeout(function () {
      loading_screen.classList.add("hide");
   }, 4000);
}

// Define a function to show the exit screen
function show_exit_screen() {
   const exit_screen = document.getElementById("exit-loader");
   exit_screen.classList.remove("hide");
   home_buttons_div.classList.add("hide");
   setTimeout(function () {
      exit_screen.classList.add("hide");
      home_buttons_div.classList.remove("hide");
   }, 4000);
}

// Define a function to show the notes the user chooses to see
function show_notes(notes_title) {
   if (notes_title === undefined) {
      notes_title = "New notes";
   }

   show_dashboard_notes(notes_title);
   dashboard_notes.getElementsByTagName("h3")[0].innerText = notes_title;
   dashboard_notes.querySelector("#rename-input").value = notes_title;
}

// Define a function to hide the login and register buttons
function show_home_huttons() {
   home_buttons_div.classList.remove("hide");
}

// Define a function to show the dashboard once the user is logged in
function show_dashboard() {
   dashboard_div.classList.remove("hide");
   notes_overview.classList.remove("hide");

   show_notes_overview();
}

// Define a function to show the create notes section of the dashboard
function show_dashboard_notes(notes_title) {
   dashboard_notes.classList.remove("hide");
   dashboard_home.classList.add("hide");

   sort_user_notes(notes_title);
}

// Define a function that sorts the notes
function sort_user_notes(title) {
   for (const notes of user_logged_in.notes) {
      if (notes.notes_title === title) {
         show_notes_contents(notes.notes_content);
         notes_list = notes;
         return;
      }
   }

   show_notes_contents(null);
}

// Define a function that shows a notes contents
function show_notes_contents(note_items) {
   const todo_list = document.getElementById("todo-list");
   todo_list.innerHTML = "";

   if (note_items === null) {
      return;
   }

   for (const content of note_items) {
      const new_div = document.createElement("div");
      new_div.classList.add("todo");

      const bullet_span = document.createElement("span");
      bullet_span.classList.add("bullet");
      bullet_span.innerHTML = `<img src="static/img/bullet.svg"/>`;

      const new_li = document.createElement("li");
      new_li.innerText = content.content;

      const button_div = document.createElement("div");
      button_div.classList.add("notes-buttons");

      const strike_div = document.createElement("div");
      strike_div.classList.add("strike");
      strike_div.innerHTML =
         '<img class="strike-img" src="static/img/strike.svg"/>';

      const trash_div = document.createElement("div");
      trash_div.classList.add("trash");
      trash_div.innerHTML =
         '<img class="trash-img" src="static/img/trash.svg"/>';

      // Check if content was marked as complete
      if (content.status) {
         new_div.classList.add("completed");
      }

      button_div.appendChild(strike_div);
      button_div.appendChild(trash_div);
      new_div.appendChild(bullet_span);
      new_div.appendChild(new_li);
      new_div.appendChild(button_div);
      todo_list.appendChild(new_div);
   }
}

// Define a function to allow the user to change their settings
function show_user_settings() {
   dashboard_settings.classList.remove("hide");

   const settings_username = document.getElementById("new-username");
   settings_username.value = user_logged_in.user.username;
}

// Define a function to save data to localStorage
function save_data() {
   localStorage.setItem("Database", JSON.stringify(database_list));
   localStorage.setItem("Valid Users", JSON.stringify(username_logged_in));
}

// Define a function to read data from localStorage
function read_data() {
   if (localStorage.getItem("Database")) {
      database_list = JSON.parse(localStorage.getItem("Database"));
   }

   if (localStorage.getItem("Valid Users")) {
      username_logged_in = JSON.parse(localStorage.getItem("Valid Users"));

      for (const user of database_list) {
         if (user.user.username === username_logged_in) {
            user_logged_in = user;
         }
      }
   }
}

// Define a function to show the user a greeting based on the time of day
function show_greeting(time, username) {
   if (time > 16) {
      greeting =
         '<h1>Good evening, <span class="text-bold">' +
         username +
         "</span></h1>";
   } else if (time > 12) {
      greeting =
         '<h1>Good afternoon, <span class="text-bold">' +
         username +
         "</span></h1>";
   } else if (time > 0) {
      greeting =
         '<h1>Good morning, <span class="text-bold">' +
         username +
         "</span></h1>";
   } else {
      greeting =
         '<h1>Welcome, <span class="text-bold">' + username + "</span></h1>";
   }

   greeting_div.classList.remove("hide");
   greeting_div.innerHTML = greeting;
}

// Define a function to hide the greeting when user is logged out
function hide_greeting() {
   greeting_div.classList.add("hide");
}

// Define a function that will show the error message and error state
function set_error_state(input, message) {
   const control_el = input.parentElement;
   const small_el = control_el.querySelector("small");
   small_el.innerText = message;

   control_el.classList.add("error");
}

// Define a function that will show success state
function set_success_state(input) {
   const control_el = input.parentElement;

   control_el.classList.remove("error");
   control_el.classList.add("success");
}

// Define a function to handle notes rename error#
function set_notes_rename_error(el, message) {
   const small_el = el.querySelector("small");
   small_el.innerText = message;
   small_el.style.visibility = "visible";
   small_el.classList.add("error");
}

function set_notes_rename_success(el) {
   const small_el = el.querySelector("small");
   small_el.style.visibility = "hidden";
   small_el.classList.remove("error");
}

// Define a function to handle errors when an invalid user tries to log in
function set_login_error_state(input, message) {
   const small_el = input.querySelector("small");
   small_el.innerText = message;

   input.classList.add("error");
}

// Define a function to remove login error
function remove_login_error_state(input) {
   input.classList.remove("error");
}

// Define a function that checks if email is valid
function is_email(email) {
   return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
   );
}

// Define a function to remove error and success states
function remove_states(input) {
   const control_el = input.parentElement;
   setTimeout(() => {
      control_el.classList.remove("error");
      control_el.classList.remove("success");
   }, 1000);
}

// Define a function that adds the user to the database
function add_to_valid_users(user) {
   database_list.push(user);
   save_data();
}

// Define a function to show overview of notes already stored
function show_notes_overview() {
   dashboard_home.classList.remove("hide");
   notes_overview.classList.remove("hide");

   const ul_el = document.getElementById("overview-list");
   ul_el.innerHTML = "";

   for (const notes of user_logged_in.notes) {
      const bullet_span = document.createElement("span");
      bullet_span.classList.add("bullet");
      bullet_span.innerHTML = `<img src="static/img/bullet.svg"/>`;

      const new_div = document.createElement("div");
      new_div.classList.add("overview-div");

      const new_li = document.createElement("li");
      new_li.innerText = notes.notes_title;

      const new_span = document.createElement("span");
      new_span.classList.add("text-bold");
      new_span.innerText = " " + notes.notes_content.length;

      new_li.appendChild(new_span);
      new_div.appendChild(bullet_span);
      new_div.appendChild(new_li);
      ul_el.appendChild(new_div);
   }
}

// Define a function to hide divs
function hide_divs() {
   home_buttons_div.classList.add("hide");
   register_div.classList.add("hide");
   login_div.classList.add("hide");
   dashboard_div.classList.add("hide");
   notes_overview.classList.add("hide");
   dashboard_settings.classList.add("hide");
   dashboard_notes.classList.add("hide");
}

// Define a function to load the app
function start_app() {
   read_data();
   check_user_info();
}

// Call the function to start app
start_app();
