$(() => {
  /**
   * アップロード画像
   * @type {Image}
   */
  let img;

  /** @type {number} */
  let left = 330;
  /** @type {number} */
  let top = 160;
  /** @type {number} */
  let mid_left = 160;
  /** @type {number} */
  let mid_top = 100;
  /** @type {number} */
  let offset_left = 0;
  /** @type {number} */
  let offset_top = 0;
  /** @type {number} */
  let multiply = 0;

  /** param.json再生成 */
  const setText = () => {
    console.log('setText');

    left = Number($('#left').val());
    top = Number($('#top').val());
    mid_left = Number($('#mid_left').val());
    mid_top = Number($('#mid_top').val());

    offset_left = Number($('#offset_left').val());
    offset_top = Number($('#offset_top').val());
    multiply = Number($('#multiply').val());

    // テキストエリアに出力
    const json = {
      left,
      top,
      mid_left,
      mid_top,
    };
    $('#json_result').val(JSON.stringify(json, null, '  '));
  };

  /** 画像再生成 */
  const setImg = () => {
    /** @type {HTMLCanvasElement} */
    const bigCanvas = document.getElementById('body_big');
    const bigctx = bigCanvas.getContext('2d');
    const widthC = bigCanvas.width;
    const heightC = bigCanvas.height;
    bigctx.clearRect(0, 0, bigCanvas.width, bigCanvas.height);

    const widthI = img.width;
    const heightI = img.height;

    // canvasの高さまで引き伸ばす
    const multiplyW = heightC / heightI;

    const drawH = heightI * multiplyW * (multiply / 100);
    const drawW = widthI * multiplyW * (multiply / 100);

    // 幅が足りないことがあるので位置調整
    const widthOffset = (widthC - drawW) / 2;

    bigctx.drawImage(img, offset_left + widthOffset, offset_top, drawW, drawH);

    //--------------------------------------
    console.log('medium');
    // medium
    const midCanvas = document.getElementById('body_meidum');
    const middata = bigctx.getImageData(mid_left, mid_top, 862, 1013);
    midCanvas.getContext('2d').putImageData(middata, 0, 0);

    // small
    const smallCanvas = document.getElementById('body_small');
    const smalldata = bigctx.getImageData(left, top, 360, 360);
    smallCanvas.getContext('2d').putImageData(smalldata, 0, 0);
  };

  $('#edit_image').on('change', function (e) {
    const reader = new FileReader();
    reader.onload = function (e) {
      img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        setImg();
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  });

  setText();
  $('input[name="param"]').change(() => {
    setText();
    if (img) setImg();
  });
});
