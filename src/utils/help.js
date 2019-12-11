const developerName = 'Denis';

export const getTasks = async (sortField, sortDirection, page) => {
  const url = `https://uxcandy.com/~shapoval/test-task-backend/v2/?\
developer=${developerName}&\
sort_field=${sortField}&\
sort_direction=${sortDirection}&\
page=${page}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    await response;
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const addTask = async (data) => {
  const url = `https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=${developerName}`;
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    await response;
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const editTask = async (text, status, id, token) => {
  const url = `https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${id}?developer=${developerName}`;

  const form = new FormData();
  form.append('text', text);
  form.append('status', status);
  form.append('token', token);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: form,
    });
    await response;
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const validateEmail = (mail) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) return true;
  return false;
};

export const safeText = (text) => {
  return text.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27')
    .replace(/\//g, '&#x2F');
};

export const loginToServer = async (username, password) => {
  const url = `https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=${developerName}`;

  const form = new FormData();
  form.append('username', username);
  form.append('password', password);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: form,
    });
    await response;
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const saveToken = (token) => {
  sessionStorage.setItem('authToken', token);
};

export const getToken = () => {
  return sessionStorage.getItem('authToken');
};

export const deleteToken = () => {
  sessionStorage.removeItem('authToken');
};

export const setCookie = (key, value) => {
  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
};

export const getCookie = (key) => {
  const matches = document.cookie.match(new RegExp(
    `(?:^|; )${key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};
