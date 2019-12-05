const sendCompleteData = async (code) => {
  const url = `http://188.225.46.145/statistic.php?code=${code}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
    });
    await response;
    return 'OK';
  } catch (error) {
    console.log(error);
  }
};

export default sendCompleteData;
