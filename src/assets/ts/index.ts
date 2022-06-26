// DOM取得
const content = document.getElementById('content');
let firstFlag: boolean, secondFlag: boolean, firstData: any, secondData: any;
// トランプデータ取得
const TrumpData = [
  'icon.jpg',
  'icon02.jpg',
  'icon03.jpg',
  'icon04.jpg',
  'icon05.jpg',
];

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
    // 作成した要素にテキストを追加
    image.dataset.check = data;
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
    //
    firstData.style.opacity = 1;
  }
};

// カードをクリックした時
const handleOnClick = (e: any) => {
  judgeTrumpFunction(e);
};

reflectDataFunction();
