export class DataService {
  /***
   * Các dạng câu hỏi:
   * - Câu hỏi 1 đáp án đúng (type = 1): sẽ có biến answer, biến nào trong choices có value = answer thì đó là đáp án đúng
   * - Câu hỏi đúng/sai (type = 2): value trong biến choices nếu là 1 thì true, là 0 thì false
   * - Câu hỏi điền đáp án đúng: Chỉ cho điền số, so sánh giá trị với biến answer
   */
  questionType: any[] = [
    //câu hỏi 1 đáp án đúng
    {
      value: 1,
      name: 'one-choice question',
    },
    //Câu hỏi đúng sai (Sẽ có nhiều lựa chọn, phải chọn đúng/sai cho từng lựa chọn)
    {
      value: 2,
      name: 'true or false',
    },
    //Câu hỏi điền đáp án đúng
    {
      value: 3,
      name: 'enter the answer',
    },
  ];

  topic: any[] = [
    {
      code: 'triangle',
      name: 'Hình tam giác',
    },
    {
      code: 'trapezoid',
      name: 'Hình thang',
    },
    {
      code: 'circle',
      name: 'Hình tròn',
    },
    {
      code: 'rectangular',
      name: 'Hình lạp phương',
    },
    {
      code: 'cube',
      name: 'Hình lập phương',
    },
  ];

  planeGeometryMenu = [
    {
      label: 'Hình tam giác',
      imgPath: '/assets/imgs/home/triangle-button.gif',
      name: 'triangle',
    },
    {
      label: 'Hình thang',
      imgPath: '/assets/imgs/home/rectangle-button.gif',
      name: 'trapezoid',
    },
    {
      label: 'Hình tròn',
      imgPath: '/assets/imgs/home/circle-buton.gif',
      name: 'circle',
    },
  ];

  cubeGeometryMenu = [
    {
      label: 'Hình hộp chữ nhật',
      imgPath: '/assets/imgs/home/rectangular-button.gif',
      name: 'rectangular',
    },
    {
      label: 'Hình lập phương',
      imgPath: '/assets/imgs/home/cube-button.gif',
      name: 'cube',
    },
  ];

  lecture: any[] = [
    {
      code: 'bai1',
      name: 'Bài 1 1432412341234 1432412341234 1432412341234',
    },
    {
      code: 'bai2',
      name: 'Bài 2',
    },
    {
      code: 'bai3',
      name: 'Bài 3',
    },
    {
      code: 'bai4',
      name: 'Bài 4',
    },
    {
      code: 'bai5',
      name: 'Bài 5',
    },
    {
      code: 'bai6',
      name: 'Bài 6',
    },
    {
      code: 'bai7',
      name: 'Bài 7',
    },
    {
      code: 'bai8',
      name: 'Bài 8',
    },
    {
      code: 'bai9',
      name: 'Bài 9',
    },
    {
      code: 'bai10',
      name: 'Bài 10',
    },
  ];
}
