// Initialize variables
let database_list = [];
let user_logged_in = null;
let username_logged_in = null;
//notes previously called: selected list
let selected_notes = null;

// Grab elements
const home_buttons_div = document.getElementById("home-buttons");
const greeting_div = document.getElementById("greeting");
const register_div = document.getElementById("register-div");
const login_div = document.getElementById("login-div");
const success_div = document.getElementById("success-div");
const dashboard_div = document.getElementById("dashboard-div");

const register_button = document.getElementById("register-btn");
const login_button = document.getElementById("login-btn");
const register_form = document.getElementById("register-form");

// Setup Event Listeners
register_button.addEventListener("click", () => {
   login_button.classList.remove("active-btn");
   register_button.classList.add("active-btn");

   login_div.classList.add("hide");
   register_div.classList.remove("hide");

   success_div.classList.add("hide");
});

register_form.addEventListener("submit", function (e) {
   e.preventDefault();
   // check_reg_inputs();
   // });

   // A. Perform Form Registration Form
   // // Define a function that validates input from the user
   // function check_reg_inputs() {
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
   // console.log(this);

   // const first_name = this.querySelector("#first-name").value.trim();
   // const last_name = this.querySelector("#last-name").value.trim();
   // const reg_username = this.querySelector("#reg-username").value.trim();
   // const reg_email = this.querySelector("#reg-email").value.trim();
   // const reg_password = this.querySelector("#reg-password").value.trim();
   // const reg_password2 = this.querySelector("#reg-password2").value.trim();
   // const checkbox = this.querySelector("#checkbox").value.trim();

   let active_error = true;
   let is_user_valid = true;
   //    let valid_fname;
   //    let valid_lname;
   //    let valid_username;
   //    let valid_email;
   //    let valid_password;
   //    let valid_password2;
   //    let valid_check;

   // Check if first_name value is empty
   if (first_name_value === "") {
      set_error_state(first_name, "First name cannot be blank");
   } else if (!isNaN(first_name_value)) {
      set_error_state(first_name, "First name cannot be a number");
   } else {
      set_success_state(first_name);
      remove_states(first_name);
      active_error = false;
   }

   // Check if last_name value is empty
   if (last_name_value === "") {
      set_error_state(last_name, "Last name cannot be blank");
   } else if (!isNaN(last_name_value)) {
      set_error_state(last_name, "Last name cannot be a number");
   } else {
      set_success_state(last_name);
      remove_states(last_name);
      active_error = false;
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
      active_error = false;
   }

   // Check if email on register form is empty
   if (reg_email_value === "") {
      set_error_state(reg_email, "Email cannot be blank");
   } else if (!is_email(reg_email_value)) {
      set_error_state(reg_email, "Email is not valid");
   } else {
      set_success_state(reg_email);
      remove_states(reg_email);
      active_error = false;
   }

   // Check if password 1 on register form is empty
   if (reg_password_value === "") {
      set_error_state(reg_password, "Password cannot be blank");
   } else if (reg_password_value.length < 8) {
      set_error_state(
         reg_password,
         "Password cannot be less that 8 characters"
      );
      // Check if is password is equal to the string password
   } else if (reg_password_value.toLowerCase() === "password") {
      set_error_state(reg_password, "Password cannot be password");
   } else {
      set_success_state(reg_password);
      remove_states(reg_password);
      active_error = false;
   }

   // Check if password 2 on register form is empty
   if (reg_password2_value === "") {
      set_error_state(reg_password2, "Password cannot be blank");
   } else if (reg_password_value !== reg_password2_value) {
      set_error_state(reg_password2, "Passwords don't match");
   } else {
      set_success_state(reg_password2);
      remove_states(reg_password2);
      active_error = false;
   }

   // Check if checkbox is ticked
   if (checkbox_value !== true) {
      set_error_state(checkbox, "You MUST agree to the Terms of Use");
   } else {
      set_success_state(checkbox);
      remove_states(checkbox);
      active_error = false;
   }

   // Check if the add_user function returns false
   //    if (
   //       add_user(
   //          valid_fname,
   //          valid_lname,
   //          valid_username,
   //          valid_email,
   //          valid_password,
   //          valid_password2,
   //          valid_check
   //       ) !== false
   //    ) {
   //       set_error_state(reg_username, "Username has already been taken");
   //    } else {
   //       // Add the valid_users list to local storage
   //       localStorage.setItem("Valid Users List", JSON.stringify(valid_users));
   //    }
   for (const user of database_list) {
      if (user.user.username === reg_username_value) {
         set_error_state(reg_username, "Username has already been taken");
         active_error = true;
      }
   }
   // Check if there is an active error before adding the user to local storage
   if (
      first_name_value !== undefined &&
      first_name_value !== "" &&
      last_name_value !== undefined &&
      last_name_value !== "" &&
      reg_username_value !== undefined &&
      reg_username_value !== "" &&
      reg_email_value !== undefined &&
      reg_email_value !== "" &&
      password_value !== undefined &&
      password_value !== "" &&
      password2_value !== undefined &&
      password2_value !== "" &&
      checkbox_value === true
   ) {
      const new_user = add_user(
         first_name_value,
         reg_username_value,
         reg_password2_value
      );
      add_to_valid_users(new_user);
      log_in_user(new_user);
      register_form.reset();
   } else {
      set_error_state(reg_username, "Username has already been taken");
   }
});

