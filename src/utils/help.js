const developerName = 'Denis';

export const getTasks = async (sortField, sortDirection, page) => {
  return {
    status: 'ok',
    message: {
      tasks: [
        {
          id: 1,
          username: 'Test User1',
          email: 'test_user_1@example.com',
          text: 'Hello, world!',
          status: 10,
        },
        {
          id: 2,
          username: 'Test User2',
          email: 'test_user_1@example.com',
          text: 'Hello, world!',
          status: 0,
        },
        {
          id: 3,
          username: 'Test User3',
          email: 'test_user_1@example.com',
          text: 'Hello, world!',
          status: 0,
        },
      ],
      total_task_count: 10,
    },
  };

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
