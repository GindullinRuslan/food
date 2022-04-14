const postData = async (url, data) => { // функция настраивает наш запрос, она фетчит - посылает запрос на сервер, получает какой то ответ от сервера и после этого трансформирует в джсон
  const res = await fetch(url, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });

  return await res.json(); //мы с постадаты возвращаем промис и через цепочку then обработаем

};

const getResource = async (url) => {
  const res = await fetch(url);

  // фетч если столкнется с какйо нибудь ошиюкой в http  запросе (404,500,502) он нам не выдаст catch(reject) - это не будет для него ошибкой, а ошибка для него - это отсутствие интернета, неполадки в самом запросе, поэтому такое поведение мы должны обработать. И здесь мы используем два метода ok и status. throw используется чтобы выкинуть эту ошибку из функции. 
  if (!res.ok) {
    throw new Error(`Could nod fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
};

export {postData};
export {getResource};