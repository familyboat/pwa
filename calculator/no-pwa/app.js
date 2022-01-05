window.addEventListener('load', () => {
  const history = document.querySelector('#history > ul');
  const current = document.querySelector('#current > p');  
  const keyboard = document.querySelector('#keyboard');

  let isOperator = true;

  const getKeyboardValue = (element) => {
    while (element.tagName !== 'SPAN') {
      element = element.firstElementChild;
    }
    return element.textContent;
  }

  keyboard.addEventListener('click', (event) => {
    const textContent = getKeyboardValue(event.target);

    if (textContent !== '=') {
      if (['+', '-', '*', '/', '.'].includes(textContent)) {
        if (isOperator) {
          return null;
        } else {          
          isOperator = true;
        }
      } else {
        isOperator = false;
      }
      current.textContent += textContent;
    } else {
      if (current.textContent.trim() === '') {
        return null;
      }
      const li = document.createElement('li');
      li.textContent = `${current.textContent.trim()} = ${eval(current.textContent)}`;
      history.appendChild(li);
      li.scrollIntoView();
      current.textContent = '';
      isOperator = true;
    }
  });
});