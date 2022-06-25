// DOM取得
const content = document.getElementById('content');
// トランプデータ取得
const TrumpData = ['1', '2', '3', '4', '5', '6', '7', '8'];

let firstFlag: boolean, secondFlag: boolean, firstData: any, secondData: any;

// 配列をシャッフルする関数
const shuffleArrayData = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// トランプデータの要素を追加
const reflectDataFunction = () => {
  // 配列を複製した配列を作成
  const TrumpDoubleData = [...TrumpData, ...TrumpData];
  // 配列をシャッフルした配列作成
  const TrumpShuffleData = shuffleArrayData(TrumpDoubleData);
  // 配列のループ処理
  TrumpShuffleData.map((data) => {
    // div要素を作成
    const element = document.createElement('div');
    // 作成した要素にcardクラスを追加
    element.className = 'card';
    //トランプデータの要素を追加
    content?.appendChild(element);

    const text = document.createElement('p');
    // 作成した要素にcardクラスを追加
    text.className = 'text';
    // 作成した要素のonclick属性にhandleOnClick関数を追加
    text.onclick = handleOnClick;
    // 作成した要素にテキストを追加
    text.dataset.test = data;
    text.innerHTML = data;
    //トランプデータの要素を追加
    element?.appendChild(text);
  });
};

// カードをクリックした時
const handleOnClick = (e: any) => {
  let element = e.target;
  firstFlag = true;

  // 2回目のカードを引く時
  if (secondFlag) {
    secondData = e.target;
    secondData.style.opacity = 1;
    if (firstData.dataset.test === secondData.dataset.test) {
      firstData.className = 'text js-active';
      element.className = 'text js-active';
    }
    firstFlag = false;
    secondFlag = false;
  }

  // 1回目のカードを引く時
  if (firstFlag) {
    if (firstData) firstData.style.opacity = 0;
    if (secondData) secondData.style.opacity = 0;
    secondFlag = true;
    firstData = e.target;
    firstData.style.opacity = 1;
  }

  element.innerHTML = element.dataset.test;
};

reflectDataFunction();
