import { shuffleArrayDataFunction } from './module/shuffleArrayDataFunction';

// DOM取得
const timer = document.getElementById('timer');
const content = document.getElementById('content');
const score = document.getElementById('score');
const image = document.getElementsByClassName('image');
let firstFlag: boolean,
  secondFlag: boolean,
  firstData: any,
  secondData: any,
  time: number = 50;

// トランプデータ取得
const TrumpData = [
  'icon.jpg',
  'icon02.jpg',
  'icon03.jpg',
  'icon04.jpg',
  'icon05.jpg',
];

const timeFunction = () => {
  const timerText = document.createElement('p');
  timerText.className = 'timerText';
  timerText.innerHTML = String(time);
  timer?.appendChild(timerText);

  const countDown = () => {
    if (time <= 0) {
      timerText.innerHTML = 'time up.';
      timer?.appendChild(timerText);
    } else if (timer?.classList.contains('completed')) {
      timerText.innerHTML = 'CLEAR! Congratulations!';
      timer?.appendChild(timerText);
    } else {
      timerText.innerHTML = String(--time);
      timer?.appendChild(timerText);
    }
  };

  setInterval(countDown, 1000);
};

// トランプデータの要素を追加
const reflectDataFunction = () => {
  // 配列を複製した配列を作成
  const TrumpDoubleData = [...TrumpData, ...TrumpData];
  // 配列をシャッフルした配列作成
  const TrumpShuffleData = shuffleArrayDataFunction(TrumpDoubleData);
  // 共通画像パス
  const imageDirectory = './assets/image/';
  // 配列のループ処理
  TrumpShuffleData.map((data: string) => {
    // div要素を作成
    const element = document.createElement('div');
    // 作成した要素にcardクラスを追加
    element.className = 'card';
    //トランプデータの要素を追加
    content?.appendChild(element);

    const image = document.createElement('img');
    // 作成した要素にcardクラスを追加
    image.className = 'image';
    // 作成した要素のonclick属性にhandleOnClick関数を追加
    image.onclick = handleOnClick;
    // 作成した要素のdataset属性に設定する
    image.dataset.check = data;
    image.dataset.completed = 'false';
    // src属性に画像パスを追加
    image.src = imageDirectory + data;
    // トランプデータの要素を追加
    element?.appendChild(image);
  });
};

// トランプを引いた時の挙動を指定
const judgeTrumpFunction = (e: any) => {
  let element = e.target;
  firstFlag = true;

  // 2回目のカードを引く時
  if (secondFlag) {
    secondData = e.target;
    secondData.style.opacity = 1;
    //  1回目のカードと2回目のカードが同じだった場合
    if (firstData.dataset.check === secondData.dataset.check) {
      firstData?.classList.add('js-active');
      element?.classList.add('js-active');
      firstData.dataset.completed = 'true';
      element.dataset.completed = 'true';
    }
    // フラグをリセット
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
};

const completedFunction = () => {
  var array = Array.prototype.slice.call(image);
  const ifCompleted = array.some((item) => item.dataset.completed === 'false');
  if (!ifCompleted) {
    timer?.classList.add('completed');
  }
};

// カードをクリックした時
const handleOnClick = (e: any) => {
  judgeTrumpFunction(e);
  completedFunction();
};

reflectDataFunction();
timeFunction();