// C. Other functions called throughout the program
// Define a function to store the user to the local storage database
function add_user(first, username, password) {
   const new_user = {
      user: {
         first: first,
         username: username,
         password: password,
         // HASHING THE PASSWORD
         // password: hashCode(password),
      },
      notes: [],
   };

   return new_user;
}

function check_user_info() {
   if (user_logged_in === null) {
      log_out_user();
   } else {
      log_in_user(user_logged_in);
   }
}

// Define a function that log's in the user
function log_in_user(user) {
   // Get the current time
   const today = new Date();
   const hour = today.getHours();

   user_logged_in = user;
   username_logged_in = user.user.username;
   hide_divs();
   show_greeting(hour, user);
   show_dashboard();

   save_data();
}

// Define a function that log's out the user
function log_out_user() {
   user_logged_in = null;
   username_logged_in = null;
   notes = null;
   hide_divs();
   show_home_huttons();

   save_data();
}
// Define a function to hide divs
function hide_divs() {
   home_buttons_div.classList.add("hide");
   register_div.classList.add("hide");
   login_div.classList.add("hide");
   dashboard_div.classList.add("hide");
   dashboard_div.classList.add("hide");
   // listDiv.classList.add("hide");   CALL THIS NOTES DIV
   // settingsDiv.classList.add("hide");
}
// Define a function to hide the login and register buttons
function show_home_huttons() {
   home_buttons_div.classList.remove("hide");
}

// Define a function to show the dashboard once the user is logged in
function show_dashboard() {
   dashboard_div.classList.remove("hide");

   //    const todoListUL = document.getElementById("dashboard-todo-lists");
   //    todoListUL.innerHTML = "";

   //    for (const list of user_logged_in.lists) {
   //       const newListLI = document.createElement("li");
   //       const newTitleA = document.createElement("a");
   //       newTitleA.href = "#";
   //       newTitleA.innerText = list.title;
   //       newListLI.append(newTitleA);
   //       newListLI.innerHTML += " (" + list.items.length + ")";
   //       todoListUL.appendChild(newListLI);
   //    }
}

// Define a function to save data to localStorage
function save_data() {
   localStorage.setItem("Database", JSON.stringify(database_list));
   localStorage.setItem("Valid Users", JSON.stringify(username_logged_in));
}

// Define a function to show the user a greeting based on the time of day
function show_greeting(time, username) {
   if (time > 18) {
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

// Define a function that will show the error message and error state
function set_error_state(input, message) {
   const control_el = input.parentElement;
   const small_el = control_el.querySelector("small");
   small_el.innerText = message;

   control_el.classList.add("error");
   control_el.style.marginBottom = "15px";
}

// Define a function that will show success state
function set_success_state(input) {
   const control_el = input.parentElement;

   control_el.classList.remove("error");
   control_el.classList.add("success");
   control_el.style.marginBottom = "0px";
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

check_user_info();
