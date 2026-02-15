// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}



// Add this to your existing utils.mjs
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

//renderwithtemplate function

export function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = 'afterbegin',
  clear = false
) {
  // Clear the element if specified
  if (clear) {
    parentElement.innerHTML = '';
  }

  // Generate HTML string from the template function with data
  const htmlString = templateFn(data);

  // Insert into the DOM
  parentElement.insertAdjacentHTML(position, htmlString);

  // Execute callback if provided
  if (callback) {
    callback(data);
  }
}



// utils.mjs - Add this function
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = 'afterbegin',
  clear = false
) {

  // Clear the element if specified
  if (clear) {
    parentElement.innerHTML = '';
  }

  // Generate HTML strings from the list
  const htmlStrings = list.map(templateFn);

  // Insert into the DOM
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

// Keep other existing exports...

// loadTemplate function

export async function loadTemplate(path) {
  const response = await fetch(path);
  const html = await response.text();
  return html;
}

//load header footer

export async function loadHeaderFooter() {
  try {
    // Load the header and footer templates
    const headerTemplate = await loadTemplate('/partials/header.html');
    const footerTemplate = await loadTemplate('/partials/footer.html');

    const headerElement = document.querySelector('header');
    const footerElement = document.querySelector('footer');

    // Render the header and footer
    if (headerElement) {
      headerElement.innerHTML = headerTemplate;
    }
    if (footerElement) {
      footerElement.innerHTML = footerTemplate;
    }

    // console.log('Header and footer loaded successfully');
  } catch (error) {
    console.error('Error loading header/footer:', error);
  }
}

// formDataToJSON function
export function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener('click', function (e) {
    if (e.target.tagName === 'SPAN') {
      alert.remove();
    }
  });

  const main = document.querySelector('main');
  main.prepend(alert);

  if (scroll) {
    window.scrollTo(0, 0);
  }
}
