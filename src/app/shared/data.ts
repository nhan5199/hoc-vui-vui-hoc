export class DataService{
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
  topic : any[] = [
    {
      topicName : "triangle",
      content : {
        listTheory:[
          {
            name: "theory-1",
            imgPath: "",
            url: ""
          }
        ],
        listExercises: [
          {
            name: "exercise-1",
            imgPath: "",
            url: "",
            quests: [
              {
                type : 1,
                questionName: "Hãy chọn đáp án đúng nhất",
                choices : [
                  {
                    value: 1,
                    name: "Đáp án 1"
                  },
                  {
                    value: 2,
                    name: "Đáp án 2"
                  },
                  {
                    value: 3,
                    name: "Đáp án 3"
                  },
                  {
                    value: 4,
                    name: "Đáp án 4"
                  },
                ],
                answer: 1
              },
              {
                type : 2,
                questionName: "Chọn đúng/sai sau mỗi ý kiến sau",
                choices : [
                  {
                    answer: 1,
                    name: "Đáp án 1 Chọn đúng/sai sau mỗi ý kiến sau Chọn đúng/sai sau mỗi ý kiến sau, Đáp án 1 Chọn đúng/sai sau mỗi ý kiến sau Chọn đúng/sai sau mỗi ý kiến sau",
                  },
                  {
                    answer: 0,
                    name: "Đáp án 1 Chọn đúng/sai sau mỗi ý kiến sau Chọn đúng/sai sau mỗi ý kiến sau, Đáp án 1 Chọn đúng/sai sau mỗi ý kiến sau Chọn đúng/sai sau mỗi ý kiến sau"
                  },
                  {
                    answer: 1,
                    name: "Đáp án 1 Chọn đúng/sai sau mỗi ý kiến sau Chọn đúng/sai sau mỗi ý kiến sau, Đáp án 1 Chọn đúng/sai sau mỗi ý kiến sau Chọn đúng/sai sau mỗi ý kiến sau"
                  },
                  {
                    answer: 0,
                    name: "Đáp án 1 Chọn đúng/sai sau mỗi ý kiến sau Chọn đúng/sai sau mỗi ý kiến sau, Đáp án 1 Chọn đúng/sai sau mỗi ý kiến sau Chọn đúng/sai sau mỗi ý kiến sau"
                  },
                ],
              },
              {
                type : 3,
                questionName: "Trả lời câu hỏi",
                choices : [
                  {
                    value: 1,
                    name: "Đáp án 1",
                  },
                ]
              },
              {
                type: 4,
                questionName: "Đổi đơn vị đo",
                questions:[
                  {
                    value: "3m",
                    unit: ["mm"],
                    answer: [3000]
                  },
                  {
                    value: "3040m",
                    unit: [
                      "km","m"
                    ],
                    answer: [3,40]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  ];

  questionType : any[] = [
    //câu hỏi 1 đáp án đúng
    {
      value: 1,
      name: "one-choice question"
    },
    //Câu hỏi đúng sai (Sẽ có nhiều lựa chọn, phải chọn đúng/sai cho từng lựa chọn)
    {
      value: 2,
      name: "true or false"
    },
    //Câu hỏi điền đáp án đúng
    {
      value: 3,
      name: "enter the answer"
    }
  ];
}
