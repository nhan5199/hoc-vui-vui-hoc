export class DataService {
  /***
   * Các dạng câu hỏi:
   * - Câu hỏi 1 đáp án đúng (type = 1): sẽ có biến answer, biến nào trong choices có value = answer thì đó là đáp án đúng
   * - Câu hỏi đúng/sai (type = 2): value trong biến choices nếu là 1 thì true, là 0 thì false
   * - Câu hỏi điền đáp án đúng: Chỉ cho điền số, so sánh giá trị với biến answer
   */

  /***
   * lession
   * -name, theory, exercises
   * --quests
   */

  topic: any[] = [
    {
      topicName: 'triangle',
      content: {
        listTheory: [
          {
            name: 'theory-1',
            imgPath: '',
            url: '',
          },
        ],
        listExercises: [
          {
            name: 'exercise-1',
            imgPath: '',
            url: '',
            quests: [
              {
                type: 1,
                questionName:
                  'A là người chạy nhanh thứ 50 và cũng là người chạy chậm thứ 50 trong cuộc thi ở trường. Giả sử không có 2 người nào chạy cùng tốc độ thì tổng cộng có bao nhiêu học sinh ở trường A tham gia chạy?A là người chạy nhanh thứ 50 và cũng là người chạy chậm thứ 50 trong cuộc thi ở trường. Giả sử không có 2 người nào chạy cùng tốc độ thì tổng cộng có bao nhiêu học sinh ở trường A tham gia chạy?A là người chạy nhanh thứ 50 và cũng là người chạy chậm thứ 50 trong cuộc thi ở trường. Giả sử không có 2 người nào chạy cùng tốc độ thì tổng cộng có bao nhiêu học sinh ở trường A tham gia chạy?A là người chạy nhanh thứ 50 và cũng là người chạy chậm thứ 50 trong cuộc thi ở trường. Giả sử không có 2 người nào chạy cùng tốc độ thì tổng cộng có bao nhiêu học sinh ở trường A tham gia chạy?A là người chạy nhanh thứ 50 và cũng là người chạy chậm thứ 50 trong cuộc thi ở trường. Giả sử không có 2 người nào chạy cùng tốc độ thì tổng cộng có bao nhiêu học sinh ở trường A tham gia chạy?A là người chạy nhanh thứ 50 và cũng là người chạy chậm thứ 50 trong cuộc thi ở trường. Giả sử không có 2 người nào chạy cùng tốc độ thì tổng cộng có bao nhiêu học sinh ở trường A tham gia chạy?',

                choices: [
                  {
                    value: 1,
                    name: '/assets/imgs/lession/square.png',
                  },
                  {
                    value: 2,
                    name: '/assets/imgs/lession/circle.jpg',
                  },
                  {
                    value: 3,
                    name: '/assets/imgs/lession/rectangle.jpg',
                  },
                  {
                    value: 4,
                    name: '/assets/imgs/lession/trapezoid.png',
                  },
                ],
                answer: 1,
              },
              {
                type: 1,
                questionName:
                  'A là người chạy nhanh thứ 50 và cũng là người chạy chậm thứ 50 trong cuộc thi ở trường. Giả sử không có 2 người nào chạy cùng tốc độ thì tổng cộng có bao nhiêu học sinh ở trường A tham gia chạy?A là người chạy nhanh thứ 50 và cũng là người chạy chậm thứ 50 trong cuộc thi ở trường. Giả sử không có 2 người nào chạy cùng tốc độ thì tổng cộng có bao nhiêu học sinh ở trường A tham gia chạy?A là người chạy nhanh thứ 50 và cũng là người chạy chậm thứ 50 trong cuộc thi ở trường. Giả sử không có 2 người nào chạy cùng tốc độ thì tổng cộng có bao nhiêu học sinh ở trường A tham gia chạy?A là người chạy nhanh thứ 50 và cũng là người chạy chậm thứ 50 trong cuộc thi ở trường. Giả sử không có 2 người nào chạy cùng tốc độ thì tổng cộng có bao nhiêu học sinh ở trường A tham gia chạy?A là người chạy nhanh thứ 50 và cũng là người chạy chậm thứ 50 trong cuộc thi ở trường. Giả sử không có 2 người nào chạy cùng tốc độ thì tổng cộng có bao nhiêu học sinh ở trường A tham gia chạy?A là người chạy nhanh thứ 50 và cũng là người chạy chậm thứ 50 trong cuộc thi ở trường. Giả sử không có 2 người nào chạy cùng tốc độ thì tổng cộng có bao nhiêu học sinh ở trường A tham gia chạy?',

                choices: [
                  {
                    value: 1,
                    name: 'Đáp án 1',
                  },
                  {
                    value: 2,
                    name: 'Đáp án 2',
                  },
                  {
                    value: 3,
                    name: 'Đáp án 3',
                  },
                  {
                    value: 4,
                    name: 'Đáp án 4',
                  },
                ],
                answer: 1,
              },
              {
                type: 2,
                questionName: 'Chọn đúng/sai sau mỗi ý kiến sau',
                choices: [
                  {
                    answer: 1,
                    name: 'Đáp án 1 Chọn đúng/sai sau mỗi ý kiến sau Chọn đúng/sai sau mỗi ý kiến sau, Đáp án 1 Chọn đúng/sai sau mỗi ý kiến sau Chọn đúng/sai sau mỗi ý kiến sau',
                  },
                  {
                    answer: 0,
                    name: 'Đáp án 1 Chọn đúng/sai sau mỗi ý kiến sau Chọn đúng/sai sau mỗi ý kiến sau, Đáp án 1 Chọn đúng/sai sau mỗi ý kiến sau Chọn đúng/sai sau mỗi ý kiến sau',
                  },
                  {
                    answer: 1,
                    name: 'Đáp án 1 Chọn đúng/sai sau mỗi ý kiến sau Chọn đúng/sai sau mỗi ý kiến sau, Đáp án 1 Chọn đúng/sai sau mỗi ý kiến sau Chọn đúng/sai sau mỗi ý kiến sau',
                  },
                  {
                    answer: 0,
                    name: 'Đáp án 1 Chọn đúng/sai sau mỗi ý kiến sau Chọn đúng/sai sau mỗi ý kiến sau, Đáp án 1 Chọn đúng/sai sau mỗi ý kiến sau Chọn đúng/sai sau mỗi ý kiến sau',
                  },
                ],
              },
              {
                type: 3,
                questionName:
                  'A là người chạy nhanh thứ 50 và cũng là người chạy chậm thứ 50 trong cuộc thi ở trường. Giả sử không có 2 người nào chạy cùng tốc độ thì tổng cộng có bao nhiêu học sinh ở trường A tham gia chạy?A là người chạy nhanh thứ 50 và cũng là người chạy chậm thứ 50 trong cuộc thi ở trường. Giả sử không có 2 người nào chạy cùng tốc độ thì tổng cộng có bao nhiêu học sinh ở trường A tham gia chạy?A là người chạy nhanh thứ 50 và cũng là người chạy chậm thứ 50 trong cuộc thi ở trường. Giả sử không có 2 người nào chạy cùng tốc độ thì tổng cộng có bao nhiêu học sinh ở trường A tham gia chạy?A là người chạy nhanh thứ 50 và cũng là người chạy chậm thứ 50 trong cuộc thi ở trường. Giả sử không có 2 người nào chạy cùng tốc độ thì tổng cộng có bao nhiêu học sinh ở trường A tham gia chạy?A là người chạy nhanh thứ 50 và cũng là người chạy chậm thứ 50 trong cuộc thi ở trường. Giả sử không có 2 người nào chạy cùng tốc độ thì tổng cộng có bao nhiêu học sinh ở trường A tham gia chạy?A là người chạy nhanh thứ 50 và cũng là người chạy chậm thứ 50 trong cuộc thi ở trường. Giả sử không có 2 người nào chạy cùng tốc độ thì tổng cộng có bao nhiêu học sinh ở trường A tham gia chạy?',
                imgPath: '/assets/imgs/lession/correct-icon.png',
                answer: 'năm',
              },
              {
                type: 4,
                questionName: 'Đổi đơn vị đo',
                questions: [
                  {
                    value: '3m',
                    unit: ['mm'],
                    answer: [3000],
                  },
                  {
                    value: '3040m',
                    unit: ['km', 'm'],
                    answer: [3, 40],
                  },
                  {
                    value: '3m',
                    unit: ['mm'],
                    answer: [3000],
                  },
                  {
                    value: '3040m',
                    unit: ['km', 'm'],
                    answer: [3, 40],
                  },
                  {
                    value: '3m',
                    unit: ['mm'],
                    answer: [3000],
                  },
                  {
                    value: '3040m',
                    unit: ['km', 'm'],
                    answer: [3, 40],
                  },
                  {
                    value: '3m',
                    unit: ['mm'],
                    answer: [3000],
                  },
                  {
                    value: '3040m',
                    unit: ['km', 'm'],
                    answer: [3, 40],
                  },
                  {
                    value: '3m',
                    unit: ['mm'],
                    answer: [3000],
                  },
                  {
                    value: '3040m',
                    unit: ['km', 'm'],
                    answer: [3, 40],
                  },
                  {
                    value: '3m',
                    unit: ['mm'],
                    answer: [3000],
                  },
                  {
                    value: '3040m',
                    unit: ['km', 'm'],
                    answer: [3, 40],
                  },
                  {
                    value: '3m',
                    unit: ['mm'],
                    answer: [3000],
                  },
                  {
                    value: '3040m',
                    unit: ['km', 'm'],
                    answer: [3, 40],
                  },
                  {
                    value: '3040m',
                    unit: ['km', 'm'],
                    answer: [3, 40],
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  ];

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

  videoArray = [
    {
      name: 'triangle',
      videos: [
        {
          name: 'Toán 5 - Hình tam giác.mp4',
          url: 'https://firebasestorage.googleapis.com/v0/b/hoc-vui-vui-hoc-343f8.appspot.com/o/To%C3%A1n%205%20-%20Di%E1%BB%87n%20t%C3%ADch%20h%C3%ACnh%20tam%20gi%C3%A1c.mp4?alt=media&token=4ab65a8c-da3c-4620-9fde-a3b50f47ee47',
        },
        {
          name: 'Toán 5 - Diện tích hình tam giác.mp4',
          url: 'https://firebasestorage.googleapis.com/v0/b/hoc-vui-vui-hoc-343f8.appspot.com/o/To%C3%A1n%205%20-%20H%C3%ACnh%20tam%20gi%C3%A1c.mp4?alt=media&token=291c7619-921c-438e-ad18-eca6a768b870',
        },
      ],
    },
    {
      name: 'rectangle',
      videos: [
        {
          name: 'Toán 5 - Đặc điểm của hình thang.mp4',
          url: 'https://firebasestorage.googleapis.com/v0/b/hoc-vui-vui-hoc-343f8.appspot.com/o/To%C3%A1n%205%20-%20%C4%90%E1%BA%B7c%20%C4%91i%E1%BB%83m%20c%E1%BB%A7a%20h%C3%ACnh%20thang.mp4?alt=media&token=b407b0db-9484-4f48-9958-4504faf48f02',
        },
        {
          name: 'Toán 5 - Tính diện tích hình thang.mp4',
          url: 'https://firebasestorage.googleapis.com/v0/b/hoc-vui-vui-hoc-343f8.appspot.com/o/To%C3%A1n%205%20-%20T%C3%ADnh%20di%E1%BB%87n%20t%C3%ADch%20h%C3%ACnh%20thang.mp4?alt=media&token=6bef4b97-51d4-4474-910d-4ced047f02df',
        },
      ],
    },
    {
      name: 'circle',
      videos: [
        {
          name: 'Toán 5 - Hình tròn và đường tròn.mp4',
          url: 'https://firebasestorage.googleapis.com/v0/b/hoc-vui-vui-hoc-343f8.appspot.com/o/To%C3%A1n%205%20-%20H%C3%ACnh%20tr%C3%B2n%20v%C3%A0%20%C4%91%C6%B0%E1%BB%9Dng%20tr%C3%B2n.mp4?alt=media&token=57d3897e-984b-4638-98fe-bf2ed0978ea1',
        },
        {
          name: 'Toán 5 - Tính diện tích hình tròn.mp4',
          url: 'https://firebasestorage.googleapis.com/v0/b/hoc-vui-vui-hoc-343f8.appspot.com/o/To%C3%A1n%205%20-%20T%C3%ADnh%20di%E1%BB%87n%20t%C3%ADch%20h%C3%ACnh%20tr%C3%B2n.mp4?alt=media&token=da78b03c-0d29-4bd6-b99b-fea67c9a041b',
        },
      ],
    },
    {
      name: 'rectangular',
      videos: [
        {
          name: 'Toán 5 - Thể tích hình hộp chữ nhật.mp4',
          url: 'https://firebasestorage.googleapis.com/v0/b/hoc-vui-vui-hoc-343f8.appspot.com/o/To%C3%A1n%205%20-%20Th%E1%BB%83%20t%C3%ADch%20h%C3%ACnh%20h%E1%BB%99p%20ch%E1%BB%AF%20nh%E1%BA%ADt.mp4?alt=media&token=7306ab06-292a-4bc6-bd0c-f45e1a229bfd',
        },
        {
          name: 'Toán 5 - Diện tích xung quanh và diện tích toàn phần của hình hộp chữ nhật.mp4',
          url: 'https://firebasestorage.googleapis.com/v0/b/hoc-vui-vui-hoc-343f8.appspot.com/o/To%C3%A1n%205%20-%20Di%E1%BB%87n%20t%C3%ADch%20xung%20quanh%20v%C3%A0%20di%E1%BB%87n%20t%C3%ADch%20to%C3%A0n%20ph%E1%BA%A7n%20c%E1%BB%A7a%20h%C3%ACnh%20h%E1%BB%99p%20ch%E1%BB%AF%20nh%E1%BA%ADt.mp4?alt=media&token=686ba721-3b47-425b-9861-1b506b06ecc3',
        },
      ],
    },
    {
      name: 'cube',
      videos: [
        {
          name: 'HOẠT HÌNH.mp4',
          url: 'https://firebasestorage.googleapis.com/v0/b/hoc-vui-vui-hoc-343f8.appspot.com/o/HO%E1%BA%A0T%20H%C3%8CNH.mp4?alt=media&token=f896ebb7-da26-4f99-aa46-5cfc4635f71c',
        },
        {
          name: 'Toán 5 - Đặc điểm của các yếu tố của hình lập phương.mp4',
          url: 'https://firebasestorage.googleapis.com/v0/b/hoc-vui-vui-hoc-343f8.appspot.com/o/To%C3%A1n%205%20-%20%C4%90%E1%BA%B7c%20%C4%91i%E1%BB%83m%20c%E1%BB%A7a%20c%C3%A1c%20y%E1%BA%BFu%20t%E1%BB%91%20c%E1%BB%A7a%20h%C3%ACnh%20l%E1%BA%ADp%20ph%C6%B0%C6%A1ng.mp4?alt=media&token=a6a21829-1c56-41b6-a779-c6a1355907c6',
        },
        {
          name: 'Hình lập phương.mp4',
          url: 'https://firebasestorage.googleapis.com/v0/b/hoc-vui-vui-hoc-343f8.appspot.com/o/Hi%CC%80nh%20l%C3%A2%CC%A3p%20ph%C6%B0%C6%A1ng.mp4?alt=media&token=d3316848-6a5b-4fa5-85f3-30c6f3de53cb',
        },
        {
          name: 'Toán 5 - Diện tích xung quanh và diện tích toàn phần của hình lập phương.mp4',
          url: 'https://firebasestorage.googleapis.com/v0/b/hoc-vui-vui-hoc-343f8.appspot.com/o/To%C3%A1n%205%20-%20Di%E1%BB%87n%20t%C3%ADch%20xung%20quanh%20v%C3%A0%20di%E1%BB%87n%20t%C3%ADch%20to%C3%A0n%20ph%E1%BA%A7n%20c%E1%BB%A7a%20h%C3%ACnh%20l%E1%BA%ADp%20ph%C6%B0%C6%A1ng.mp4?alt=media&token=eb914ada-8616-4b3a-8ff5-5837ba8478e9',
        },
        {
          name: 'Toán 5 - Thể tích hình lập phương.mp4',
          url: 'https://firebasestorage.googleapis.com/v0/b/hoc-vui-vui-hoc-343f8.appspot.com/o/To%C3%A1n%205%20-%20Th%E1%BB%83%20t%C3%ADch%20h%C3%ACnh%20l%E1%BA%ADp%20ph%C6%B0%C6%A1ng.mp4?alt=media&token=cf0849cf-9279-4020-80e6-de196d4da55f',
        },
      ],
    },
    {
      name: 'cylynder',
      videos: [],
    },
  ];
}
