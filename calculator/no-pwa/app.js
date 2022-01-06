/* 
  1：计算式表达式由以下字符组成：0、1、2、3、4、5、6、7、8、9、.、+、-、*、/；
  2：第一个字符和最后一个字符不能为+、-、*、/、.；
  3：字符+、-、*、/将计算式表达式分割为数字和运算符，其中数字不能含有超过1个的小数点;
  4；运算符只能接在数字后面；
  5：小数点只能接在数字后面；
  6：数字的第一个字符为0的话，后面只能接运算符或小数点；
*/
const history = document.querySelector('#history > ul');
const current = document.querySelector('#current > p');  
const keyboard = document.querySelector('#keyboard');

let isOperator = true; /* 当前输入的字符是否为运算符+、-、*、/ */
let isDot = true;  /* 当前输入的字符是否为小数点 */
let isLeadingZero = false;/* 计算表达式中当前的数字中第一个字符是否为0 */
let hasDot = false; /* 计算表达中当前的数字中是否含有小数点 */

const getKeyboardValue = (element) => {
  while (element.tagName !== 'SPAN') {
    element = element.firstElementChild;
  }
  return element.textContent;
}

keyboard.addEventListener('click', (event) => {
  const textContent = getKeyboardValue(event.target);

  if (textContent !== '=') {
    if (['+', '-', '*', '/'].includes(textContent)) {
      if (isOperator || isDot) {
        return null;
      } else {          
        isOperator = true;
        isDot = false;
        hasDot = false;
        isLeadingZero = false;
      }
    } else if (textContent === '.'){
      if (isOperator || isDot || hasDot) {
        return null;
      } else {
        isOperator = false;
        isDot = true;
        hasDot = true;
        isLeadingZero = false;
      }
    } else {
      if (isLeadingZero) {
        return null;
      }
      if (textContent === '0' && isOperator) {
        isLeadingZero = true;
      }

      isOperator = false;
      isDot = false;
    }
    current.textContent += textContent;
  } else {
    if (current.textContent.trim() === '' || isOperator || isDot) {
      return null;
    }
    const li = document.createElement('li');
    li.textContent = `${current.textContent.trim()} = ${eval(current.textContent)}`;
    history.appendChild(li);
    li.scrollIntoView();
    current.textContent = '';

    isOperator = true;
    isDot = true;
    isLeadingZero = false;
    hasDot = false;
  }
});